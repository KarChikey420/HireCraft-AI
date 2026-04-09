from sqlalchemy import create_engine,Column,Integer,String,LargeBinary,DateTime,ForeignKey
from sqlalchemy.orm import sessionmaker,declarative_base,relationship
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL")

engine=create_engine(DATABASE_URL,pool_pre_ping=True)

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base=declarative_base()

class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String(100))
    email=Column(String(255), unique=True)
    password=Column(String(255))
    
    resumes = relationship("Resume", back_populates="user")

class Resume(Base):
    __tablename__ = "resumes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String(255))
    raw_content = Column(LargeBinary) # Stores the PDF bytes
    parsed_text = Column(String) # Extracted text cached for speed
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="resumes")

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()