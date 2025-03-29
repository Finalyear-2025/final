from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
# mongodb+srv://finalyear311:VZECEMUCKtNT2RUR@cluster0.90zst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# Replace with your actual MongoDB connection string
app.config["MONGO_URI"] = "mongodb+srv://finalyear311:VZECEMUCKtNT2RUR@cluster0.90zst.mongodb.net/finalYear"
mongo = PyMongo(app)
# mongodb+srv://finalyear311:VZECEMUCKtNT2RUR@cluster0.90zst.mongodb.net/finalYear