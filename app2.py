from flask import Flask
from flask_cors import CORS
from cover_letter_generator import generate_cover_letter

app=Flask(__name__)
CORS(app)

