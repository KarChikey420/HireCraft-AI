import os
import logging
import pdfplumber
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def extract_text_from_pdf(pdf_file):
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


def refine_resume(resume_file):
    logger.info(f"Refining resume: {resume_file}")

    if not os.path.exists(resume_file):
        raise FileNotFoundError(f"Resume file not found: {resume_file}")

    api_key = os.getenv("GOOGLE_API")
    if not api_key:
        raise ValueError("GOOGLE_API key missing.")

    resume_text = extract_text_from_pdf(resume_file)

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key,
        temperature=0.5
    )

    prompt = PromptTemplate(
        input_variables=["resume"],
        template="You are a professional resume writer. Refine this resume:\n\n{resume}"
    )

    final_prompt = prompt.format(resume=resume_text)
    response = llm.invoke(final_prompt)
    refined_resume = response.content.strip()

    logger.info("Resume refinement completed.")
    return {"refined_resume": refined_resume}
