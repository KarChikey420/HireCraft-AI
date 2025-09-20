import os
import logging
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

COVER_LETTER_FILE = "cover_letter.txt"

def generate_cover_letter(resume_text, job_description):
    logger.info("Generating cover letter...")
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API"),
        temperature=0.7
    )

    prompt = PromptTemplate(
        input_variables=["resume", "job_desc"],
        template="""
Using this refined resume:
{resume}

And this job description:
{job_desc}

Generate a professional cover letter tailored for this job.
"""
    )

    final_prompt = prompt.format(resume=resume_text, job_desc=job_description)
    response = llm.invoke(final_prompt)

    cover_letter = response.content
    with open(COVER_LETTER_FILE, "w", encoding="utf-8") as f:
        f.write(cover_letter)
        logger.info(f"Cover letter saved to {COVER_LETTER_FILE}")

    logger.info("Cover letter generation completed successfully.")
    return cover_letter
