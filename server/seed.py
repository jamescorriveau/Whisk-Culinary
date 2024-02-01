# seed.py

import json
from app import app
from extensions import db
from models import Product, User
from werkzeug.security import generate_password_hash

def seed_data_from_json():
    with open('db.json') as file:
        data = json.load(file)

        # Seed products
        for product_data in data.get("products", []):
            existing_product = Product.query.filter_by(name=product_data["product"]).first()
            if existing_product is None:
                product = Product(
                    name=product_data["product"],
                    image=product_data["image"],
                    price=product_data["price"],
                    quantity=product_data.get("quantity", 0)
                )
                db.session.add(product)

        # Seed users
        for user_data in data.get("user_table", []):
            existing_user = User.query.filter_by(email=user_data["email"]).first()
            if existing_user is None:
                hashed_password = generate_password_hash(user_data["password"])
                user = User(
                    username=user_data["username"],
                    first_name=user_data["first_name"],
                    last_name=user_data["last_name"],
                    password=hashed_password,
                    email=user_data["email"]
                )
                db.session.add(user)

        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        seed_data_from_json()