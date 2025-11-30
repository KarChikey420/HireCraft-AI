from flask import Flask,jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
import tempfile
import os
import bcrypt
import jwt
from datetime import datetime,timedelta,timezone
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
    
@app.route('/login',methods=['POST'])
def login():
    try:
        data=request.get_json()
        username=data.get('username')
        password=data.get('password')
        
        conn=get_connection()
        cur=conn.cursor()
        cur.execute('SELECT password FROM  registered_users WHERE username=%s',(username,))
        user=cur.fetchone()
        cur.close()
        conn.close()
        
        if not user or not bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            return jsonify({'message': 'Invalid username or password!'}), 401

        token = jwt.encode(
            {'username': username, 'exp': datetime.now(timezone.utc) + timedelta(hours=2)},
            app.config['SECRET_KEY'],
            algorithm="HS256"
        )

        return jsonify({'token': token})
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'message':f'Error: {str(e)}'}),500
    
@app.route('/refine_resume',methods=['POST'])
@token_required
def refine_resume_api():
    try:
        if "resume" not in request.files:
            return jsonify({"error": "Resume PDF file is required"}), 400

        resume_file = request.files["resume"]

        with tempfile.NamedTemporaryFile(delete=True, suffix=".pdf") as temp:
            resume_file.save(temp.name)
            processed = refine_resume(temp.name)

        return jsonify({
            "success": True,
            "refined_resume": processed["refined_resume"]
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/generate_cover_letter", methods=["POST"])
@token_required
def generate_cover_letter_api():
    try:
        refined_resume = request.json.get("refined_resume")
        job_description = request.json.get("job_description")

        if not refined_resume:
            return jsonify({"error": "refined_resume is required"}), 400
        if not job_description:
            return jsonify({"error": "job_description is required"}), 400

        cover_letter = generate_cover_letter(refined_resume, job_description)

        return jsonify({
            "success": True,
            "cover_letter": cover_letter
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    

if __name__=='__main__':
    db_init()
    app.run(debug=True)