import io
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db_setup.auth import current_user as auth_user
from app.db_setup.database import get_db, User, Resume
from app.service.resume_refiner import refine_resume, tailor_resume, ats_score, extract_text_from_pdf
from app.service.schemas import (
    TailorResumeRequest,
    TailorResumeResponse,
    ATSScoreRequest,
    ATSScoreResponse,
)

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@router.post("/refiner")
async def resume_refiner(
    file: UploadFile = File(...),
    job_description: str = Form(""),
    mode: str = Form("polish"),
    target_role: str = Form(""),
    user_email: str = Depends(auth_user),
    db: Session = Depends(get_db)
):
    """Refine a resume (Store in DB, No temporary files)."""
    print(f"DEBUG: Starting refinement for {user_email}")
    # 1. Size Validation
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        print(f"DEBUG: File too large: {len(contents)}")
        raise HTTPException(413, "File too large. Maximum size is 10MB.")

    # 2. Extract Text (In-memory)
    try:
        print("DEBUG: Extracting text in-memory...")
        pdf_stream = io.BytesIO(contents)
        text_content = extract_text_from_pdf(pdf_stream)
        print(f"DEBUG: Extracted {len(text_content)} characters")
        
        # 3. Process with LLM
        pdf_stream.seek(0)
        print("DEBUG: Calling LLM Engine...")
        refined_output = refine_resume(
            resume_source=pdf_stream,
            job_description=job_description,
            mode=mode,
            target_role=target_role
        )
        print("DEBUG: LLM Refinement success")

        # 4. Persistence (History Mode)
        print("DEBUG: Persisting to DB...")
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
            print(f"DEBUG: User not found in DB: {user_email}")
            raise HTTPException(404, "User context lost.")
            
        new_resume = Resume(
            user_id=user.id,
            filename=file.filename,
            raw_content=contents,
            parsed_text=text_content
        )
        db.add(new_resume)
        db.commit()
        print("DEBUG: DB Persistence success")

        return refined_output
    except HTTPException:
        raise
    except Exception as e:
        print(f"DEBUG: Refinement CRASHED: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(500, f"Refinement failed: {str(e)}")


@router.post("/resume/parse")
async def resume_parse(
    file: UploadFile = File(...),
    user_email: str = Depends(auth_user),
    db: Session = Depends(get_db)
):
    """Extract text from a resume PDF and store in DB."""
    # 1. Size Validation
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(413, "File too large. Maximum size is 10MB.")

    # 2. Extract Text (In-memory)
    try:
        pdf_stream = io.BytesIO(contents)
        text_content = extract_text_from_pdf(pdf_stream)

        # 3. Persistence
        user = db.query(User).filter(User.email == user_email).first()
        if not user:
             raise HTTPException(404, "User context lost.")

        new_resume = Resume(
            user_id=user.id,
            filename=file.filename,
            raw_content=contents,
            parsed_text=text_content
        )
        db.add(new_resume)
        db.commit()

        return {"text": text_content}
    except Exception as e:
        raise HTTPException(500, f"Parsing failed: {str(e)}")


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
