# import os
# import logging
# import pdfplumber
# from dotenv import load_dotenv
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.prompts import PromptTemplate

# load_dotenv()
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# def extract_text_from_pdf(pdf_file):
#     logger.info(f"Extracting text from PDF: {pdf_file}")
#     text_content = ""
#     with pdfplumber.open(pdf_file) as pdf:
#         for i, page in enumerate(pdf.pages, start=1):
#             text = page.extract_text()
#             if text:
#                 text_content += text + "\n"
#             else:
#                 logger.warning(f"No text found on page {i}")
#     logger.info("PDF text extraction completed.")
#     return text_content


# def refine_resume(resume_file):
#     logger.info(f"Refining resume: {resume_file}")

#     # Validate file
#     if not os.path.exists(resume_file):
#         raise FileNotFoundError(f"Resume file not found: {resume_file}")

#     api_key = os.getenv("GOOGLE_API")
#     if not api_key:
#         raise ValueError("Google API key not found. Please set the GOOGLE_API environment variable.")

#     resume_content = extract_text_from_pdf(resume_file)

#     if not resume_content.strip():
#         raise ValueError("No text content extracted from the PDF file. Please check if the PDF contains readable text.")

#     llm = ChatGoogleGenerativeAI(
#         model="gemini-1.5-flash",
#         google_api_key=api_key,
#         temperature=0.7
#     )

#     prompt = PromptTemplate(
#         input_variables=["resume"],
#         template="""
# You are a professional resume writer and career coach. Refine the following resume:

# {resume}

# Please rewrite the resume in a polished, professional format while keeping all important information intact.
# """
#     )

#     try:
#         final_prompt = prompt.format(resume=resume_content)
#         response = llm.invoke(final_prompt)

#         refined_resume = response.content.strip()

#         resume_data = {
#             "refined_resume": refined_resume
#         }

#         logger.info("Resume refinement completed successfully.")
#         return resume_data 
    
#     except Exception as e:
#         logger.error(f"Error during resume refinement: {e}")
#         raise

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
