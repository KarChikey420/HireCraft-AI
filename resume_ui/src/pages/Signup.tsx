import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { FileText, Loader2, Rocket, Zap, Shield } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signup(name, email, password);
      toast.success("Account created!", {
        description: "You can now log in to your account.",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed", {
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
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
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full animate-pulse delay-500" />
        
        <div className="max-w-md relative z-10">
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 w-fit shadow-2xl shadow-emerald-500/20">
                <FileText className="h-10 w-10 text-zinc-950" />
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-zinc-100">
                Join the elite <span className="text-emerald-500">HireCraft Vanguard.</span>
              </h2>
              <p className="text-lg text-zinc-500 font-medium">
                Unlock the full potential of AI-driven resume engineering and scale your career.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <Rocket className="h-5 w-5 text-emerald-400" />, title: "Deploy Instantly", desc: "Get your refined resume ready for top-tier job boards in minutes." },
                { icon: <Zap className="h-5 w-5 text-emerald-400" />, title: "Precision Tailoring", desc: "Automated JD-matching that achieves near-perfect ATS scores." },
                { icon: <Shield className="h-5 w-5 text-emerald-400" />, title: "Secure & Private", desc: "Your data is encrypted and used only for your career advancement." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-background/40 border border-border backdrop-blur-sm hover:border-emerald-500/20 transition-colors">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200">{item.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Establish Account</h1>
            <p className="text-zinc-500 font-medium">
              Initialize your professional profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400 text-xs font-bold uppercase tracking-widest font-mono pl-1">Full Name</Label>
              <Input
                id="name"
                placeholder="Cassian Andor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-card border-border text-zinc-100 placeholder:text-zinc-700 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl transition-all"
              />
            </div>

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
              <Label htmlFor="password" className="text-zinc-400 text-xs font-bold uppercase tracking-widest font-mono pl-1">Secure Passphrase</Label>
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

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold rounded-xl shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Create operative account"
                )}
              </Button>
            </div>
          </form>

          <div className="pt-2 text-center text-sm font-medium">
            <span className="text-zinc-500">Already a member?</span>{" "}
            <Link to="/login" className="text-emerald-500 hover:text-emerald-400 transition-colors font-bold pl-1 font-mono uppercase text-[11px] tracking-wider">
              Verify Credentials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
