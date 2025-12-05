from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.service.cover_letter_generator import generate_cover_letter, save_text_to_docx
from app.service.resume_refiner import refine_resume
from app.db_setup.auth import current_user,create_access_token
from app.db_setup.database import SessionLocal,User
from fastapi import HTTPException
from pydantic import BaseModel
import hashlib
import uvicorn

app=FastAPI("resume api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hashlib.sha256(password.encode()).hexdigest() == hashed

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class GeneratePPTRequest(BaseModel):
    topic: str
    slide: int = 10

@app.options("/{path:path}")
def options_handler(path: str):
    return {"message": "OK"}

@app.post("/signup")
def signup(request: SignupRequest):
    db=SessionLocal()
    try:
        if db.query(User).filter(User.email==request.email).first():
            raise HTTPException(400,"User already exists")
        
        hashed=hash_password(request.password)
        user=User(name=request.name, email=request.email, password=hashed)
        db.add(user)
        db.commit()
        return {"message":"User created successfully"}
    finally:
        db.close()

@app.post("/login")
def login(request: LoginRequest):
    db=SessionLocal()
    try:
        user=db.query(User).filter(User.email==request.email).first()
        if not user:
            raise HTTPException(404, "User not found")
        if not verify_password(request.password,user.password):
            raise HTTPException(401,"Wrong password")
        token=create_access_token({"sub":user.email})
        return {"access_token":token, "token_type":"bearer"}
    finally:
        db.close()

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=8000)