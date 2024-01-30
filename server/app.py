# app.py

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from models import Product

@app.route('/products')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)