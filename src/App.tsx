import React, { useState, useEffect, useRef } from "react";
import { 
  Loader2, 
  CheckCircle2, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  RefreshCw, 
  FileText, 
  AlertTriangle, 
  Calendar,
  UploadCloud,
  Sparkles,
  Layers,
  Briefcase,
  GraduationCap,
  TrendingUp,
  User,
  Mail,
  Phone,
  FileSpreadsheet,
  Plus,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResumeAnalysis } from "./types";

// Standard preset JDs to make testing easy and professional
const JD_PRESETS = [
  {
    title: "Senior Full-Stack Engineer",
    text: "We are seeking a senior engineer with strong React, Node.js, and TypeScript skills to build scalable enterprise apps, optimize database queries, and establish containerized CI/CD pipelines."
  },
  {
    title: "Senior UI/UX Product Designer",
    text: "Looking for an expert designer who is a master of Figma design systems, conducts exhaustive user research studies, and builds high-fidelity interactive SaaS prototypes."
  },
  {
    title: "AI / Machine Learning Scientist",
    text: "Seeking a deep learning specialist fluent in Python, PyTorch, SQL, and LLMs who can engineer and deploy modern predictive models and Retrieval-Augmented Generation (RAG) pipelines."
  },
  {
    title: "General Tech Contributor",
    text: ""
  }
];

