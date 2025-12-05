from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service.cover_letter_generator import generate_cover_letter, save_text_to_docx
from service.resume_refiner import refine_resume
from sqlalchemy import create_engine,INTEGER,String
from sqlalchemy.orm import sessionmaker,declarative_base

app=FastAPI("resume api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
engine = create_engine("sqlite:///resume.db")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
