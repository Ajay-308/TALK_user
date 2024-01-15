from flask import Flask, jsonify, request, session
from pymongo import MongoClient
from urllib.parse import quote_plus
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from flask_pymongo import PyMongo
import bcrypt


app = Flask(__name__)

jwt = JWTManager(app)
CORS(app)

# MongoDB connection URI
username = "gojoxsukuna3"
password = "AJAY@3008"
cluster_address = "cluster0.copv7ci.mongodb.net"
database_name = "Cluster0"

escaped_username = quote_plus(username)
escaped_password = quote_plus(password)

app.config[
    "MONGO_URI"
] = f"mongodb+srv://{escaped_username}:{escaped_password}@{cluster_address}/{database_name}?retryWrites=true&w=majority"

mongo = PyMongo(app)

app.secret_key = "iS23ZcFaaDjYJE4RIipc7VJ36cpTGK4V"
app.config["JWT_SECRET_KEY"] = "iS23ZcFaaDjYJE4RIipc7VJ36cpTGK4V"

try:
    mongo.db.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# here the routes goes
@app.route("/")
def test():
    return jsonify({"message": "all good"})


@app.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        allUsers = mongo.db.users
        user = allUsers.find_one({"email": request.json["email"]})
        username = allUsers.find_one({"username": request.json["username"]})
        if user:
            return jsonify({"message": "user already exists"}), 401

        if username:
            return jsonify({"message": "username already exists"}), 401

        if request.json["password"] != request.json["cpassword"]:
            return jsonify(message="Password Not Matching!"), 401

        hashpw = bcrypt.hashpw(
            request.json["password"].encode("utf-8"), bcrypt.gensalt()
        )

        hashCpw = bcrypt.hashpw(
            request.json["cpassword"].encode("utf-8"), bcrypt.gensalt()
        )

        access_token = create_access_token(identity=request.json["email"])

        allUsers.insert_one(
            {
                "email": request.json["email"],
                "password": hashpw,
                "cpassword": hashCpw,
                "username": request.json["username"],
                "tokens": [{"token": str(access_token)}],
            }
        )
        session["email"] = request.json["email"]
        return jsonify(token=str(access_token)), 201
    return jsonify(message="something went wrong"), 401


@app.route("/login", methods=["POST"])
def user_login():
    all_users = mongo.db.users
    user = all_users.find_one({"email": request.json["email"]})

    if user and bcrypt.checkpw(
        request.json["password"].encode("utf-8"), user["password"]
    ):
        access_token = create_access_token(identity=request.json["email"])
        user["tokens"].append({"token": str(access_token)})

        # Use update_one to update the document
        all_users.update_one({"_id": user["_id"]}, {"$set": {"tokens": user["tokens"]}})

        return jsonify(token=str(access_token)), 201

    return jsonify(message="Invalid Username/Password"), 401


@app.route("/logoutUser", methods=["POST"])
def logoutUser():
    allUsers = mongo.db.users
    user = allUsers.find_one({"tokens.token": request.json["auth"]})

    if user:
        user["tokens"] = []
        allUsers.save(user)
        return jsonify(message="Logout Successfully!"), 201
    return jsonify(message="Something went wrong!"), 401


if __name__ == "__main__":
    app.run(debug=True)
