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
          <div className="max-w-2xl mx-auto space-y-8 pt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                <div className="h-px w-8 bg-emerald-500/30" />
                <span>Phase 01 // Initialization</span>
                <div className="h-px w-8 bg-emerald-500/30" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter text-zinc-100 uppercase">
                Profile <span className="text-emerald-500">Injection</span>
              </h1>
              <p className="text-zinc-500 text-sm font-mono max-w-sm mx-auto uppercase tracking-tight">
                Upload legacy PDF/DOCX assets for atomic refinement.
              </p>
            </div>
            <ResumeUploadZone onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Technical Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-0.5 rounded-[2px] border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    [ OPERATIVE: ACTIVE ]
                  </div>
                  <div className="h-[1px] w-12 bg-zinc-800" />
                  <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">System_v2.04</span>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tighter text-zinc-100 uppercase terminal-glow">
                  HireCraft<span className="text-emerald-500">.DSH</span>
                </h1>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-zinc-800 bg-zinc-900/80">
                    <FileText className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-xs font-mono text-zinc-400">{resumeFile.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={clearResume} className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-500/5 rounded">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                onClick={executeActiveTabAction}
                disabled={!canExecute || isProcessing}
                className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-10 h-14 rounded shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] group font-mono uppercase tracking-widest text-xs"
              >
                {isProcessing ? "EXEC_PROCESS..." : `Run_${activeTab.toUpperCase()}_ENG`}
                <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Resume Preview */}
            <ResumeParsePreview text={parsedText} />

            {/* Phase 2: GitHub-Style Navigation */}
            <Tabs defaultValue="refine" className="w-full space-y-10" onValueChange={setActiveTab}>
              <div className="border-b border-zinc-800">
                <TabsList className="bg-transparent h-12 gap-8 p-0">
                  <TabsTrigger 
                    value="refine" 
                    className="rounded-none h-12 bg-transparent px-1 text-zinc-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 gap-2 font-bold font-mono text-[11px] uppercase tracking-widest transition-none"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Refine
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tailor" 
                    className="rounded-none h-12 bg-transparent px-1 text-zinc-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 gap-2 font-bold font-mono text-[11px] uppercase tracking-widest transition-none"
                  >
                    <Target className="h-3.5 w-3.5" />
                    Tailor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ats" 
                    className="rounded-none h-12 bg-transparent px-1 text-zinc-600 data-[state=active]:bg-transparent data-[state=active]:text-emerald-500 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-emerald-500 gap-2 font-bold font-mono text-[11px] uppercase tracking-widest transition-none"
                  >
                    <Search className="h-3.5 w-3.5" />
                    ATS_Check
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Refine Tab Content */}
              <TabsContent value="refine" className="animate-in fade-in duration-500 outline-none">
                {refinedData ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
                    <div className="space-y-10">
                      <div className="flex items-center justify-between">
                         <h2 className="text-xl font-bold tracking-tighter text-zinc-100 flex items-center gap-3 font-mono uppercase">
                           <Sparkles className="h-5 w-5 text-emerald-500" />
                           [ RESULT: REFINED_ASSETS ]
                         </h2>
                         <Button variant="outline" size="sm" className="font-mono text-[10px] uppercase border-zinc-800 text-zinc-500 hover:text-emerald-500 h-8 px-3 rounded">
                           <Download className="h-3.5 w-3.5 mr-2" />
                           Export_PDF
                         </Button>
                      </div>
                      <RefinedResumeViewer data={refinedData} />
                    </div>
                    <div className="sticky top-20 space-y-6">
                      <RecruiterSimulationCard data={refinedData.recruiter_simulation} />
                      {/* Micro-stats */}
                      <div className="p-6 rounded border border-zinc-900 bg-zinc-950/40 space-y-4">
                        <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 font-mono flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-emerald-500/50" />
                          Metrics // Node_Log
                        </h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[11px] font-mono">
                            <span className="text-zinc-500">Nodes Refined</span>
                            <span className="font-bold text-emerald-500">+{refinedData.gap_analysis.weak_verbs_replaced}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px] font-mono">
                            <span className="text-zinc-500">Impact_Metrics</span>
                            <span className="font-bold text-emerald-500">+{refinedData.gap_analysis.unquantified_bullets}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-20 border border-zinc-900 rounded bg-zinc-950 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-dot-grid opacity-20" />
                    <div className="p-6 rounded border border-zinc-800 bg-zinc-900 shadow-2xl relative z-10 group-hover:border-emerald-500/20 transition-colors duration-500">
                      <Sparkles className="h-10 w-10 text-zinc-900 group-hover:text-emerald-500 transition-colors duration-500" />
                    </div>
                    <div className="max-w-xs space-y-3 relative z-10">
                      <h3 className="text-xl font-bold text-zinc-100 font-mono uppercase tracking-[0.3em] terminal-glow">[ ENGINE: STANDBY ]</h3>
                      <p className="text-[10px] text-zinc-600 font-mono uppercase leading-relaxed tracking-widest">
                        Awaiting process instruction. <br/> Run <span className="text-emerald-500/50">REFINE_ENG</span> to optimize resume nodes.
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Tailor Tab Content */}
              <TabsContent value="tailor" className="space-y-10 animate-in fade-in duration-500 outline-none">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Label htmlFor="jd" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 font-mono">Job_Description_Buffer</Label>
                        <div className="h-px flex-grow bg-zinc-900" />
                      </div>
                      <div className="relative">
                        <Textarea 
                          id="jd"
                          placeholder="PASTE TARGET JOB DESCRIPTION NODE..."
                          className="relative h-64 bg-zinc-950/50 border-zinc-800 text-zinc-400 placeholder:text-zinc-800 rounded-none p-6 focus:ring-0 focus:border-emerald-500/50 resize-none transition-all leading-relaxed font-mono text-xs uppercase tracking-tight"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 text-[9px] text-zinc-700 font-bold tracking-widest font-mono uppercase">
                          LEN: {jobDescription.length} // OFF: 0x0
                        </div>
                      </div>
                    </div>

                     {tailoredData && (
                       <div className="space-y-6 pt-6 animate-in slide-in-from-bottom-4 duration-500">
                          <h3 className="text-lg font-bold tracking-tighter text-zinc-100 flex items-center gap-3 font-mono uppercase">
                            <Target className="h-5 w-5 text-emerald-500" />
                            [ OUTPUT: TAILORED_BUFFER ]
                          </h3>
                          <div className="p-8 rounded border border-zinc-800 bg-zinc-950/40 relative group">
                             <pre className="text-xs text-zinc-400 whitespace-pre-wrap leading-relaxed font-mono selection:bg-emerald-500/30">
                               {tailoredData.tailored_resume}
                             </pre>
                             <Button variant="outline" size="sm" className="absolute top-4 right-4 border-zinc-800 text-zinc-500 hover:bg-zinc-900 hover:text-emerald-500 gap-2 h-8 font-mono text-[9px] uppercase rounded">
                               <Download className="h-3.5 w-3.5" />
                               Copy_Raw
                             </Button>
                          </div>
                       </div>
                     )}
                   </div>

                   <div className="sticky top-20 space-y-6">
                     <div className="p-6 rounded border border-zinc-900 bg-zinc-950/50 space-y-6 shadow-xl">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 font-mono">[ LOGIC: TAILOR_PIPELINE ]</h4>
                       <div className="space-y-4">
                         {[
                           "Keyword Extraction Engine",
                           "Semantic Objective Mapping",
                           "Terminology Harmonization",
                           "Bullet Priority Weighting"
                         ].map((text, i) => (
                           <div key={i} className="flex gap-3 text-[10px] font-mono text-zinc-500 uppercase tracking-tight">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-900 shrink-0" />
                              {text}
                           </div>
                         ))}
                       </div>
                     </div>

                     {tailoredData && (
                       <div className="p-6 rounded border border-emerald-500/10 bg-emerald-500/5 space-y-5">
                         <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 font-mono">Diff_Summary</h4>
                         <ul className="space-y-3">
                           {tailoredData.changes_summary.slice(0, 5).map((change, i) => (
                             <li key={i} className="text-[10px] text-zinc-400 flex gap-2 font-mono uppercase tracking-tighter">
                               <span className="text-emerald-500">»</span>
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
                    <div className="p-10 rounded border border-emerald-500/10 bg-emerald-500/5 flex items-center gap-4">
                      <AlertCircle className="h-5 w-5 text-emerald-500" />
                      <p className="text-[10px] text-emerald-200/60 font-medium font-mono uppercase tracking-wider">Please enter a Job Description in the <Target className="h-3.5 w-3.5 inline mx-1" /> Tailor tab to perform an ATS_Audit.</p>
                    </div>
                 )}

                 {atsData ? (
                   <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
                     <div className="space-y-10">
                         {/* Section Scores */}
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           {[
                             { label: "Skills_Match", score: atsData.section_scores.skills, color: "bg-emerald-500" },
                             { label: "Exp_Match", score: atsData.section_scores.experience, color: "bg-emerald-500" },
                             { label: "Ctx_Alpha", score: atsData.section_scores.summary, color: "bg-emerald-500" }
                           ].map((item, i) => (
                             <div key={i} className="p-4 rounded border border-zinc-800 bg-zinc-950/30 space-y-3">
                               <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                                 <span>{item.label}</span>
                                 <span>{item.score}%</span>
                               </div>
                               <div className="h-1 w-full bg-zinc-900 rounded-none overflow-hidden border border-zinc-800/50">
                                 <div className={`h-full ${item.color} shadow-[0_0_8px_rgba(16,185,129,0.3)]`} style={{ width: `${item.score}%` }} />
                               </div>
                             </div>
                           ))}
                         </div>

                         {/* Keywords */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                           <div className="space-y-4">
                             <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 font-mono flex items-center gap-2">
                               <div className="h-1 w-1 rounded-full bg-emerald-500" />
                               Found_Keywords
                             </h4>
                             <div className="flex flex-wrap gap-2">
                               {atsData.matched_keywords.map((kw, i) => (
                                 <Badge key={i} variant="default" className="text-[9px]">{kw}</Badge>
                               ))}
                             </div>
                           </div>
                           <div className="space-y-4">
                             <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-500 font-mono flex items-center gap-2">
                               <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
                               Critical_Gaps
                             </h4>
                             <div className="flex flex-wrap gap-2">
                               {atsData.missing_keywords.map((kw, i) => (
                                 <Badge key={i} variant="destructive" className="text-[9px]">{kw}</Badge>
                               ))}
                             </div>
                           </div>
                         </div>

                        {/* Suggestions */}
                        <div className="space-y-6">
                           <h4 className="text-lg font-bold tracking-tighter text-zinc-100 flex items-center gap-3 font-mono uppercase">
                             <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                             [ ACTION_ITEMS: OPTIMIZE_NODE ]
                           </h4>
                           <div className="space-y-1">
                              {atsData.suggestions.map((sug, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded border border-zinc-900 bg-zinc-950/20 hover:bg-zinc-900 transition-colors group">
                                  <div className="text-emerald-500 font-bold text-xs tracking-tighter font-mono">[{i+1}]</div>
                                  <p className="text-zinc-400 text-[10px] font-mono leading-relaxed uppercase tracking-tighter">{sug}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="sticky top-20">
                        <div className="p-8 rounded border border-zinc-800 bg-zinc-950/50 flex flex-col items-center gap-8 shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-30" />
                           <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 font-mono">[ ATS_FIDELITY_SCORE ]</h4>
                           <ATSScoreGauge score={atsData.score} />
                           <div className="text-center space-y-3">
                             <h5 className="text-xl font-bold text-zinc-100 font-mono tracking-tighter uppercase">
                               {atsData.score >= 80 ? "MATCH_ALPHA" : atsData.score >= 60 ? "MATCH_BETA" : "CRITICAL_GAPS"}
                             </h5>
                             <p className="text-[9px] text-zinc-600 md:text-zinc-500 leading-relaxed font-mono uppercase tracking-[0.05em] px-4">SEMANTIC ANALYSIS COMPLETE // STRUCTURAL INTEGRITY VERIFIED.</p>
                           </div>
                        </div>
                     </div>
                   </div>
                 ) : (
                   <div className="p-10 border border-zinc-800 rounded bg-zinc-950/20 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-6">
                    <div className="p-4 rounded border border-zinc-800 bg-zinc-900 shadow-xl">
                      <Search className="h-8 w-8 text-zinc-700" />
                    </div>
                    <div className="max-w-sm space-y-2">
                      <h3 className="text-lg font-bold text-zinc-200 font-mono uppercase tracking-widest">[ AUDIT: STANDBY ]</h3>
                      <p className="text-[10px] text-zinc-600 font-mono uppercase leading-relaxed tracking-wider">
                        Execute the audit to verify cross-platform ATS compatibility.
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
