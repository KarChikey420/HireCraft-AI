import os
import pdfplumber
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

load_dotenv()

def extract_text_from_pdf(pdf_file):
    """Extract text from PDF using pdfplumber"""
    text_content = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_content += text + "\n"
    return text_content

def refine_resume(resume_file):
    resume_content = extract_text_from_pdf(resume_file)

    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=os.getenv("GOOGLE_API"),
        temperature=0.7
    )

    prompt = PromptTemplate(
        input_variables=["resume"],
        template="Refine the following resume to make it more professional, clear, and impactful:\n\n{resume}"
    )

    final_prompt = prompt.format(resume=resume_content)
    response = llm.invoke(final_prompt)

    return response.content

if __name__ == "__main__":
    resume_file = "cv (5).pdf"
    refined_resume = refine_resume(resume_file)
    print(refined_resume)

