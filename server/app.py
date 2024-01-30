# app.py

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "price": self.price,
            "quantity": self.quantity
        }

@app.route('/products')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/search')
def search_products():
    query = request.args.get('q', '')
    products = Product.query.filter(Product.name.contains(query)).all()
    return jsonify([product.to_dict() for product in products])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)