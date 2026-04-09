# 🚀 HireCraft-AI Backend

HireCraft-AI is a modular, high-performance FastAPI backend designed for advanced resume optimization, tailoring, and ATS analysis using local OSS LLM inference.

---

## 🏗️ System Architecture & Flow

The backend follows a **systematic modular architecture** to ensure separation of concerns and scalability.

### **The Request Flow**
1.  **Entry Point (`app/main.py`)**: Initializes FastAPI, configures CORS, and includes the root API router.
2.  **API Gateway (`app/api/api.py`)**: Aggregates all endpoint routers (`auth`, `resume`).
3.  **Modular Routers (`app/api/endpoints/`)**:
    *   `auth.py`: Handles JWT-based user authentication and DB interaction.
    *   `resume.py`: Manages file uploads (PDF) and JSON-based resume analysis requests.
4.  **Security Layer (`app/core/security.py`)**: Centralized password hashing (SHA-256) and verification.
5.  **Service Layer (`app/service/`)**:
    *   `resume_refiner.py`: The heart of the app. It handles PDF extraction, configuration of the LLM provider, and instruction orchestration.
    *   `schemas.py`: Unified Pydantic models for request/response validation.
6.  **Instruction Engine (`app/prompts/`)**: Clean separation of LLM logic from code. Prompts are stored in optimized `.md` files to minimize token usage and allow easy auditing.

---

## 🔥 Key Features

### 1. Resume Refinement
*   Parses raw PDF resumes.
*   Enriches experience bullets using strong action verbs and quantified impact placeholders.
*   Generates a "Recruiter Simulation" (Shortlist decision + Reasoning).

### 2. JD-Based Tailoring
*   Performs a two-pass analysis: (1) Extract JD requirements, (2) Rewrite the resume to mirror JD keywords without fabrication.
*   Returns a summary of all changes made.

### 3. ATS Score & Keyword Gap Analysis
*   **Weighted Scoring**: Skills (40%), Experience (35%), Summary (25%).
*   Identifies exactly which keywords from the JD are matched or missing.
*   Provides actionable suggestions to improve the ATS score.

---

## 🛠️ Tech Stack & Provider

*   **Framework**: FastAPI
*   **Database**: SQLAlchemy + Postgres (Neon)
*   **LLM Provider**: Local OSS Inference Server
    *   **Model**: `openai/gpt-oss-120b`
    *   **Protocol**: OpenAI-compatible API
*   **Text Extraction**: `pdfplumber`

---

## ⚙️ Environment Configuration (`.env`)

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `gpt-oss-120` | API Key for the inference server (`nvapi-...`) |
| `MY_SECRET_KEY` | Secret for JWT signing |
| `Algorithm` | JWT Algorithm (default: "HS256") |

---

## 🚀 Running the Backend

> [!IMPORTANT]
> **Port Reconciliation**: The backend is configured to run on **Port 8001**. This is to prevent conflicts with the local LLM inference server which typically occupies Port 8000.

### **Quick Start**
```powershell
# Navigate to the project root
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### **API Documentation**
Once running, visit the interactive Swagger UI at:
👉 **[http://localhost:8001/docs](http://localhost:8001/docs)**

---

## 📁 Detailed Directory Structure
```text
app/
├── api/
│   ├── api.py           # Root aggregator
│   └── endpoints/       # Route implementations
├── core/
│   └── security.py      # Auth utilities
├── db_setup/
│   ├── auth.py          # JWT logic & Dependency
│   └── database.py      # DB Models & Engine
├── prompts/             # MD-based instruction sets
├── service/
│   ├── resume_refiner.py # LLM orchestration logic
│   └── schemas.py        # Centralized Pydantic models
└── main.py              # Entry Point
```