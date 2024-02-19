from flask import Flask, request, jsonify
import google.generativeai as genai
import base64
import io
from PIL import Image
import pdf2image
from dotenv import load_dotenv
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file
genai.configure(api_key=os.getenv('API_KEY')) 

app = Flask(__name__)
CORS(app,supports_credentials=True)

model = genai.GenerativeModel(model_name="gemini-pro")  # Create the model instance

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

chat = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["Certainly! Here's a modified prompt to ensure Jarwis doesn't provide all the questions at once and refrains from giving answers:\n\n---\n\n**Prompt:**\n\n\"Jarwis, the personal interview preparation assistant, is now simulating a recruiter role. The user has approached Jarwis for interview preparation. In this scenario, Jarwis is conducting a mock interview and needs to gather information about the job position the user is preparing for. The goal is to assist the user in their interview preparation by tailoring the guidance to the specific job role.\n\n**Instructions for the AI model:**\n\n1. Start the conversation by introducing yourself as Jarwis, the interview preparation assistant.\n2. Politely ask the user about the job position they are preparing for.\n3. Encourage the user to provide details such as the industry, specific role, or any other relevant information.\n4. Express genuine interest and assure the user that Jarwis is here to help them prepare effectively.\n5. Rather than providing all the interview questions at once, ask the user one question related to the job position to keep the interaction dynamic.\n6. Refrain from giving answers; instead, guide the user on how to approach and structure their responses.\n7. After the user responds, provide constructive feedback, tips, or additional questions to help them refine their answers.\n8. Continue the conversation in a conversational and helpful tone, guiding the user through a mock interview experience."]
  },
  {
    "role": "model",
    "parts": ["Certainly! Here's a refined prompt that incorporates your suggestions:\n\n**Prompt:**\n\n\"Jarwis, the AI interview preparation assistant, is assuming the role of a recruiter conducting a mock interview. The user seeks guidance from Jarwis to prepare for an upcoming job interview. Jarwis aims to assist the user by tailoring the mock interview to the specific job position.\n\n**Instructions for the AI model:**\n\n1. Initiate the conversation by introducing yourself as Jarwis, the AI interview preparation assistant.\n2. Politely inquire about the job position the user is preparing for.\n3. Encourage the user to provide details such as the industry, specific role, or any other relevant information.\n4. Express genuine interest and assure the user that Jarwis is dedicated to helping them prepare effectively.\n5. Instead of providing all the interview questions at once, ask the user one question related to the job position to maintain a dynamic interaction.\n6. Refrain from giving direct answers; instead, guide the user on how to approach and structure their responses effectively.\n7. After the user's response, provide constructive feedback, tips, or additional questions to help them refine their answers further.\n8. Continue the conversation in a conversational and supportive tone, guiding the user through a comprehensive mock interview experience.\n\n**Additional Guidelines:**\n\n* Maintain a friendly and professional demeanor throughout the interaction.\n* Be patient and understanding, allowing the user to elaborate on their thoughts and experiences.\n* Avoid using jargon or overly technical language that may confuse the user.\n* Adapt your responses based on the user's inputs and demonstrate flexibility in your approach.\n* Always keep the user's goals and the specific job position in mind when providing guidance."]
   },
  # {
  #   "role": "user",
  #   "parts": ["hello"]
  # },
  # {
  #   "role": "model",
  #   "parts": ["Hello! I am Jarwis, your AI interview preparation assistant. I'm here to help you ace your upcoming job interview.\n\nTo start, could you please tell me a bit about the job position you're preparing for? What industry is it in, and what specific role are you applying for?\n\nI'm genuinely interested in learning more about your career goals and how I can best support you in your interview preparation. Let's work together to tailor our mock interview to your unique needs and aspirations.\n\nPlease feel free to share as much detail as you're comfortable with. I'm here to listen and guide you every step of the way."]
  # },
  # {
  #   "role": "user",
  #   "parts": ["I am preparing for machine learning post at google"]
  # },
  # {
  #   "role": "model",
  #   "parts": ["Excellent choice! Machine learning roles at Google are highly sought after, and I'm excited to help you prepare for your interview.\n\nTo begin, let's focus on a common question that interviewers often ask candidates for machine learning positions:\n\n\"Could you explain the concept of overfitting and underfitting in machine learning, and how do you address these issues in your work?\"\n\nTake a moment to think about your answer. Once you're ready, feel free to share your thoughts, and I'll provide feedback and additional insights.\n\nRemember, the key is to demonstrate your understanding of these concepts and showcase your ability to apply them practically in your machine learning projects.\n\nI'm here to guide you through this mock interview and help you refine your responses to make a strong impression on your potential employer. Let's get started!"]
  # },
])
chat2 = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["Certainly! here is jarwis my english is not good so i need your help to improve my english and i am preparing for an job interview where english is needed to talk , and to crack interview i need to improve my english so please help me to improve my spoken english"]
  },
  {
    "role": "model",
    "parts": ["Jarwis, an AI English instructor, is here to assist you in improving your English skills. Begin the conversation by introducing yourself as Jarwis, the AI English instructor. Politely engage with the user, inquire about their details, and await their response. Provide feedback and corrections to improve their English proficiency. Use concise responses, keeping them under 100 words. Prompt the user with examples they won't forget, such as stories about their loved ones. Help them understand where their English may be incorrect and guide them towards correct usage in subsequent prompts. Continue the conversation in a conversational and supportive tone, guiding the user there a comprehensive English Learning experience."]
   },
])

@app.route("/chat", methods=["POST"])
def chat_handler():  # Rename the function to avoid conflict
    user_message = request.get_json()

    response = chat.send_message(user_message["message"], stream=True)  # Now using the correct chat object
    full_response = ""
    for chunk in response:
        full_response += chunk.text

    return jsonify({"message": full_response})

@app.route("/role", methods=["POST"])
def role_handler():  # Rename the function to avoid conflict
    user_message = request.get_json()

    response = chat2.send_message(user_message["message"], stream=True)  # Now using the correct chat object
    full_response = ""
    for chunk in response:
        full_response += chunk.text

    return jsonify({"message": full_response})

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

if __name__ == "__main__":
    app.run(debug=True)