export default function App() {
  const [resumes, setResumes] = useState<ResumeAnalysis[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  
  // Custom job description setup
  const [selectedJDPreset, setSelectedJDPreset] = useState<string>("Senior Full-Stack Engineer");
  const [customJDText, setCustomJDText] = useState<string>(JD_PRESETS[0].text);
  
  // Search and filter state
  const [skillsSearch, setSkillsSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"bento" | "matrix">("bento");

  // Interaction loaders
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("Initializing analyzer...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Copy indicators
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Sync / Fetch existing resumes from the database
  const loadResumes = async () => {
    try {
      const res = await fetch("/api/resumes");
      const data = await res.json();
      if (Array.isArray(data)) {
        setResumes(data);
        if (data.length > 0 && !selectedResumeId) {
          setSelectedResumeId(data[0].id);
        }
      }
    } catch (e) {
      console.error("Error loading resumes:", e);
      setErrorMsg("Failed to communicate with database. Running in local fallback state.");
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  // Update preset text when preset changes
  const handlePresetChange = (title: string) => {
    setSelectedJDPreset(title);
    const preset = JD_PRESETS.find(p => p.title === title);
    if (preset) {
      setCustomJDText(preset.text);
    }
  };

  // Delete resume
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this analyzed resume?")) return;
    
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setResumes(prev => {
          const updated = prev.filter(r => r.id !== id);
          if (selectedResumeId === id) {
            setSelectedResumeId(updated.length > 0 ? updated[0].id : null);
          }
          return updated;
        });
        setSuccessMsg("Resume deleted from dashboard.");
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error("Error deleting resume:", err);
      setErrorMsg("Failed to delete resume.");
    }
  };

  // Reset/Restore to seeds
  const handleReset = async () => {
    if (!window.confirm("Reset dashboard back to default seeded resumes? This will clean custom uploads.")) return;
    try {
      const res = await fetch("/api/resumes/reset", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        loadResumes();
        setSelectedResumeId("seed-1");
        setSuccessMsg("Dashboard successfully restored to demo examples.");
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error("Failed to reset database:", err);
      setErrorMsg("Failed to reset database.");
    }
  };

  // Base64 file reader and poster
  const processFile = async (file: File) => {
    // Constraint: Max 5 resumes custom uploaded at a time
    const uploadedCustomCount = resumes.filter(r => !r.id.startsWith("seed-")).length;
    if (uploadedCustomCount >= 5) {
      setErrorMsg("Maximum limit of 5 analyzed resumes reached. Please delete an existing profile to analyze a new candidate.");
      return;
    }

    // Supported formats
    const supportedTypes = ["application/pdf", "text/plain", "image/png", "image/jpeg", "image/jpg"];
    if (!supportedTypes.includes(file.type) && !file.name.endsWith(".txt")) {
      setErrorMsg("Unsupported file format. Please upload a PDF, Plain Text (.txt), or high-contrast image (PNG/JPG) resume.");
      return;
    }

    // Size limit 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("File is too large. Please upload a resume under 5MB.");
      return;
    }

    setErrorMsg(null);
    setUploading(true);
    setUploadProgress(15);
    setStatusMsg("Reading file content...");

    // Smooth simulated loading bar
    const progressTimer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          return prev;
        }
        if (prev < 40) {
          setStatusMsg("Sending base64 package to Gemini 3.5 Flash...");
          return prev + 5;
        } else if (prev < 70) {
          setStatusMsg("Parsing candidate work timeline...");
          return prev + 3;
        } else {
          setStatusMsg("Evaluating matching scores and strengths...");
          return prev + 1;
        }
      });
    }, 250);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64String = reader.result as string;
        
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileBase64: base64String,
            fileName: file.name,
            fileSize: `${Math.round(file.size / 1024)} KB`,
            mimeType: file.type || "text/plain",
            jobDescription: customJDText
          })
        });

        clearInterval(progressTimer);
        setUploadProgress(100);

        if (!response.ok) {
          throw new Error("Server failed to parse and generate candidate summary.");
        }

        const newAnalysis = await response.json();
        
        setResumes(prev => [newAnalysis, ...prev]);
        setSelectedResumeId(newAnalysis.id);
        setUploading(false);
        setSuccessMsg(`Successfully processed ${newAnalysis.summary.candidateName}!`);
        setTimeout(() => setSuccessMsg(null), 4000);
      } catch (err: any) {
        clearInterval(progressTimer);
        setUploading(false);
        console.error("Upload error:", err);
        setErrorMsg(err.message || "An error occurred during Gemini summarization.");
      }
    };

    reader.onerror = () => {
      clearInterval(progressTimer);
      setUploading(false);
      setErrorMsg("Failed to read local file.");
    };

    reader.readAsDataURL(file);
  };

  // Drag-and-drop triggers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Helpers for layout colors
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 80) return "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
    return "text-amber-400 border-amber-500/30 bg-amber-500/10";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "Strong Fit";
    if (score >= 80) return "Good Match";
    return "Potential Growth";
  };

  // Filtered resumes based on skills search
  const filteredResumes = resumes.filter(r => {
    if (!skillsSearch.trim()) return true;
    const term = skillsSearch.toLowerCase();
    const skillsMatch = r.summary.skills.some(s => s.toLowerCase().includes(term));
    const nameMatch = r.summary.candidateName.toLowerCase().includes(term);
    return skillsMatch || nameMatch;
  });

  const selectedResume = resumes.find(r => r.id === selectedResumeId);

  // Copy helpers
  const copyText = (text: string, type: "email" | "phone", id: string) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmailId(id);
      setTimeout(() => setCopiedEmailId(null), 1500);
    } else {
      setCopiedPhoneId(id);
      setTimeout(() => setCopiedPhoneId(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Banner / Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Resume_Summarizer <span className="text-[10px] uppercase tracking-widest font-mono bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded border border-teal-500/20">AI Screening</span>
              </h1>
              <p className="text-xs text-slate-400">Centrally parse, evaluate, and compare candidates with Gemini 3.5 Flash</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono hidden md:inline">
              Custom Uploads: <strong className="text-teal-400">{resumes.filter(r => !r.id.startsWith("seed-")).length}</strong> / 5
            </span>
            <span className="h-4 w-px bg-slate-800 hidden md:block"></span>
            
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition duration-150 cursor-pointer"
              title="Reset candidates to original demo presets"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Seeds
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Alerts and notifications */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-rose-500/10 border border-rose-500/25 rounded-2xl text-rose-300 text-sm flex items-start gap-3 shadow-lg"
            >
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block text-rose-200">Processing Issue</span>
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white text-xs shrink-0 cursor-pointer">Dismiss</button>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl text-emerald-300 text-sm flex items-center gap-3 shadow-lg"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Configuration Segment (Role Alignment & Job Description) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/40 rounded-3xl border border-slate-800 p-6">
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold text-teal-400 flex items-center gap-2 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> 1. Target Role Alignment
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When you upload a resume, Gemini evaluates candidate experience, selects core matches, and scores them specifically based on this Target Job Profile.
            </p>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Preset Roles</label>
              <div className="flex flex-wrap gap-1.5">
                {JD_PRESETS.map((p) => (
                  <button
                    key={p.title}
                    onClick={() => handlePresetChange(p.title)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border ${
                      selectedJDPreset === p.title
                        ? "bg-teal-500/20 border-teal-500/60 text-teal-300"
                        : "bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Job Description Criteria</label>
              {selectedJDPreset !== "General Tech Contributor" && (
                <span className="text-[10px] text-teal-500 font-mono">Linked to Gemini Prompt</span>
              )}
            </div>
            
            <textarea
              className="flex-1 w-full min-h-[90px] p-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500/50 resize-none font-sans leading-relaxed placeholder-slate-600"
              placeholder="Paste a custom target Job Description here to trigger precise alignment scoring (e.g. key frameworks, years of experience, or degree qualifications)..."
              value={customJDText}
              onChange={(e) => {
                setCustomJDText(e.target.value);
                setSelectedJDPreset("Custom Profile");
              }}
            />
          </div>
        </div>

        {/* Upload Hub / Loading Screen */}
        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div 
              key="loading-upload"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-6 min-h-[240px] shadow-2xl relative overflow-hidden"
            >
              {/* Animated decorative particle */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-cyan-500 animate-pulse"></div>
              
              <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 animate-bounce">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
              
              <div className="space-y-2 max-w-md">
                <h3 className="text-lg font-bold text-white tracking-tight">Processing Resume via Gemini</h3>
                <p className="text-xs text-slate-400 font-mono">{statusMsg}</p>
              </div>

              {/* Progress bar container */}
              <div className="w-full max-w-sm bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="drag-drop"
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-8 transition-all duration-200 text-center flex flex-col items-center justify-center cursor-pointer group ${
                dragActive 
                  ? "border-teal-400 bg-teal-500/5 shadow-2xl shadow-teal-500/5" 
                  : "border-slate-800/80 hover:border-slate-700 bg-slate-900/20 hover:bg-slate-900/40"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.txt,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
              />
              <div className="p-4 bg-slate-950/80 border border-slate-800 group-hover:border-slate-700 rounded-2xl text-slate-400 group-hover:text-teal-400 mb-3.5 transition duration-150">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-semibold text-slate-200">Drag &amp; Drop Candidate Resume here</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Supports <strong className="text-slate-300">PDF, Plain Text (.txt), or Resume images (PNG/JPG)</strong>. Maximum 5 custom uploaded resumes. Files are kept private in-memory.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter and View Layout Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab("bento")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === "bento"
                  ? "bg-slate-800 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Interactive Bento
            </button>
            <button
              onClick={() => setActiveTab("matrix")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === "matrix"
                  ? "bg-slate-800 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Side-by-Side Matrix
            </button>
          </div>

          {/* Core Text Filter */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by name or key skill..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs placeholder-slate-500 focus:outline-none focus:border-slate-700"
              value={skillsSearch}
              onChange={(e) => setSkillsSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Tab 1: Interactive Bento Layout */}
        <AnimatePresence mode="wait">
          {activeTab === "bento" && (
            <motion.div
              key="bento-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Candidate List */}
              <div className="lg:col-span-4 space-y-3.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Candidates ({filteredResumes.length})
                  </span>
                </div>

                {filteredResumes.length === 0 ? (
                  <div className="p-8 border border-slate-900 rounded-3xl text-center space-y-2 bg-slate-950/40">
                    <Info className="w-5 h-5 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-500 font-medium">No candidates match your filters.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
                    {filteredResumes.map((resume) => {
                      const isSelected = selectedResumeId === resume.id;
                      const badgeClass = getScoreColor(resume.summary.suitabilityScore);
                      return (
                        <div
                          key={resume.id}
                          onClick={() => setSelectedResumeId(resume.id)}
                          className={`p-4 rounded-2xl border transition duration-150 cursor-pointer text-left relative group ${
                            isSelected 
                              ? "bg-slate-900 border-teal-500/30 shadow-lg" 
                              : "bg-slate-900/30 border-slate-900 hover:border-slate-800"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition">
                                {resume.summary.candidateName}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{resume.fileName}</p>
                            </div>

                            {/* Score Tag */}
                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border uppercase shrink-0 ${badgeClass}`}>
                              {resume.summary.suitabilityScore}%
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-600" />
                              {new Date(resume.uploadedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                            </span>

                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-medium text-slate-500 uppercase bg-slate-950/60 px-2 py-0.5 rounded">
                                {resume.summary.experienceYears} Years Exp
                              </span>
                              <button
                                onClick={(e) => handleDelete(resume.id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded transition duration-150 cursor-pointer"
                                title="Remove analyzed profile"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Dynamic Candidate Profile (Bento-Grid) */}
              <div className="lg:col-span-8">
                {selectedResume ? (
                  <div className="space-y-6">
                    {/* Candidate Top Profile Header Card */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                      {/* Grid overlay background */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.06),transparent_50%)]"></div>

                      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="text-xl font-bold text-white tracking-tight">{selectedResume.summary.candidateName}</h2>
                            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border ${getScoreColor(selectedResume.summary.suitabilityScore)}`}>
                              {getScoreBadge(selectedResume.summary.suitabilityScore)}
                            </div>
                          </div>

                          {/* Contact & Meta */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-xs font-mono">
                            {selectedResume.summary.candidateEmail && selectedResume.summary.candidateEmail !== "Not specified" && (
                              <div className="flex items-center gap-1.5 hover:text-teal-300 transition">
                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                <span>{selectedResume.summary.candidateEmail}</span>
                                <button 
                                  onClick={() => copyText(selectedResume.summary.candidateEmail, "email", selectedResume.id)} 
                                  className="p-1 hover:bg-slate-800 rounded transition shrink-0 cursor-pointer"
                                  title="Copy email"
                                >
                                  {copiedEmailId === selectedResume.id ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            )}

                            {selectedResume.summary.candidatePhone && selectedResume.summary.candidatePhone !== "Not specified" && (
                              <div className="flex items-center gap-1.5 hover:text-teal-300 transition">
                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                <span>{selectedResume.summary.candidatePhone}</span>
                                <button 
                                  onClick={() => copyText(selectedResume.summary.candidatePhone, "phone", selectedResume.id)} 
                                  className="p-1 hover:bg-slate-800 rounded transition shrink-0 cursor-pointer"
                                  title="Copy phone"
                                >
                                  {copiedPhoneId === selectedResume.id ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            )}

                            <span className="text-[11px] text-slate-500">File: {selectedResume.fileName} ({selectedResume.fileSize})</span>
                          </div>
                        </div>

                        {/* Circular Suitability Gauge */}
                        <div className="flex items-center gap-4 bg-slate-950/60 p-4 border border-slate-800/80 rounded-2xl shrink-0">
                          <div className="relative flex items-center justify-center">
                            <svg className="w-16 h-16 transform -rotate-90">
                              <circle cx="32" cy="32" r="28" strokeWidth="4" stroke="rgba(30,41,59,0.8)" fill="transparent" />
                              <circle 
                                cx="32" cy="32" r="28" strokeWidth="4" 
                                stroke={selectedResume.summary.suitabilityScore >= 90 ? "#10b981" : selectedResume.summary.suitabilityScore >= 80 ? "#06b6d4" : "#f59e0b"} 
                                fill="transparent" 
                                strokeDasharray={175.9}
                                strokeDashoffset={175.9 - (175.9 * selectedResume.summary.suitabilityScore) / 100}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute text-sm font-bold font-mono text-white">{selectedResume.summary.suitabilityScore}%</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Match Score</span>
                            <span className="text-xs text-slate-300 font-medium">Role Compatibility</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bento-Grid Row 1: Profile Summary & AI Verdict */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7 bg-slate-900/30 border border-slate-900 rounded-3xl p-5 space-y-3.5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <User className="w-4 h-4 text-teal-500" /> Profile Summary
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                          {selectedResume.summary.summary}
                        </p>
                      </div>

                      <div className="md:col-span-5 bg-teal-500/5 border border-teal-500/10 rounded-3xl p-5 space-y-3">
                        <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" /> Recruiter Verdict
                        </h3>
                        <p className="text-xs text-teal-200 leading-relaxed font-sans font-semibold">
                          {selectedResume.summary.verdict}
                        </p>
                      </div>
                    </div>

                    {/* Bento-Grid Row 2: Key Strengths & Skill Cloud */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Key Strengths */}
                      <div className="md:col-span-6 bg-slate-900/30 border border-slate-900 rounded-3xl p-5 space-y-4">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" /> Unique Strengths
                        </h3>

                        <div className="space-y-3">
                          {selectedResume.summary.keyStrengths.map((str, idx) => (
                            <div key={idx} className="flex gap-3 text-xs">
                              <span className="inline-flex shrink-0 items-center justify-center w-5 h-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span className="text-slate-300 leading-relaxed font-medium">{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Skills Tag Cloud */}
                      <div className="md:col-span-6 bg-slate-900/30 border border-slate-900 rounded-3xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Layers className="w-4 h-4 text-cyan-400" /> Extracted Skills
                          </h3>
                          <span className="text-[10px] text-slate-500 font-mono font-bold">({selectedResume.summary.skills.length} identified)</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {selectedResume.summary.skills.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-teal-400 rounded-xl text-xs font-medium text-slate-300 transition duration-150"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Professional Work Experience Timeline */}
                    <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-teal-400" /> Work History Timeline
                        </h3>
                        <span className="text-[10px] text-teal-400 uppercase font-mono font-bold bg-teal-500/10 border border-teal-500/25 px-2.5 py-0.5 rounded-full">
                          {selectedResume.summary.experienceYears} Years Estimated Experience
                        </span>
                      </div>

                      <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-6">
                        {selectedResume.summary.experienceHistory.map((exp, idx) => (
                          <div key={idx} className="relative group/timeline">
                            {/* Dot indicator */}
                            <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-950 group-hover/timeline:bg-teal-400 group-hover/timeline:scale-125 transition duration-150"></span>
                            
                            <div className="space-y-1.5 text-left">
                              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                                <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                                <span className="text-[10px] font-bold font-mono text-teal-400 bg-teal-500/5 border border-teal-500/10 px-2 py-0.5 rounded">
                                  {exp.duration}
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-slate-400">{exp.company}</p>
                              <p className="text-xs text-slate-400 leading-relaxed font-sans">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education Details Grid */}
                    <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 space-y-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-400" /> Academic Background
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedResume.summary.education.map((edu, idx) => (
                          <div key={idx} className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl flex items-start gap-3">
                            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-xs font-bold text-slate-200">{edu.degree}</h4>
                              <p className="text-xs text-slate-400 mt-0.5">{edu.school}</p>
                              <span className="text-[10px] text-slate-500 font-mono block mt-1">{edu.year}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-16 border border-slate-900 border-dashed rounded-3xl text-center space-y-4 bg-slate-950/20">
                    <Info className="w-8 h-8 text-slate-700 mx-auto" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-300">No Candidate Selected</h3>
                      <p className="text-xs text-slate-500 mt-1">Select an analysed profile from the left sidebar or upload a candidate's resume to begin.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Comparative Side-by-Side Matrix Table */}
          {activeTab === "matrix" && (
            <motion.div
              key="matrix-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-slate-900/30 border border-slate-900 rounded-3xl overflow-hidden shadow-xl"
            >
              <div className="p-5 border-b border-slate-800 bg-slate-900/40">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-teal-400" /> Candidate Selection Comparison Matrix
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">Analyze candidate suitability scores, key skills, experience years, and verdicts side-by-side.</p>
              </div>

              {filteredResumes.length === 0 ? (
                <div className="p-16 text-center text-slate-500 text-xs">
                  No candidates available for comparison. Try uploading or resetting demo seeds.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-slate-800 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="p-4 pl-6">Candidate Name</th>
                        <th className="p-4 text-center">Score</th>
                        <th className="p-4 text-center">Years Exp</th>
                        <th className="p-4">Academic Background</th>
                        <th className="p-4">Core Skills</th>
                        <th className="p-4">Gemini Verdict Summary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-950/10">
                      {filteredResumes.map((resume) => (
                        <tr key={resume.id} className="hover:bg-slate-900/30 transition duration-150">
                          <td className="p-4 pl-6 font-semibold">
                            <span className="block text-white font-bold">{resume.summary.candidateName}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{resume.summary.candidateEmail || resume.fileName}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded font-bold font-mono border ${getScoreColor(resume.summary.suitabilityScore)}`}>
                              {resume.summary.suitabilityScore}%
                            </span>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-slate-300">
                            {resume.summary.experienceYears} Years
                          </td>
                          <td className="p-4 max-w-xs truncate" title={resume.summary.education.map(e => `${e.degree} (${e.school})`).join(", ")}>
                            {resume.summary.education[0] ? (
                              <div className="space-y-0.5">
                                <span className="font-medium text-slate-200">{resume.summary.education[0].degree}</span>
                                <span className="block text-[10px] text-slate-500">{resume.summary.education[0].school}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600">-</span>
                            )}
                          </td>
                          <td className="p-4 max-w-sm">
                            <div className="flex flex-wrap gap-1">
                              {resume.summary.skills.slice(0, 5).map((skill, sIdx) => (
                                <span key={sIdx} className="bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-medium border border-slate-800">
                                  {skill}
                                </span>
                              ))}
                              {resume.summary.skills.length > 5 && (
                                <span className="text-[10px] text-slate-500 font-bold pl-1">
                                  +{resume.summary.skills.length - 5} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-slate-400 max-w-md font-sans leading-relaxed">
                            {resume.summary.verdict}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Humble footer */}
      <footer className="border-t border-slate-900/60 py-6 text-center text-[11px] text-slate-600 font-mono mt-12">
        <span>System Status: Fully Operational</span>
        <span className="mx-2">•</span>
        <span>Made with Gemini 3.5 Flash</span>
      </footer>
    </div>
  );
}
