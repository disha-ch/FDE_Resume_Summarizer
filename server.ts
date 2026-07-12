// Resume_Summarizer Backend Server
import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Use GOOGLE_API_KEY, fallback to GEMINI_API_KEY
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("Missing API key: Please set GOOGLE_API_KEY or GEMINI_API_KEY. App will run in mock/seeded mode.");
}

// Initialize Gemini Client
const ai = GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Define local data store path (use /tmp in production/Vercel to avoid read-only filesystem errors)
const DATA_FILE = process.env.NODE_ENV === "production" || process.env.VERCEL
  ? path.join("/tmp", "resume_data_store.json")
  : path.join(process.cwd(), "resume_data_store.json");

// Default initial seeded resume analyses
const SEEDED_RESUMES = [
  {
    id: "seed-1",
    fileName: "Sophia_Chen_Resume.pdf",
    fileSize: "142 KB",
    uploadedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    summary: {
      candidateName: "Sophia Chen",
      candidateEmail: "sophia.chen@devmail.io",
      candidatePhone: "+1 (555) 321-9876",
      skills: ["React 19", "TypeScript", "Node.js", "Express", "PostgreSQL", "AWS Suite", "Docker", "REST APIs", "GraphQL"],
      experienceYears: 7.5,
      summary: "Highly motivated Senior Full-Stack Engineer with over 7 years of experience building scalable, modern web applications. Proven expertise in microservices architecture, clean React coding, and cloud deployments on AWS.",
      education: [
        { degree: "M.S. in Computer Science", school: "Stanford University", year: "2016 - 2018" },
        { degree: "B.S. in Software Engineering", school: "UC Berkeley", year: "2012 - 2016" }
      ],
      experienceHistory: [
        {
          role: "Lead Full-Stack Engineer",
          company: "SaaSify Systems Inc.",
          duration: "2021 - Present",
          description: "Led a team of 4 frontend engineers to rebuild the enterprise dashboard in React and Tailwind CSS, improving core web vitals by 45%. Established a continuous delivery pipeline using GitHub Actions and Docker containers on AWS ECS."
        },
        {
          role: "Senior Software Engineer",
          company: "ByteCraft Labs",
          duration: "2018 - 2021",
          description: "Architected and implemented high-throughput Express REST APIs handling over 2 million daily requests. Optimized database performance by restructuring PostgreSQL indexes and implementing Redis caching pools."
        }
      ],
      keyStrengths: [
        "Robust technical design & clean code principles (SOLID)",
        "Excellent mentorship and leadership of engineering teams",
        "Deep experience optimizing React rendering and Node.js performance"
      ],
      verdict: "An exceptional fit for Lead or Senior Full-Stack Engineering roles. Sophia brings stellar tech skills, clear architecture design patterns, and great leadership potential.",
      suitabilityScore: 96
    }
  },
  {
    id: "seed-2",
    fileName: "Marcus_Thorne_Resume.pdf",
    fileSize: "2.1 MB",
    uploadedAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    summary: {
      candidateName: "Marcus Thorne",
      candidateEmail: "marcus.designs@pixelcraft.net",
      candidatePhone: "+1 (555) 765-4321",
      skills: ["UX/UI Design", "Figma", "Design Systems", "Prototyping", "User Research", "Interaction Design", "HTML/CSS", "Adobe Creative Suite"],
      experienceYears: 6,
      summary: "Creative and analytical Senior Product Designer with 6 years of experience establishing design systems, conducting qualitative user studies, and shipping intuitive, gorgeous SaaS and mobile products.",
      education: [
        { degree: "B.F.A. in Graphic Communication", school: "Rhode Island School of Design", year: "2014 - 2018" }
      ],
      experienceHistory: [
        {
          role: "Senior Product Designer",
          company: "PixelFlow Studio",
          duration: "2021 - Present",
          description: "Designed and established a unified Figma design system, accelerating development velocity by 30%. Led research sprints to validate user journeys, directly increasing mobile onboarding conversion rate by 18%."
        },
        {
          role: "UX/UI Designer",
          company: "Innovate Fintech Corp",
          duration: "2018 - 2021",
          description: "Conducted 50+ user interviews and usability tests to discover friction points. Created wireframes, high-fidelity mockups, and interactive prototypes for a secure financial transaction mobile app."
        }
      ],
      keyStrengths: [
        "Human-centric visual design and complex problem-solving",
        "Advanced master of Figma component structure and design tokens",
        "Direct bridge between design and development with clean CSS skills"
      ],
      verdict: "Highly suitable for Senior Product Designer or UI/UX Engineer roles. Marcus is visual-first, detail-oriented, and can collaborate closely with engineering teams.",
      suitabilityScore: 89
    }
  },
  {
    id: "seed-3",
    fileName: "Aria_Patel_Data_Scientist.pdf",
    fileSize: "310 KB",
    uploadedAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    summary: {
      candidateName: "Aria Patel",
      candidateEmail: "aria.patel@datasphere.org",
      candidatePhone: "+1 (555) 890-1234",
      skills: ["Python", "PyTorch", "SQL", "Pandas & NumPy", "Machine Learning", "Large Language Models (LLMs)", "Data Engineering", "TensorFlow", "Scikit-Learn"],
      experienceYears: 5,
      summary: "Data Scientist specializing in predictive modeling, deep learning, and retrieval-augmented generation (RAG) system architectures. Passionate about drawing actionable insights from massive structured and unstructured datasets.",
      education: [
        { degree: "M.S. in Data Science", school: "Carnegie Mellon University", year: "2019 - 2021" },
        { degree: "B.S. in Statistics & Economics", school: "University of Michigan", year: "2015 - 2019" }
      ],
      experienceHistory: [
        {
          role: "Senior Data Scientist",
          company: "Nexa AI Solutions",
          duration: "2022 - Present",
          description: "Designed and shipped an AI-driven text classification pipeline utilizing custom BERT models, increasing accuracy by 22% compared to heuristics. Led the integration of LLMs for smart document search systems."
        },
        {
          role: "Data Analyst & ML Specialist",
          company: "Apex Analytics",
          duration: "2021 - 2022",
          description: "Developed predictive machine learning models to analyze customer churn. Created interactive dashboard visualizations using Tableau and Python Dash to convey findings to executive team."
        }
      ],
      keyStrengths: [
        "Strong theoretical statistical foundation and practical ML experience",
        "Expert-level Python coding and deep database querying optimization",
        "Pragmatic approach to deploying AI models into live production environments"
      ],
      verdict: "An outstanding fit for Machine Learning Engineer or Senior Data Scientist roles. Aria has top-tier analytics experience, Python fluency, and great model-building expertise.",
      suitabilityScore: 93
    }
  }
];

