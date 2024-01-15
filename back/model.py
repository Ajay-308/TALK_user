from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def generate_uuid():
    return str(uuid4().hex)


class user_model(db.model):
    __tablename__ = "user"
    id = db.Column(db.string(36), primery_key=True, default=generate_uuid)
    name = db.Column(db.string(255), uniquie=True)
    email = db.Column(db.string(255), uniquie=True)
    password = db.Column(db.string(255))
