from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth_bp
from upload import upload_bp
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}},supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"  # ✅ Add this line
    return response
# JWT Secret Key
app.config['JWT_SECRET_KEY'] = 'sohel'

jwt = JWTManager(app)

# Ensure upload folder exists
os.makedirs("uploads", exist_ok=True)

# Register Blueprints (Routes)
print("hlo app")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(upload_bp, url_prefix="/upload")

if __name__ == '__main__':
    app.run(debug=True,port=5000)
