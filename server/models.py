# models.py

from extensions import db, login_manager
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash

class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    carts = relationship("ShoppingCart", back_populates="product")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "price": self.price,
            "quantity": self.quantity
        }

class User(db.Model, UserMixin):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    shopping_cart = relationship("ShoppingCart", back_populates="user")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
        }

class ShoppingCart(db.Model):
    __tablename__ = 'shopping_cart'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer, nullable=False)

    user = relationship("User", back_populates="shopping_cart")
    product = relationship("Product", back_populates="carts")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "product": self.product.to_dict()
        }

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
