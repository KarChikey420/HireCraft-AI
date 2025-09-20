import os
import logging
import pdfplumber
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

REFINED_RESUME_FILE = "refined_resume.txt"

def extract_text_from_pdf(pdf_file):
    logger.info(f"Extracting text from PDF: {pdf_file}")
    text_content = ""
    with pdfplumber.open(pdf_file) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            if text:
                text_content += text + "\n"
            else:
                logger.warning(f"No text found on page {i}")
    logger.info("PDF text extraction completed.")
    return text_content

def refine_resume(resume_file):
    logger.info(f"Refining resume: {resume_file}")
    resume_content = extract_text_from_pdf(resume_file)

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API"),
        temperature=0.7
    )

    prompt = PromptTemplate(
        input_variables=["resume"],
        template="""
You are a professional resume writer and career coach. Refine the following resume:

{resume}

Please rewrite the resume in a polished, professional format while keeping all important information intact.
"""
    )

    final_prompt = prompt.format(resume=resume_content)
    response = llm.invoke(final_prompt)

    refined_resume = response.content
    with open(REFINED_RESUME_FILE, "w", encoding="utf-8") as f:
        f.write(refined_resume)
        logger.info(f"Refined resume saved to {REFINED_RESUME_FILE}")

    logger.info("Resume refinement completed successfully.")
    return refined_resume
