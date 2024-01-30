# seed.py

from app import app, db  
from models import Product

def seed_data(): 
    products_data = [
        {"name": "Rubber Spatula", "image": "rubber_spatula.jpg", "price": 10.99, "quantity": 50},
        {"name": "Metal Spatula", "image": "metal_spatula.jpg", "price": 15.49, "quantity": 30},
        {"name": "Six Pan", "image": "six_pan.jpg", "price": 7.99, "quantity": 70},
        {"name": "Nine Pan", "image": "nine_pan.jpg", "price": 12.99, "quantity": 25},
        {"name": "Sheet Pan", "image": "sheet_pan.jpg", "price": 9.49, "quantity": 60},
        {"name": "Cambro 2qt", "image": "cambro_2qt.jpg", "price": 8.99, "quantity": 45},
        {"name": "Cambro 4qt", "image": "cambro_4qt.jpg", "price": 11.99, "quantity": 35},
        {"name": "Cambro 6qt", "image": "cambro_6qt.jpg", "price": 14.99, "quantity": 20},
        {"name": "Cambro 8qt", "image": "cambro_8qt.jpg", "price": 16.99, "quantity": 40},
        {"name": "Cambro 12qt", "image": "cambro_12qt.jpg", "price": 6.99, "quantity": 55},
        {"name": "Cambro 22qt", "image": "cambro_22qt.jpg", "price": 13.99, "quantity": 28},
        {"name": "Quart Containers with Lids", "image": "quart_containers_lids.jpg", "price": 17.99, "quantity": 18},
        {"name": "Pint Containers With Lids", "image": "pint_containers_lids.jpg", "price": 8.49, "quantity": 48},
        {"name": "Silpat 1/4 Size", "image": "silpat_quarter.jpg", "price": 19.99, "quantity": 15},
        {"name": "Silpat Full Size", "image": "silpat_full.jpg", "price": 10.99, "quantity": 33},
        {"name": "Sil Pat 1/2 Size", "image": "silpat_half.jpg", "price": 11.99, "quantity": 27},
        {"name": "Latex Gloves Small", "image": "latex_gloves_small.jpg", "price": 12.99, "quantity": 22},
        {"name": "Latex Gloves Large", "image": "latex_gloves_large.jpg", "price": 14.49, "quantity": 38},
        {"name": "Latex Gloves XL", "image": "latex_gloves_xl.jpg", "price": 9.99, "quantity": 44},
        {"name": "Latex Gloves XXL", "image": "latex_gloves_xxl.jpg", "price": 15.99, "quantity": 21}
    ]

    if not Product.query.first():
        for product_data in products_data:
            product = Product(**product_data)
            db.session.add(product)

        db.session.commit()
        print("Database seeded successfully.")
    else:
        print("Database already contains data.")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_data()
