from flask import Flask, request, jsonify
from google.cloud import texttospeech
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of your service account JSON file
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./text_to_voice.json"
CORS(credits=True, resources={r"/synthesize":{"origins":"http://localhost:3000"}})

@app.route("/synthesize", methods=["POST", "OPTIONS"])
def synthesize_speech():
    if request.method == "OPTIONS":
        return handle_options()

    try:
        data = request.get_json()
        text = data.get("text")

        client = texttospeech.TextToSpeechClient()

        synthesis_input = texttospeech.SynthesisInput(text=text)

        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            name="en-US-Standard-D",
            ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL,
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.LINEAR16
        )

        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        audio_content = response.audio_content

        return jsonify({"status": "success", "audio_content": audio_content.decode("utf-8")})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def handle_options():
    return "", 200, {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST",
        "Allow": "POST",
    }

if __name__ == "__main__":
    app.run(debug=True, port=5000)
