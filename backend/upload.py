from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
from werkzeug.utils import secure_filename
from models import store_user_data
upload_bp = Blueprint('upload', __name__)
print("Hlo upload")

@upload_bp.route('/', methods=['POST'])
@jwt_required()
def upload_image():
    print(get_jwt_identity)
    print("Hlo 2ulpoad")
    if 'file' not in request.files:
        return jsonify({"message": "No file uploaded"}), 200

    file = request.files['file']
    patient_name = request.form.get('name')
    patient_age = request.form.get('age')
    current_user=get_jwt_identity
    print(patient_name,patient_age)
    print(file)
    if not patient_name or not patient_age:
        return jsonify({"message": "Name and age are required"}), 200

    filename = secure_filename(file.filename)
    filepath = os.path.join("uploads", filename)
    file.save(filepath)
    store_user_data(patient_name,patient_age,100,100,filepath,current_user)
    # print(res)
    return jsonify({"message": "File uploaded successfully", "filename": filename})
