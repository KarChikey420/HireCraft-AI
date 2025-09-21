import streamlit as st
import os
import logging
from dotenv import load_dotenv
from resume_refiner import refine_resume, REFINED_RESUME_FILE

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

st.title("📝 Step 1: Refine Your Resume")

uploaded_resume = st.file_uploader("Upload your resume (PDF format)", type=["pdf"])

if uploaded_resume:
    resume_path = "uploaded_resume.pdf"
    with open(resume_path, "wb") as f:
        f.write(uploaded_resume.read())
    st.success("✅ Resume uploaded successfully.")
    
    if st.button("Refine Resume"):
        with st.spinner("Refining your resume..."):
            try:
                refined_resume_text = refine_resume(resume_path)

                st.subheader("Refined Resume")
                st.text_area("Refined Resume Content", refined_resume_text, height=400)

                if os.path.exists(REFINED_RESUME_FILE):
                    with open(REFINED_RESUME_FILE, "r", encoding="utf-8") as f:
                        resume_text_file = f.read()
                    st.download_button("📥 Download Refined Resume (TXT)", resume_text_file, file_name="refined_resume.txt")

                st.success("✅ Resume refinement completed. Now go to **Generate Cover Letter** page.")
            except Exception as e:
                st.error(f"Error: {e}")
