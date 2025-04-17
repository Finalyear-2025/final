from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from auth import auth_bp
from upload import upload_bp
from upload import history_bp
import os
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)

# ✅ Correct way to enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 
# ✅ Ensure Flask handles preflight (OPTIONS) requests
@app.route("/upload", methods=["OPTIONS"])
def handle_preflight():
    response = jsonify({"message": "Preflight request successful"})
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response, 200
# JWT Secret Key
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager(app)

# Ensure upload folder exists
os.makedirs("uploads", exist_ok=True)

# Register Blueprints (Routes)
print("hlo app")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(upload_bp, url_prefix="/upload")
app.register_blueprint(history_bp, url_prefix="/get_history")
if __name__ == '__main__':
    app.run(debug=True,port=5000)
