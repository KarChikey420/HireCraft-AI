import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  FileText, 
  Sparkles, 
  Target, 
  Search, 
  Plus, 
  ArrowRight,
  Download,
  AlertCircle,
  FileSearch,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { Layout } from "@/components/Layout";
import { FileUpload as ResumeUploadZone } from "@/components/FileUpload";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { ResumeParsePreview } from "@/components/ResumeParsePreview";
import { RefinedResumeViewer } from "@/components/RefinedResumeViewer";
import { RecruiterSimulationCard } from "@/components/RecruiterSimulationCard";
import { ATSScoreGauge } from "@/components/ATSScoreGauge";

import resumeService, { 
  RefinedResumeResponse, 
  TailorResponse, 
  ATSScoreResponse 
} from "@/services/resume.service";

export default function Dashboard() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [parsedText, setParsedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("refine");
  
  // Data States
  const [refinedData, setRefinedData] = useState<RefinedResumeResponse | null>(null);
  const [tailoredData, setTailoredData] = useState<TailorResponse | null>(null);
  const [atsData, setAtsData] = useState<ATSScoreResponse | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const handleFileSelect = useCallback(async (file: File) => {
    setResumeFile(file);
    setIsProcessing(true);
    try {
      const text = await resumeService.parseResume(file);
      setParsedText(text);
      toast.success("Resume parsed successfully", {
        description: `${file.name} is ready for optimization.`
      });
    } catch (error) {
      toast.error("Failed to parse resume");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearResume = () => {
    setResumeFile(null);
    setParsedText("");
    setRefinedData(null);
    setTailoredData(null);
    setAtsData(null);
  };

  const executeActiveTabAction = async () => {
    if (!resumeFile || !parsedText) return;

    setIsProcessing(true);
    try {
      if (activeTab === "refine") {
        const result = await resumeService.refineResume(resumeFile, jobDescription);
        setRefinedData(result);
        toast.success("Resume Refined", { description: "Atomic optimization complete." });
      } else if (activeTab === "tailor") {
        if (!jobDescription) {
          toast.error("Job Description Required", { description: "Please paste a JD to tailor your resume." });
          setIsProcessing(false);
          return;
        }
        const result = await resumeService.tailorResume(parsedText, jobDescription);
        setTailoredData(result);
        toast.success("Resume Tailored", { description: "JD-alignment complete." });
      } else if (activeTab === "ats") {
        if (!jobDescription) {
          toast.error("Job Description Required", { description: "ATS check requires a target JD." });
          setIsProcessing(false);
          return;
        }
        const result = await resumeService.getATSScore(parsedText, jobDescription);
        setAtsData(result);
        toast.success("ATS Audit Complete", { description: "Score and keyword gaps identified." });
      }
    } catch (error) {
      toast.error("Processing Failed", { 
        description: error instanceof Error ? error.message : "Internal engine error." 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const canExecute = resumeFile && parsedText && (activeTab === "refine" || jobDescription);

  return (
    <Layout>
      {isProcessing && <LoadingOverlay message={`Running HireCraft ${activeTab} engine...`} />}
      
      <div className="flex-grow container mx-auto px-6 py-10 max-w-6xl space-y-10">
        
        {/* Step 1: Upload Section */}
        {!resumeFile ? (
          <div className="max-w-2xl mx-auto space-y-6 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="text-center space-y-3">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10 mb-2 font-mono uppercase tracking-widest text-[10px]">Phase 01</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-zinc-100">Initialize Your Profile</h1>
              <p className="text-zinc-500 text-lg font-medium max-w-md mx-auto">
                Upload your existing resume to start the Atomic Refinement process.
              </p>
            </div>
            <ResumeUploadZone onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-emerald-500 mb-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest font-mono">Active Operative Suite</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-100">HireCraft Dashboard</h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
                    <FileText className="h-4 w-4 text-zinc-500" />
                    <span className="text-xs font-medium text-zinc-300 font-mono">{resumeFile.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearResume} className="h-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                onClick={executeActiveTabAction}
                disabled={!canExecute || isProcessing}
                className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-8 h-14 rounded-2xl shadow-xl shadow-emerald-500/10 transition-all active:scale-[0.98] group"
              >
                {isProcessing ? "Processing..." : `Execute ${activeTab.toUpperCase()}`}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Resume Preview */}
            <ResumeParsePreview text={parsedText} />

            {/* Phase 2: Tabbed Features */}
            <Tabs defaultValue="refine" className="w-full space-y-8" onValueChange={setActiveTab}>
              <div className="p-1 px-1.5 rounded-2xl bg-card border border-border w-full sm:w-fit mx-auto shadow-inner">
                <TabsList className="bg-transparent h-12 gap-1">
                  <TabsTrigger 
                    value="refine" 
                    className="rounded-xl px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow-lg gap-2 font-bold font-mono text-[11px] uppercase tracking-wider"
                  >
                    <Sparkles className="h-4 w-4" />
                    Refine
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tailor" 
                    className="rounded-xl px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow-lg gap-2 font-bold font-mono text-[11px] uppercase tracking-wider"
                  >
                    <Target className="h-4 w-4" />
                    Tailor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ats" 
                    className="rounded-xl px-6 data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-500 data-[state=active]:shadow-lg gap-2 font-bold font-mono text-[11px] uppercase tracking-wider"
                  >
                    <Search className="h-4 w-4" />
                    ATS Check
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Refine Tab Content */}
              <TabsContent value="refine" className="animate-in fade-in duration-500 outline-none">
                {refinedData ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
                    <div className="space-y-10">
                      <div className="flex items-center justify-between">
                         <h2 className="text-2xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
                           <Sparkles className="h-6 w-6 text-emerald-500" />
                           Refined Content
                         </h2>
                         <Button variant="outline" className="border-border text-zinc-400 hover:bg-card gap-2 h-10 px-4 rounded-xl">
                           <Download className="h-4 w-4" />
                           Export PDF
                         </Button>
                      </div>
                      <RefinedResumeViewer data={refinedData} />
                    </div>
                    <div className="sticky top-28 space-y-6">
                      <RecruiterSimulationCard data={refinedData.recruiter_simulation} />
                      {/* Micro-stats */}
                      <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">Atomic Improvements</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm font-mono">
                            <span className="text-zinc-400">Action Verbs Injected</span>
                            <span className="font-bold text-emerald-500">+{refinedData.gap_analysis.weak_verbs_replaced}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm font-mono">
                            <span className="text-zinc-400">Impact Metrics Added</span>
                            <span className="font-bold text-emerald-500">+{refinedData.gap_analysis.unquantified_bullets}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-20 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 bg-zinc-900/10">
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                      <Sparkles className="h-10 w-10 text-zinc-600" />
                    </div>
                    <div className="max-w-sm space-y-2">
                      <h3 className="text-xl font-bold text-zinc-200">Refinement Engine Ready</h3>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                        Click "Execute REFINE" to run 50+ optimization checks on your resume content.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Tailor Tab Content */}
              <TabsContent value="tailor" className="space-y-10 animate-in fade-in duration-500 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label htmlFor="jd" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono pl-1">Target Job Description</Label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                        <Textarea 
                          id="jd"
                          placeholder="Paste the full job description here..."
                          className="relative h-64 bg-background/50 border-border text-zinc-300 placeholder:text-zinc-700 rounded-2xl p-6 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all leading-relaxed font-mono text-sm"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-bold tracking-widest uppercase font-mono">
                          {jobDescription.length} Characters
                        </div>
                      </div>
                    </div>

                    {tailoredData && (
                      <div className="space-y-6 pt-6 animate-in slide-in-from-bottom-4 duration-500">
                         <h3 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
                           <Target className="h-6 w-6 text-emerald-500" />
                           Tailored Output
                         </h3>
                         <div className="p-8 rounded-3xl bg-card border border-border relative">
                            <pre className="text-sm text-zinc-400 whitespace-pre-wrap leading-relaxed font-mono italic">
                              {tailoredData.tailored_resume}
                            </pre>
                            <Button variant="outline" className="absolute top-6 right-6 border-border text-zinc-500 hover:bg-card gap-2 h-9">
                              <Download className="h-4 w-4" />
                              Copy Text
                            </Button>
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="sticky top-28 space-y-6">
                    <div className="p-8 rounded-3xl bg-card border border-border space-y-6 shadow-xl">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono">How Tailoring Works</h4>
                      <div className="space-y-4">
                        {[
                          "Extracts critical JD keywords",
                          "Adjusts summary to mirror role goals",
                          "Matches semantic skill terminology",
                          "Re-prioritizes experience bullets"
                        ].map((text, i) => (
                          <div key={i} className="flex gap-3 text-xs font-medium text-zinc-400">
                             <CheckCircle2 className="h-4 w-4 text-zinc-700 shrink-0" />
                             {text}
                          </div>
                        ))}
                      </div>
                    </div>

                    {tailoredData && (
                      <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono">Changes Summary</h4>
                        <ul className="space-y-3">
                          {tailoredData.changes_summary.slice(0, 5).map((change, i) => (
                            <li key={i} className="text-xs text-zinc-400 flex gap-2 font-mono">
                              <span className="text-emerald-500">→</span>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* ATS Tab Content */}
              <TabsContent value="ats" className="space-y-10 animate-in fade-in duration-500 outline-none">
                 {!jobDescription && (
                    <div className="p-10 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                      <AlertCircle className="h-6 w-6 text-emerald-500" />
                      <p className="text-sm text-emerald-200/60 font-medium font-mono">Please enter a Job Description in the <Target className="h-4 w-4 inline mx-1" /> Tailor tab to perform an ATS Check.</p>
                    </div>
                 )}

                 {atsData ? (
                   <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
                     <div className="space-y-10">
                        {/* Section Scores */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {[
                            { label: "Skills Match", score: atsData.section_scores.skills, color: "bg-emerald-500" },
                            { label: "Experience Match", score: atsData.section_scores.experience, color: "bg-blue-500" },
                            { label: "Summary Match", score: atsData.section_scores.summary, color: "bg-emerald-500" }
                          ].map((item, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-card border border-border space-y-3">
                              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                                <span>{item.label}</span>
                                <span>{item.score}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Keywords */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                             <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-500">Found Keywords</h4>
                             <div className="flex flex-wrap gap-2">
                               {atsData.matched_keywords.map((kw, i) => (
                                 <Badge key={i} className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1">{kw}</Badge>
                               ))}
                             </div>
                           </div>
                           <div className="space-y-4">
                             <h4 className="text-sm font-bold uppercase tracking-widest text-red-500">Critical Gaps</h4>
                             <div className="flex flex-wrap gap-2">
                               {atsData.missing_keywords.map((kw, i) => (
                                 <Badge key={i} className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1">{kw}</Badge>
                               ))}
                             </div>
                           </div>
                        </div>

                        {/* Suggestions */}
                        <div className="space-y-6">
                           <h4 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-3">
                             <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                             Action Items for 95+ Score
                           </h4>
                           <div className="p-8 rounded-3xl bg-card border border-border space-y-4">
                              {atsData.suggestions.map((sug, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors group">
                                  <div className="text-emerald-500 font-bold text-sm tracking-tighter font-mono">0{i+1}</div>
                                  <p className="text-zinc-400 text-sm leading-relaxed">{sug}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="sticky top-28">
                        <div className="p-8 rounded-3xl bg-card border border-border flex flex-col items-center gap-6 shadow-2xl">
                           <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 font-mono">Overall ATS Fit</h4>
                           <ATSScoreGauge score={atsData.score} />
                           <div className="text-center space-y-2">
                             <h5 className="text-xl font-bold text-zinc-100">
                               {atsData.score >= 80 ? "Premium Fit" : atsData.score >= 60 ? "Average Fit" : "Critical Optimization Required"}
                             </h5>
                             <p className="text-[10px] text-zinc-500 leading-relaxed font-mono uppercase tracking-wider">Based on semantic keyword matching, structural integrity, and formatting scores.</p>
                           </div>
                        </div>
                     </div>
                   </div>
                 ) : (
                   <div className="p-20 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 bg-zinc-900/10">
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                      <Search className="h-10 w-10 text-zinc-600" />
                    </div>
                    <div className="max-w-sm space-y-2">
                      <h3 className="text-xl font-bold text-zinc-200">ATS Audit Ready</h3>
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                        Execute the audit to see how your resume fares against enterprise applicant tracking systems.
                      </p>
                    </div>
                  </div>
                 )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
}
