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
CORS(app,supports_credentials=True)
def get_gemini_response(input, pdf_content, prompt):
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([input, pdf_content[0], prompt])
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
    data = request.get_json()

    input_prompt1 = """
    You are an experienced Technical Human Resource Manager,your task is to review the provided resume against the job description. 
    Please share your professional evaluation on whether the candidate's profile aligns with the role. 
    Highlight the strengths and weaknesses of the applicant in relation to the specified job requirements.
    """
    input_prompt2 = """
    You are an skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality, 
    your task is to evaluate the resume against the provided job description. give me the percentage of match if the resume matches
    the job description . First the output should come in percentage and then keywords missing and last final thoughts"""


    if data and 'input_text' in data and 'uploaded_file' in data:
        input_text = data['input_text']
        uploaded_file = io.BytesIO(base64.b64decode(data['uploaded_file']))

        pdf_content = input_pdf_setup(uploaded_file)
        strength = get_gemini_response(input_text, pdf_content, input_prompt1)
        ats_score = get_gemini_response(input_text, pdf_content, input_prompt2)
        return jsonify({"strength": strength,"ats_score":ats_score})
    else:
        return jsonify({"error": "Invalid data format. Make sure to provide 'input_text' and 'uploaded_file' in JSON."})

if __name__ == '__main__':
    app.run(debug=True)
