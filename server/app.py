# app.py

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from extensions import db, migrate, bcrypt
from models import Product, User, ShoppingCart

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', 'default-secret-key')

db.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user, remember=True)
        return jsonify({"message": "Login successful", "username": user.username}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

@app.route('/api/logout')
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/api/register', methods=['POST'])
def register():
    try:
        print("Register endpoint hit")  # Log when the endpoint is hit
        data = request.json
        print(f"Received data: {data}")  # Log the received data

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        print("Password hashed")  # Log after password is hashed

        new_user = User(
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=hashed_password,
            email=data['email']
        )
        print(f"Created new user object: {new_user}")  # Log the new user object

        db.session.add(new_user)
        db.session.commit()
        print("New user added to database")  # Log after user is added to DB

        return jsonify({"message": "User registered successfully", "username": new_user.username}), 201

    except Exception as e:
        print(f"Error in register route: {e}")  # Log the exception
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

@app.route('/api/cart/add', methods=['POST'])
@login_required
def add_to_cart():
    user = current_user
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    existing_item = ShoppingCart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if existing_item:
        existing_item.quantity += quantity
    else:
        new_item = ShoppingCart(user_id=user.id, product_id=product_id, quantity=quantity)
        db.session.add(new_item)

    db.session.commit()
    return jsonify({"message": "Product added to cart"}), 200

@app.route('/api/cart/remove', methods=['POST'])
@login_required
def remove_from_cart():
    user = current_user
    data = request.get_json()
    product_id = data.get('product_id')

    existing_item = ShoppingCart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if not existing_item:
        return jsonify({"error": "Product not in cart"}), 404

    db.session.delete(existing_item)
    db.session.commit()
    return jsonify({"message": "Product removed from cart"}), 200

if __name__ == '__main__':
    app.run(port=8000, debug=True)
