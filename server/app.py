# app.py

from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/product/<filename>')
def serve_product_image(filename):
    return send_from_directory('product_images', filename)

if __name__ == '__main__':
    app.run(debug=True)