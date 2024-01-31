# seed.py

import json
from app import app
from extensions import db
from models import Product

def seed_data_from_json():
    with open('db.json') as file:
        data = json.load(file)
        products_data = data.get("products", [])

    for product_data in products_data:
        existing_product = Product.query.filter_by(name=product_data["name"]).first()
        if existing_product is None:
            product = Product(
                name=product_data["name"],
                image=product_data["image"],
                price=product_data["price"],
                quantity=product_data["quantity"]
            )
            db.session.add(product)

    db.session.commit()
    print("Database seeded successfully.")

if __name__ == "__main__":
    with app.app_context():
        seed_data_from_json()