from flask import Flask,jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import datetime
import psycopg2
from functools import wraps
from cover_letter_generator import generate_cover_letter
from resume_refiner import extract_text_from_pdf,refine_resume
from db_setup.chromadb import store_job_application,get_similar_job_template

load_dotenv()

app=Flask(__name__)
CORS(app)
app.config['SECRET_KEY']=os.getenv('MY_SECRET_KEY')

def get_connection():
    conn=psycopg2.connect(
        host=os.getenv('host'),
        database=os.getenv('database'),
        user=os.getenv('user'),
        password=os.getenv('password')
    )
    return conn

def db_init():
    try:
        conn=get_connection()
        cursor=conn.cursor()
        
        cursor.execute(""" create table if not exists registered_users
                                    (id SERIAL PRIMARY KEY,
                                    username TEXT UNIQUE NOT NULL,
                                    password TEXT NOT NULL);""")
        conn.commit()
        cursor.close()
        conn.close()
        print("Database initialized.")
    except Exception as e:
        print(f"Error initializing database:{e}")

def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token=None
        if 'Authorization' in request.headers:
            token=request.headers['Authorization'].split("")[1]
        if not token:
            return jsonify({'message':'Token is missing!'}),401
        try:
            data=jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"])
            current_user=data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({'message':'Token is invalid!'}),401
        except jwt.InvalidTokenError:
            return jsonify({'message':'Token is invalid!'}),401
        return f(current_user,*args,**kwargs)
    return decorated

@app.route('/signup',methods=['POST'])
def signup():
    try:
        data=request.get_json()
        username=data.get("username")
        password=data.get("password")
        
        if not username or not password:
            return jsonify({'message':"username and password are required"}),400
        
        conn=get_connection()
        cur=conn.cursor()
        
        hashed_pw=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')
        
        try:
            cur.execute("INSERT INTO registered_users(username,password) VALUES (%s,%s)",(username,hashed_pw))
            conn.commit()
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            return jsonify({'message':'Username already exists'}),400
        cur.close()
        conn.close()
        return jsonify({'message':'User registered successfully'}),201
    except Exception as e:
        print(f"Signup error: {e}")
        return jsonify({'message':f'Error: {str(e)}'}),500
    

