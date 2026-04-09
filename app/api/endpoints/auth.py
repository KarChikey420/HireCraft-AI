from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db_setup.auth import create_access_token
from app.db_setup.database import SessionLocal, User
from app.core.security import hash_password, verify_password
from app.service.schemas import SignupRequest, LoginRequest

router = APIRouter()

from sqlalchemy.orm import Session
from app.db_setup.database import SessionLocal, User, get_db

router = APIRouter()

@router.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(400, "User already exists")

    hashed = hash_password(request.password)
    new_user = User(name=request.name, email=request.email, password=hashed)
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(404, "User not found")

    if not verify_password(request.password, user.password):
        raise HTTPException(401, "Wrong password")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
