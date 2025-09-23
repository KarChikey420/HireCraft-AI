# 📄 HireCraft-AI

An **AI-powered tool** that helps you create professional resumes and tailored cover letters with ease.

---

## 🚀 Features
- **Resume Refinement**: Automatically polish your uploaded PDF resume  
- **Cover Letter Generation**: Create tailored cover letters for job applications  
- **Smart Database**: Stores and reuses similar applications to save time  
- **Web Interface**: Simple and interactive Streamlit-based interface  

---

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/KarChikey420/HireCraft-AI.git
cd HireCraft-AI
2. Create virtual environment
bash
Copy code
python -m venv venv
source venv/bin/activate   # Linux/Mac
# or
venv\Scripts\activate      # Windows
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
4. Set up API key
Create a .env file in the project root and add:

env
Copy code
GOOGLE_API=your_google_api_key_here
▶️ Usage
Run the Streamlit app:

bash
Copy code
streamlit run app.py
📁 Project Structure
bash
Copy code
├── resume_refiner.py          # Resume processing
├── cover_letter_generator.py  # Cover letter creation
├── chromadb.py                # Database storage
├── app.py                     # Streamlit interface
├── requirements.txt           # Dependencies
└── .env                       # Configuration

🎯 How It Works
Upload and refine your resume (PDF format)

Enter job description to generate a customized cover letter

Smart Feature: Similar past applications are reused to save time

📋 Requirements
Python 3.8+

Google Generative AI API key

Resume in PDF format

🔧 Main Dependencies
Streamlit

LangChain Google GenAI

pdfplumber

python-docx

ChromaDB

python-dotenv

🆘 Troubleshooting
Ensure your PDF contains selectable text (not scanned images)

Verify that your Google API key is correct

Check the console logs for error messages

📜 License
MIT License – feel free to use and modify as needed.

pgsql
Copy code

Would you like me to also add a **demo screenshot section** (for UI) and **example commands/ou