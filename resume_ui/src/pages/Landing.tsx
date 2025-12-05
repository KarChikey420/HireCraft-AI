import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Landing() {
  const features = [
    "AI-powered resume analysis",
    "Tailored cover letters in seconds",
    "ATS-optimized formatting",
    "Professional language enhancement",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg gradient-hero">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">ResumeAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Land Your Dream Job with
              <span className="block gradient-hero bg-clip-text text-transparent">
                Perfectly Crafted Documents
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform your resume and generate tailored cover letters in seconds. 
              Our AI analyzes job descriptions to maximize your chances of getting interviews.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero" size="xl">
                  Start for Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl">
                  I already have an account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Refiner Card */}
            <div className="p-8 rounded-2xl bg-card shadow-lg animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="p-3 rounded-xl gradient-hero w-fit mb-6">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Resume Refiner
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload your resume and get instant AI feedback. We'll enhance your 
                language, fix formatting issues, and optimize for ATS systems.
              </p>
              <ul className="space-y-3">
                {features.slice(0, 2).map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cover Letter Card */}
            <div className="p-8 rounded-2xl bg-card shadow-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-3 rounded-xl gradient-accent w-fit mb-6">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Cover Letter Generator
              </h3>
              <p className="text-muted-foreground mb-6">
                Paste any job description and we'll generate a compelling cover letter 
                tailored to the role, highlighting your most relevant experience.
              </p>
              <ul className="space-y-3">
                {features.slice(2, 4).map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Job Search?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of job seekers who landed their dream roles with ResumeAI.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2024 ResumeAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
