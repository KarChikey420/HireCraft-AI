import uvicorn
import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Ensure the parent directory is in the path to avoid ModuleNotFoundError on production
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.api.api import api_router

app = FastAPI(
    title="HireCraft-AI",
    description="AI-powered resume optimization and refinement API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)

@app.get("/", tags=["Root"])
def root():
    """Service health check."""
    return {"message": "HireCraft-AI API is running", "status": "ok"}


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
