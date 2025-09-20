import os
import logging
from fpdf import FPDF
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

COVER_LETTER_FILE = "cover_letter.txt"
COVER_LETTER_PDF = "cover_letter.pdf"

def save_text_to_pdf(text, pdf_file, title="Cover Letter"):
    pdf = FPDF()
    pdf.add_page()

    # Draw border
    pdf.set_line_width(0.8)
    pdf.rect(5, 5, 200, 287)  # x, y, width, height

    # Title
    pdf.set_font("Arial", 'B', 18)
    pdf.cell(0, 10, title, ln=True, align="C")
    pdf.ln(10)

    pdf.set_font("Arial", size=12)
    for line in text.split("\n"):
        if line.strip() == "":
            pdf.ln(2)
        else:
            pdf.multi_cell(0, 8, line)

    pdf.output(pdf_file)
    logger.info(f"PDF saved to {pdf_file}")

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

    save_text_to_pdf(cover_letter, COVER_LETTER_PDF, title="Cover Letter")
    logger.info("Cover letter generation and PDF creation completed successfully.")
    return cover_letter
