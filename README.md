# Resume_Summarizer AI Screening Dashboard

**Resume_Summarizer** is a high-fidelity, intelligent talent acquisition screening platform that allows recruiters and engineering managers to upload, parse, analyze, and rank candidate resumes instantly using Gemini 3.5 Flash.

The dashboard aligns candidate experience timelines, academic degrees, and extracted technical competencies directly against custom or preset target Job Descriptions to produce actionable suitability metrics, key strengths, and qualified recruiter verdicts.

---

## 🎯 The Core Intent of the Resume Summarizer

In modern tech recruitment, hiring managers suffer from **contextual fatigue** and **CV formatting chaos**. Resumes come in multi-page PDFs, disorganized plain text, or image screenshots, each structured differently.

This platform serves as an **intelligent analytical sieve**:
1. **Accelerated Candidate Triage:** Instantly ranks and highlights applicants based on deep semantic compatibility with a specific target job profile, rather than rigid keyword filters.
2. **Standardized Summaries:** Normalizes every resume into a clean, uniform bento-grid profile detailing calculated years of experience, unique strengths, academic milestones, and timeline events.
3. **Interactive Side-by-Side Matrix:** Supports a comparative view of multiple applicants, making candidate review sessions highly visual and collaborative.

---

## 🚀 Key Features

*   **Dynamic Role Alignment:** Align parses against preset templates (Senior Full-Stack Engineer, Product Designer, AI/ML Scientist) or paste any custom Job Description to trigger custom compatibility scoring.
*   **Intelligent Gemini Parser:** Supports direct upload of **PDF, plain text (.txt), and high-contrast images (PNG/JPG)**. Runs structured schema generation with Gemini 3.5 Flash.
*   **Interactive Bento Layout**: Elegant display blocks organizing biography, extracted skills, specific timeline events, and core strengths.
*   **Interactive Comparison Matrix**: An on-the-fly analytical table rendering fit scores, experience length, and qualitative verdicts side-by-side.
*   **Vercel & Cloud-Run Deployment Ready**: Configured with light, serverless-friendly routing and dynamic `/tmp` fallback storage for persistence.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
*   **Backend:** Node.js Express server acting as a secure proxy to hide secret API keys.
*   **AI Engine:** `@google/genai` (SDK utilizing Gemini models)
*   **Hosting:** Fully configured for deployment to **Vercel** (`vercel.json`) and **Cloud Run** (`server.ts`).

---

## 🔑 Environment Setup

Configure the following secrets or local environment variables before deploying:

```env
# Google Gemini API key used for resume parsing
GOOGLE_API_KEY="your_google_api_key_here"

# Alternative key (fallback for compatibility)
GEMINI_API_KEY="your_gemini_api_key_here"
```

*Note: If no API key is specified, the application automatically runs in a fully functional mock mode seeded with highly detailed sample resumes.*

---

## 📦 Local Installation

To run this project locally:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development environment:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
