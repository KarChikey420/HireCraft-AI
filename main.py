import logging
from resume_refiner import refine_resume
from cover_letter_generator import generate_cover_letter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    resume_file = "cv (5).pdf"
    job_description = """
We are looking for a highly motivated Data Analyst with experience in Python, SQL, and data visualization tools. 
The ideal candidate should have strong analytical skills, attention to detail, and the ability to work independently on data-driven projects.
"""

    try:
        # Step 1: Refine Resume
        refined_resume = refine_resume(resume_file)
        logger.info("Refined Resume:\n" + refined_resume)

        # Step 2: Generate Cover Letter
        cover_letter = generate_cover_letter(refined_resume, job_description)
        logger.info("Generated Cover Letter:\n" + cover_letter)

    except FileNotFoundError as e:
        logger.error(f"File not found: {e}")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
