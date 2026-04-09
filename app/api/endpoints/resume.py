import uuid
import os
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException

from app.db_setup.auth import current_user as auth_user
from app.service.resume_refiner import refine_resume, tailor_resume, ats_score
from app.service.schemas import (
    TailorResumeRequest,
    TailorResumeResponse,
    ATSScoreRequest,
    ATSScoreResponse,
)

router = APIRouter()

@router.post("/refiner")
async def resume_refiner(
    file: UploadFile = File(...),
    job_description: str = Form(""),
    mode: str = Form("polish"),
    target_role: str = Form(""),
    current_user: str = Depends(auth_user)
):
    """Refine a resume (Upload PDF)."""
    temp_path = f"temp_{uuid.uuid4()}.pdf"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    try:
        refined_output = refine_resume(
            resume_file=temp_path,
            job_description=job_description,
            mode=mode,
            target_role=target_role
        )
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

    return refined_output


@router.post("/resume/tailor", response_model=TailorResumeResponse)
async def resume_tailor(
    request: TailorResumeRequest,
    current_user: str = Depends(auth_user),
):
    """Tailor a resume to match a specific job description."""
    try:
        result = tailor_resume(
            resume_text=request.resume_text,
            jd=request.job_description,
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tailoring failed: {str(e)}")
    return result


@router.post("/resume/ats-score", response_model=ATSScoreResponse)
async def resume_ats_score(
    request: ATSScoreRequest,
    current_user: str = Depends(auth_user),
):
    """Compute an ATS compatibility score with keyword gap analysis."""
    try:
        result = ats_score(
            resume_text=request.resume_text,
            jd=request.job_description,
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ATS scoring failed: {str(e)}")
    return result
