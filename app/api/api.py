from fastapi import APIRouter
from .endpoints import auth, resume

api_router = APIRouter()

# Authentication routes
api_router.include_router(auth.router, tags=["Authentication"])

# Resume processing routes
api_router.include_router(resume.router, tags=["Resume Processing"])
