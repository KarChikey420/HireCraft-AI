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

### Quick Start (Recommended)
**Windows:**
```bash
start_app.bat
```

**Linux/Mac:**
```bash
chmod +x start_app.sh
./start_app.sh
```

### Manual Start
**Backend:**
```bash
python -m uvicorn app.app:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd resume_ui
npm run dev
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
📁 Project Structure
```
├── app/
│   ├── db_setup/
│   │   ├── auth.py            # Authentication logic
│   │   ├── database.py        # Database models
│   │   └── chromadb.py        # Vector database
│   ├── service/
│   │   ├── resume_refiner.py  # Resume processing
│   │   └── cover_letter_generator.py  # Cover letter creation
│   └── app.py                 # FastAPI backend
├── resume_ui/                 # React frontend
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/            # Application pages
│   │   └── contexts/         # React contexts
│   └── package.json          # Frontend dependencies
├── requirements.txt           # Backend dependencies
├── start_app.bat             # Windows startup script
├── start_app.sh              # Unix startup script
└── .env                      # Configuration
```

🎯 How It Works
1. **Sign up/Login** - Create an account or log into your existing account
2. **Upload Resume** - Upload your resume in PDF format for refinement
3. **Generate Cover Letter** - Enter job description to create a tailored cover letter
4. **Smart Database** - Similar past applications are reused to save time
5. **Download** - Get your refined resume and cover letter in DOCX format

📋 Requirements
Python 3.8+

Google Generative AI API key

Resume in PDF format

🔧 Main Dependencies
**Backend:**
- FastAPI
- LangChain Google GenAI
- pdfplumber
- python-docx
- ChromaDB
- SQLAlchemy
- python-dotenv

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- Lucide Icons

🆘 Troubleshooting
Ensure your PDF contains selectable text (not scanned images)

Verify that your Google API key is correct

Check the console logs for error messages

📜 License
MIT License – feel free to use and modify as needed.

pgsql
Copy code

Would you like me to also add a **demo screenshot section** (for UI) and **example commands/ou