// Helper to seed initial store state if not exists
function getOrInitializeStore() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      console.error("Error reading resume data file, re-initializing", e);
    }
  }
  return { resumes: SEEDED_RESUMES };
}

let store = getOrInitializeStore();

function saveStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
  } catch (e) {
    console.error("Failed to save resume store:", e);
  }
}

// Structured JSON Schema for Gemini Resume Summarizer
const resumeSummarySchema = {
  type: Type.OBJECT,
  properties: {
    candidateName: { type: Type.STRING, description: "Full name of the candidate." },
    candidateEmail: { type: Type.STRING, description: "Email address or empty string if not found." },
    candidatePhone: { type: Type.STRING, description: "Phone number or empty string if not found." },
    skills: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List of key technical, design, or professional skills." 
    },
    experienceYears: { 
      type: Type.NUMBER, 
      description: "Estimated total years of professional work experience based on history." 
    },
    summary: { 
      type: Type.STRING, 
      description: "A 2-3 sentence overview highlighting their main focus, background, and fit." 
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING, description: "Degree, diploma, or certification name." },
          school: { type: Type.STRING, description: "Name of the university, college, or school." },
          year: { type: Type.STRING, description: "Graduation year or duration (e.g. 2018 - 2022)." }
        },
        required: ["degree", "school", "year"]
      }
    },
    experienceHistory: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING, description: "Job title or role." },
          company: { type: Type.STRING, description: "Company or organization name." },
          duration: { type: Type.STRING, description: "Duration (e.g. 2020 - 2023)." },
          description: { type: Type.STRING, description: "Key duties or accomplishments." }
        },
        required: ["role", "company", "duration", "description"]
      }
    },
    keyStrengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Three prominent unique strengths or competitive edges this candidate has."
    },
    verdict: {
      type: Type.STRING,
      description: "A short qualitative assessment of suitability relative to the requested job profile."
    },
    suitabilityScore: {
      type: Type.NUMBER,
      description: "A fit score out of 100 representing how well the candidate matches the target Job Description (or 70-98 based on general merit if no JD is specified)."
    }
  },
  required: [
    "candidateName", "candidateEmail", "candidatePhone", "skills", "experienceYears",
    "summary", "education", "experienceHistory", "keyStrengths", "verdict", "suitabilityScore"
  ]
};

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// GET List of resumes
app.get("/api/resumes", (req, res) => {
  res.json(store.resumes);
});

// DELETE a specific resume
app.delete("/api/resumes/:id", (req, res) => {
  const { id } = req.params;
  const initialLen = store.resumes.length;
  store.resumes = store.resumes.filter((r: any) => r.id !== id);
  
  if (store.resumes.length === initialLen) {
    return res.status(404).json({ error: "Resume not found" });
  }

  saveStore();
  res.json({ success: true, message: "Resume removed successfully." });
});

