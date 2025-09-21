import streamlit as st
import os
import logging
from dotenv import load_dotenv
from resume_refiner import refine_resume, REFINED_RESUME_FILE
from cover_letter_generator import generate_cover_letter, COVER_LETTER_FILE, COVER_LETTER_DOCX

# Setup
load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

st.set_page_config(page_title="Resume & Cover Letter Generator", layout="wide")

st.title("📄 Resume & Cover Letter Generator")
st.write("Upload your resume PDF, refine it, and generate a tailored cover letter for a job description.")

# --- Step 1: Upload Resume ---
st.header("Step 1: Upload Resume PDF")
uploaded_resume = st.file_uploader("Upload your resume (PDF format)", type=["pdf"])

refined_resume_text = None

if uploaded_resume:
    resume_path = "uploaded_resume.pdf"
    with open(resume_path, "wb") as f:
        f.write(uploaded_resume.read())
    st.success("✅ Resume uploaded successfully.")
    
    if st.button("Refine Resume"):
        with st.spinner("Refining your resume..."):
            try:
                refined_resume_text = refine_resume(resume_path)

                # Show refined resume in text area
                st.subheader("📝 Refined Resume")
                st.text_area("Refined Resume Content", refined_resume_text, height=400)

                # Show file contents if saved
                if os.path.exists(REFINED_RESUME_FILE):
                    with open(REFINED_RESUME_FILE, "r", encoding="utf-8") as f:
                        resume_text_file = f.read()
                    st.download_button("📥 Download Refined Resume (TXT)", resume_text_file, file_name="refined_resume.txt")
            except Exception as e:
                st.error(f"Error: {e}")

# --- Step 2: Job Description Input ---
st.header("Step 2: Enter Job Description")
job_description = st.text_area("Paste the job description here", height=200)

# --- Step 3: Generate Cover Letter ---
if st.button("Generate Cover Letter"):
    if not refined_resume_text:
        st.error("⚠ Please refine your resume first.")
    elif not job_description.strip():
        st.error("⚠ Please provide a job description.")
    else:
        with st.spinner("Generating cover letter..."):
            try:
                cover_letter = generate_cover_letter(refined_resume_text, job_description)

                # Show in text area
                st.subheader("📨 Generated Cover Letter")
                st.text_area("Cover Letter Content", cover_letter, height=400)

                # Show saved .txt file
                if os.path.exists(COVER_LETTER_FILE):
                    with open(COVER_LETTER_FILE, "r", encoding="utf-8") as f:
                        cl_txt = f.read()
                    st.download_button("📥 Download Cover Letter (TXT)", cl_txt, file_name="cover_letter.txt")

                # Show saved .docx file
                if os.path.exists(COVER_LETTER_DOCX):
                    with open(COVER_LETTER_DOCX, "rb") as f:
                        cl_docx = f.read()
                    st.download_button("📥 Download Cover Letter (DOCX)", cl_docx, file_name="cover_letter.docx")
                
                st.success("✅ Cover letter generated successfully.")
            except Exception as e:
                st.error(f"Error: {e}")
