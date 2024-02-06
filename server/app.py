# app.py

import os
from flask import Flask, jsonify, request, render_template, redirect, url_for, flash
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required
from extensions import db, migrate, bcrypt
from models import Product, User

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', 'default-secret-key')


db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)


login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            print(f"Login successful for user with email: {email}")
            return jsonify({"message": "Login successful", "username": user.username}), 200
        else:
            return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"error": "Invalid request method"}), 400


@app.route('/api/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    print("Logout successful")
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json() 
        required_fields = ['username', 'first_name', 'last_name', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"error": "Email already exists"}), 400

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

        new_user = User(
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=hashed_password,
            email=data['email']
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User registered successfully", "username": new_user.username}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/api/products', methods=['GET'])
@login_required
def get_products():
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/search', methods=['GET'])
def search_products():
    try:
        query = request.args.get('q', '')
        products = Product.query.filter(Product.name.contains(query)).all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)