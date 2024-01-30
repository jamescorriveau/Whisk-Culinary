# app.py

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

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

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/search', methods=['GET'])
def search_products():
    try:
        query = request.args.get('q', '')
        products = Product.query.filter(Product.name.contains(query)).all()
        return jsonify([product.to_dict() for product in products])
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=8000, debug=True)