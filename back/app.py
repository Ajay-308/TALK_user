from flask import Flask, jsonify, session, redirect, url_for, request
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/google-login": {"origins": "http://localhost:5173"}})

appConf = {
    "OAuth_cleintIS": "1038763694046-q3vi47e21lb7lrq4cvh10epia1nfdds6.apps.googleusercontent.com",
    "OAuth_cleintSecret": "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",
    "OAuth_meta_URL": "https://accounts.google.com/.well-known/openid-configuration",
    "flask_secret": "6bbaa476-a82c-4ac9-8515-7e852451bf1e",
    "flask_port": 8080,
}

app.secret_key = appConf["flask_secret"]

oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=appConf["OAuth_cleintIS"],
    client_secret=appConf["OAuth_cleintSecret"],
    server_metadata_url=appConf["OAuth_meta_URL"],
    client_kwargs={"scope": "openid email profile"},
)


@app.route("/")
def hello_world():
    return "hello world!!"


@app.route("/login")
def login():
    return oauth.google.authorize_redirect(
        redirect_uri=url_for("google_login", _external=True)
    )


@app.route("/signin-google")
def signin_google():
    token = oauth.google.authorize_access_token()
    session["token"] = token
    return redirect(url_for("home"))


# New route to handle Google login
@app.route("/google-login", methods=["POST"])
def google_login():
    try:
        # Get the Google access token from the request
        access_token = request.json.get("accessToken")

        # Validate the access token (you may want to use a library for this)
        # For simplicity, we'll just print the token here
        print(f"Received Google Access Token: {access_token}")

        # Perform necessary validation and user authentication on the backend
        # ...

        # If validation is successful, return a success response
        return jsonify({"success": True}), 200
    except Exception as e:
        # Handle errors and return an appropriate response
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=appConf["flask_port"], debug=True)
