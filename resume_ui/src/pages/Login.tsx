import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { FileText, Loader2, ShieldCheck, Zap, Target } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!", {
        description: "You've been logged in successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed", {
        description: error instanceof Error ? error.message : "Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row overflow-hidden">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-card items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full animate-pulse delay-700" />
        
        <div className="max-w-md relative z-10">
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 w-fit shadow-2xl shadow-emerald-500/20">
                <FileText className="h-10 w-10 text-zinc-950" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-zinc-100">
                Forge your career with <span className="text-emerald-500">Atomic Precision.</span>
              </h2>
              <p className="text-lg text-zinc-500 font-medium">
                The most advanced AI-powered resume optimization engine for elite professionals.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Target className="h-5 w-5 text-emerald-500" />, title: "ATS Infiltration", desc: "Outsmart algorithms with strategic keyword injection." },
                { icon: <Zap className="h-5 w-5 text-emerald-500" />, title: "Instant Refinement", desc: "Rewrite weak bullets into high-impact metrics in seconds." },
                { icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />, title: "Verified Patterns", desc: "Industry-standard templates that recruiters love." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-background/50 border border-border backdrop-blur-sm">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200">{item.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Log in</h1>
            <p className="text-zinc-500 font-medium">
              Access your HireCraft Command Center
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400 text-xs font-bold uppercase tracking-widest font-mono pl-1">Target Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="architect@hirecraft.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-card border-border text-zinc-100 placeholder:text-zinc-700 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pl-1">
                <Label htmlFor="password" className="text-zinc-400 text-xs font-bold uppercase tracking-widest font-mono">Access Key</Label>
                <a href="#" className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest font-mono hover:underline">Lost access?</a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-card border-border text-zinc-100 placeholder:text-zinc-700 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98]" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                "Initialize Session"
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-sm font-medium">
            <span className="text-zinc-500">Need an operative account?</span>{" "}
            <Link to="/signup" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold pl-1 font-mono uppercase text-[11px] tracking-wider">
              Join the Vanguard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
