import uuid

from flask import Flask, jsonify, redirect, request, url_for
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)

from user import User


app = Flask(__name__)
app.config['SECRET_KEY'] = 'SomethingNotEntirelySecret'

secret = str(uuid.uuid4())
User.create(1, "admin", secret)
User.create(2, "test", "test")

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.getById(user_id)


@app.route("/flask/")
def home():
    return redirect("/")


@app.route("/flask/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'UNAUTHORISED'}), 401
    user = User.get(username)
    if user and user.password == password:
        login_user(user)
        return jsonify({'username':user.username,'message': f'Hello {user.username}! Welcome back.'}), 200
    return jsonify({'message': 'UNAUTHORISED'}), 401



@app.route("/flask/user")
@login_required
def profile():
    username = current_user.username
    password = current_user.password
    return jsonify({'username': username,'message': f'Hello {username}! Your password is {password}'}), 200


@app.route("/flask/logout")
@login_required
def logout():
    logout_user()
    return "OK", 200



if __name__ == '__main__':
    app.run()