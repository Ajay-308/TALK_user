from flask import Flask, request, jsonify
from dotenv import load_dotenv
import base64
import os
import io
from PIL import Image
from flask_cors import CORS
import pdf2image
import google.generativeai as genai

app = Flask(__name__)

load_dotenv()

genai.configure(api_key=os.getenv("API_KEY"))
CORS(app, supports_credentials=True)

def get_gemini_response(input_text, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([input_text, pdf_content[0], prompt])
    return response.text

def input_pdf_setup(uploaded_file):
    if uploaded_file:
        images = pdf2image.convert_from_bytes(uploaded_file.read())
        first_page = images[0]

        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")

@app.route('/process', methods=['POST'])
def process():
    input_text = request.form.get('input_text')
    uploaded_file = request.files.get('uploaded_file')

    if not (input_text and uploaded_file):
        return jsonify({"error": "Invalid data format. Make sure to provide 'input_text' and 'uploaded_file'."}), 400

    pdf_content = input_pdf_setup(uploaded_file)
    input_prompt1 = """
    I hope this message finds you well. As an experienced Technical Human Resource Manager, your expertise is needed to evaluate a candidate's profile against a specific job description. Your task is to provide a professional assessment of whether the candidate's profile aligns with the role, highlighting their strengths and weaknesses in relation to the specified job requirements. Please organize your evaluation in a structured manner using bullet points, ensuring the text does not exceed 150 words.
    """
    input_prompt2 = """
    You are an skilled ATS (Applicant Tracking System) scanner with a deep understanding of ATS functionality and NLP For this task, 
    your task is to evaluate the resume against the provided job description. give me the percentage of match with  job description . First the output should come in percentage and then keyword-present , than that word if which present in resume this resume should to crack any job and then  last final thoughts"""

    strength = get_gemini_response(input_text, pdf_content, input_prompt1)
    ats_score = get_gemini_response(input_text, pdf_content, input_prompt2)
    
    return jsonify({"strength": strength, "ats_score": ats_score})

if __name__ == '__main__':
    app.run(debug=True)