// CLEAR all uploaded resumes (reset to seed)
app.post("/api/resumes/reset", (req, res) => {
  store.resumes = [...SEEDED_RESUMES];
  saveStore();
  res.json({ success: true, message: "Dashboard reset to seeded examples." });
});

// POST Analyze a new resume
app.post("/api/summarize", async (req, res) => {
  try {
    const { fileBase64, fileName, fileSize, mimeType, jobDescription } = req.body;

    if (!fileBase64 || !fileName || !mimeType) {
      return res.status(404).json({ error: "Missing required file upload parameters." });
    }

    if (store.resumes.length >= 8 && !fileName.startsWith("Sophia") && !fileName.startsWith("Marcus")) {
      // Clean oldest custom resume to prevent unlimited local file growth, keeping the dashboard tidy
      const customResumes = store.resumes.filter((r: any) => !r.id.startsWith("seed-"));
      if (customResumes.length > 5) {
        const oldestId = customResumes[0].id;
        store.resumes = store.resumes.filter((r: any) => r.id !== oldestId);
      }
    }

    // Clean data prefix from base64 if it got included
    let cleanBase64 = fileBase64;
    if (fileBase64.includes(";base64,")) {
      cleanBase64 = fileBase64.split(";base64,").pop() || "";
    }

    let summaryResult: any;

    if (ai) {
      // Call live Gemini API with the PDF, text file, or image file!
      console.log(`Analyzing file ${fileName} (${mimeType}) with Gemini 3.5 Flash...`);
      
      const contents = [
        {
          inlineData: {
            mimeType: mimeType,
            data: cleanBase64
          }
        },
        {
          text: `You are an elite talent acquisition specialist and resume parser. 
          Extract all critical metadata, skills, experience, and timeline from the uploaded file.
          
          Evaluate this candidate's suitability against the target Job Description (if specified):
          "${jobDescription || "Any general senior software engineering, data science, product design, or general tech role"}"
          
          Generate a detailed structured summary output in JSON format adhering strictly to the responseSchema.`
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: resumeSummarySchema,
          temperature: 0.2
        }
      });

      const parsedJSON = JSON.parse(response.text || "{}");
      summaryResult = parsedJSON;
    } else {
      // Local fallback mode: Parse text or generate a mock entry based on file name if no API key is set
      console.log("No Gemini API key specified. Using fallback simulation.");
      
      const mockName = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      const capitalizedMockName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
      
      summaryResult = {
        candidateName: capitalizedMockName,
        candidateEmail: `${mockName.toLowerCase().replace(/\s+/g, "")}@example.com`,
        candidatePhone: "+1 (555) 019-2834",
        skills: ["React", "TypeScript", "Node.js", "System Design", "REST APIs", "Agile", "Cloud Deployments"],
        experienceYears: 4 + Math.floor(Math.random() * 6),
        summary: `Dynamic and detail-oriented professional with extensive knowledge in software systems. Demonstrated ability to deliver robust client features, maintain clean codebase architectures, and drive feature adoption.`,
        education: [
          { degree: "B.S. in Computer Science", school: "State University", year: "2016 - 2020" }
        ],
        experienceHistory: [
          {
            role: "Software Engineer",
            company: "TechNexus Corp",
            duration: "2021 - Present",
            description: "Developed and shipped user-centric frontend elements in React. Collaborated closely with cross-functional teams to outline interface schemas, optimize server routes, and boost page load speed by 25%."
          },
          {
            role: "Junior Associate Developer",
            company: "CoreLogic Solutions",
            duration: "2020 - 2021",
            description: "Maintained and resolved bugs inside legacy Node.js endpoints. Authored integration scripts, performed database optimization queries, and enhanced error tracking logs."
          }
        ],
        keyStrengths: [
          "Rapid developer adoption of modern frameworks",
          "Clean modular React and modular styling patterns",
          "Proactive debugger with strong technical investigation skills"
        ],
        verdict: `Strong general developer. Matches typical full-stack parameters and offers great analytical mindset. Perfect addition for fast-moving engineering environments.`,
        suitabilityScore: 75 + Math.floor(Math.random() * 20)
      };
    }

    const newAnalysis = {
      id: "res-" + Math.random().toString(36).substring(2, 9),
      fileName: fileName,
      fileSize: fileSize || `${Math.round(cleanBase64.length * 0.75 / 1024)} KB`,
      uploadedAt: new Date().toISOString(),
      summary: summaryResult
    };

    store.resumes.unshift(newAnalysis);
    saveStore();

    res.json(newAnalysis);

  } catch (err: any) {
    console.error("Error parsing resume with Gemini:", err);
    res.status(500).json({
      error: "Failed to parse and summarize resume.",
      details: err.message || err
    });
  }
});

// Integrate Vite Dev Server Middleware or Static Production Build
async function setupVite() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

if (!process.env.VERCEL) {
  setupVite();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}...`);
  });
}

export default app;
