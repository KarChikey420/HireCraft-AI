import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/FileUpload";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  LogOut, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface RefinedResume {
  refined_resume: string;
  suggestions?: string[];
}

export default function Dashboard() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refinedResult, setRefinedResult] = useState<RefinedResume | null>(null);
  
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRefineResume = async () => {
    if (!resumeFile || !token) return;

    setIsProcessing(true);
    setRefinedResult(null);

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      const response = await fetch(`${API_BASE}/refiner`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to refine resume");
      }

      const data = await response.json();
      setRefinedResult(data);
      toast({
        title: "Resume refined!",
        description: "Your resume has been analyzed and improved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg gradient-hero">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">ResumeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-8 p-1 bg-muted rounded-xl w-fit">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-card shadow-md text-foreground"
            >
              <FileText className="h-4 w-4" />
              Resume Refiner
            </button>
          </div>

          <div className="animate-fade-up">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Refine Your Resume
                </h1>
                <p className="text-muted-foreground">
                  Upload your resume and let AI enhance it for better job applications.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <FileUpload
                    onFileSelect={setResumeFile}
                    isUploading={isProcessing}
                  />
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full mt-4"
                    onClick={handleRefineResume}
                    disabled={!resumeFile || isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Refine Resume"}
                  </Button>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border min-h-[300px]">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    {refinedResult ? (
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    Results
                  </h3>
                  {refinedResult ? (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                        {refinedResult.refined_resume}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Upload a resume and click "Refine Resume" to see AI-powered improvements.
                    </p>
                  )}
                </div>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}
