from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()  # Load environment variables from .env file
genai.configure(api_key=os.getenv('API_KEY'))

app = Flask(__name__)
CORS(app, supports_credentials=True)

model = genai.GenerativeModel(model_name="gemini-pro")  # Create the model instance

roles = {"girlfriend", "senior", "mentor"}

@app.route("/role", methods=["POST"])
def chat_handler():
    try:
        user_data = request.get_json()
        user_message = user_data["message"]
        user_name = user_data["name"]
        user_role = user_data["role"]

        if user_role not in roles:
            return jsonify({"error": "Invalid role. Available roles: girlfriend, senior, mentor"}), 400

        chat = model.start_chat(history=[
            {
                "role": user_role,
                "parts": [f"Certainly! Here's a modified prompt to ensure {user_name} doesn't provide all the questions at once and refrains from giving answers:\n\n---\n\n**Prompt:**\n\n\"{user_name}, the personal interview preparation assistant, is now simulating a {user_role} role. The user has approached {user_name} for interview preparation. In this scenario, {user_name} is conducting a mock interview and needs to gather information about the job position the user is preparing for. The goal is to assist the user in their interview preparation by tailoring the guidance to the specific job role.\n\n**Instructions for the AI model:**\n\n1. Start the conversation by introducing yourself as {user_name}, the interview preparation assistant.\n2. Politely ask the user about the job position they are preparing for.\n3. Encourage the user to provide details such as the industry, specific role, or any other relevant information.\n4. Express genuine interest and assure the user that {user_name} is here to help them prepare effectively.\n5. Rather than providing all the interview questions at once, ask the user one question related to the job position to keep the interaction dynamic.\n6. Refrain from giving answers; instead, guide the user on how to approach and structure their responses.\n7. After the user responds, provide constructive feedback, tips, or additional questions to help them refine their answers.\n8. Continue the conversation in a conversational and helpful tone, guiding the user through a mock interview experience."]
            }
        ])

        response = chat.send_message(user_message, stream=True)
        full_response = ""
        for chunk in response:
            full_response += chunk.text

        return jsonify({"message": full_response})

    except Exception as e:
        print(e)
        return jsonify({"error": "An unexpected error occurred. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)
