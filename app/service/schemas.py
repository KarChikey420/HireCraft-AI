"""Pydantic request/response models for HireCraft-AI endpoints."""

from pydantic import BaseModel, Field


# ── Request Models ──────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: str = Field(..., format="email")
    password: str = Field(..., min_length=6)


class LoginRequest(BaseModel):
    email: str = Field(..., format="email")
    password: str = Field(...)


class TailorResumeRequest(BaseModel):
    resume_text: str = Field(..., description="Plain-text resume content")
    job_description: str = Field(..., description="Target job description")


class ATSScoreRequest(BaseModel):
    resume_text: str = Field(..., description="Plain-text resume content")
    job_description: str = Field(..., description="Target job description")


# ── Response Models ─────────────────────────────────────────────────────────

class TailorResumeResponse(BaseModel):
    tailored_resume: str = Field(..., description="Resume rewritten to mirror JD language")
    changes_summary: list[str] = Field(
        default_factory=list,
        description="List of changes applied during tailoring",
    )


class SectionScores(BaseModel):
    skills: int = Field(..., ge=0, le=100, description="Skills section match score")
    experience: int = Field(..., ge=0, le=100, description="Experience section match score")
    summary: int = Field(..., ge=0, le=100, description="Summary section match score")


class ATSScoreResponse(BaseModel):
    score: int = Field(..., ge=0, le=100, description="Overall ATS compatibility score")
    matched_keywords: list[str] = Field(default_factory=list)
    missing_keywords: list[str] = Field(default_factory=list)
    section_scores: SectionScores
    suggestions: list[str] = Field(default_factory=list)
