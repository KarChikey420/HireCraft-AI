import streamlit as st
import os
import logging
from dotenv import load_dotenv
from resume_refiner import REFINED_RESUME_FILE
from cover_letter_generator import generate_cover_letter, COVER_LETTER_FILE, COVER_LETTER_DOCX

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

st.title("📨 Step 2: Generate Cover Letter")

if not os.path.exists(REFINED_RESUME_FILE):
    st.warning("⚠ Please refine your resume first (go to **Step 1: Refine Resume**).")
else:
    with open(REFINED_RESUME_FILE, "r", encoding="utf-8") as f:
        refined_resume_text = f.read()

    st.subheader("Enter Job Description")
    job_description = st.text_area("Paste the job description here", height=200)

    if st.button("Generate Cover Letter"):
        if not job_description.strip():
            st.error("⚠ Please provide a job description.")
        else:
            with st.spinner("Generating cover letter..."):
                try:
                    cover_letter = generate_cover_letter(refined_resume_text, job_description)

                    st.subheader("Generated Cover Letter")
                    st.text_area("Cover Letter Content", cover_letter, height=400)

                    if os.path.exists(COVER_LETTER_FILE):
                        with open(COVER_LETTER_FILE, "r", encoding="utf-8") as f:
                            cl_txt = f.read()
                        st.download_button("📥 Download Cover Letter (TXT)", cl_txt, file_name="cover_letter.txt")

                    if os.path.exists(COVER_LETTER_DOCX):
                        with open(COVER_LETTER_DOCX, "rb") as f:
                            cl_docx = f.read()
                        st.download_button("📥 Download Cover Letter (DOCX)", cl_docx, file_name="cover_letter.docx")

                    st.success("✅ Cover letter generated successfully.")
                except Exception as e:
                    st.error(f"Error: {e}")
