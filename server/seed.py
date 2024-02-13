# seed.py

import json
from app import app
from extensions import db
from models import Product, User
from werkzeug.security import generate_password_hash

def delete_products_by_id(product_ids):
    for product_id in product_ids:
        product_to_delete = Product.query.get(product_id)
        if product_to_delete:
            db.session.delete(product_to_delete)
            print(f"Deleted product with ID: {product_id}")

product_ids_to_delete = [71]

def seed_data_from_json():
    delete_products_by_id(product_ids_to_delete)
    
    with open('db.json') as file:
        data = json.load(file)

        for product_data in data.get("products", []):
            existing_product = Product.query.filter_by(name=product_data["product"]).first()
            if existing_product:
                print(f"Updating existing product: {existing_product.name}")
                existing_product.image = product_data["image"]
                existing_product.price = product_data["price"]
                existing_product.quantity = product_data.get("quantity", 0)
            else:
                print(f"Adding new product: {product_data['product']}")
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
                    last_name=user_data.get("last_name", ""),
                    password=hashed_password,
                    email=user_data["email"]
                )
                db.session.add(user)

        db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        seed_data_from_json()