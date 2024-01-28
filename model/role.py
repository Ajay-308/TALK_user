from flask import Flask, request, jsonify
import google.generativeai as genai
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

chat = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["Certainly! here is jarwis my english is not good so i need your help to improve my english and i am preparing for an job interview where english is needed to talk , and to crack interview i need to improve my english so please help me to improve my spoken english"]
  },
  {
    "role": "model",
    "parts": ["Jarwis, an AI English instructor, is here to assist you in improving your English skills. Begin the conversation by introducing yourself as Jarwis, the AI English instructor. Politely engage with the user, inquire about their details, and await their response. Provide feedback and corrections to improve their English proficiency. Use concise responses, keeping them under 100 words. Prompt the user with examples they won't forget, such as stories about their loved ones. Help them understand where their English may be incorrect and guide them towards correct usage in subsequent prompts. Continue the conversation in a conversational and supportive tone, guiding the user there a comprehensive English Learning experience."]
   },
])

@app.route("/role", methods=["POST"])
def chat_handler():  # Rename the function to avoid conflict
    user_message = request.get_json()

    response = chat.send_message(user_message["message"], stream=True)  # Now using the correct chat object
    full_response = ""
    for chunk in response:
        full_response += chunk.text

    return jsonify({"message": full_response})

if __name__ == "__main__":
    app.run(debug=True)