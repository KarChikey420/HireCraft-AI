import os
import json
import logging

import pdfplumber
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ── Helpers ─────────────────────────────────────────────────────────────────

def _get_llm(temperature: float = 0.2) -> ChatOpenAI:
    """Return a configured OpenAI-compatible instance (gpt-oss-120b)."""
    # The API key is stored in the .env as 'gpt-oss-120'
    api_key = os.getenv("gpt-oss-120")
    if not api_key:
        raise ValueError("gpt-oss-120 API key missing in environment.")
    
    return ChatOpenAI(
        model="openai/gpt-oss-120b",
        api_key=api_key,
        base_url="http://127.0.0.1:8000/v1",  # Local inference server endpoint
        temperature=temperature,
        model_kwargs={"response_format": {"type": "json_object"}},
    )


def _load_prompt(filename: str) -> str:
    """Load prompt content from the prompts directory."""
    # Service is in app/service, prompts are in app/prompts
    base_dir = os.path.dirname(os.path.dirname(__file__))
    path = os.path.join(base_dir, "prompts", filename)
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception as e:
        logger.error(f"Failed to load prompt from {path}: {e}")
        raise ValueError(f"Could not load instruction set: {filename}")


def _parse_json_response(raw: str) -> dict:
    """Strip optional markdown fences and parse JSON from LLM output."""
    content = raw.strip()
    if content.startswith("```json"):
        content = content[7:]
    if content.startswith("```"):
        content = content[3:]
    if content.endswith("```"):
        content = content[:-3]
    try:
        return json.loads(content.strip())
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse LLM JSON output: {e}\nRaw output: {raw}")
        raise ValueError("LLM failed to produce valid structured JSON output.")


def extract_text_from_pdf(pdf_file) -> str:
    logger.info(f"Extracting text from PDF: {pdf_file}")
    text_content = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_content += text + "\n"
    if not text_content.strip():
        raise ValueError("No readable text found in PDF.")
    return text_content


# ── Feature 0: Existing Resume Refinement ───────────────────────────────────

def refine_resume(resume_file, job_description="", mode="polish", target_role=""):
    logger.info(f"Refining resume: {resume_file} with mode: {mode}")

    if not os.path.exists(resume_file):
        raise FileNotFoundError(f"Resume file not found: {resume_file}")

    resume_text = extract_text_from_pdf(resume_file)
    llm = _get_llm(temperature=0.2)
    system_prompt = _load_prompt("resume_refiner_prompt.md")

    human_prompt = f"""
TARGET ROLE: {target_role}
MODE: {mode}

JOB DESCRIPTION:
{job_description if job_description else "None provided - Skip JD specific keyword injection."}

RAW RESUME:
{resume_text}
    """

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=human_prompt.strip()),
    ]

    response = llm.invoke(messages)
    structured_data = _parse_json_response(response.content)

    logger.info("Resume refinement completed.")
    return structured_data


# ── Feature 1: JD-Based Resume Tailoring ────────────────────────────────────

def tailor_resume(resume_text: str, jd: str) -> dict:
    """Two-pass JD-based resume tailoring."""
    logger.info("Starting JD-based resume tailoring")

    if not resume_text.strip():
        raise ValueError("resume_text is empty.")
    if not jd.strip():
        raise ValueError("job_description is empty.")

    llm = _get_llm(temperature=0.3)
    system_prompt = _load_prompt("tailor_resume_prompt.md")

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(
            content=(
                f"JOB DESCRIPTION:\n{jd}\n\n"
                f"CANDIDATE RESUME:\n{resume_text}"
            )
        ),
    ]

    response = llm.invoke(messages)
    result = _parse_json_response(response.content)

    if "tailored_resume" not in result:
        raise ValueError("LLM response missing 'tailored_resume' key.")
    result.setdefault("changes_summary", [])

    logger.info(f"Resume tailoring completed.")
    return result


# ── Feature 2: ATS Score + Keyword Gap Analysis ────────────────────────────

def ats_score(resume_text: str, jd: str) -> dict:
    """Compute an ATS compatibility score with keyword gap analysis."""
    logger.info("Starting ATS score analysis")

    if not resume_text.strip():
        raise ValueError("resume_text is empty.")
    if not jd.strip():
        raise ValueError("job_description is empty.")

    llm = _get_llm(temperature=0.1)
    system_prompt = _load_prompt("ats_score_prompt.md")

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(
            content=(
                f"JOB DESCRIPTION:\n{jd}\n\n"
                f"CANDIDATE RESUME:\n{resume_text}"
            )
        ),
    ]

    response = llm.invoke(messages)
    result = _parse_json_response(response.content)

    required_keys = {"score", "matched_keywords", "missing_keywords", "section_scores", "suggestions"}
    missing = required_keys - set(result.keys())
    if missing:
        raise ValueError(f"LLM response missing keys: {missing}")

    result["score"] = max(0, min(100, int(result["score"])))

    logger.info(f"ATS analysis completed — score: {result['score']}/100")
    return result
