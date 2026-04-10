import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FileText, LogOut, User as UserIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Dev-Friendly Header */}
      <header className="border-b border-zinc-800 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="p-1 px-2 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 font-mono font-bold text-xs tracking-tighter group-hover:bg-emerald-500/10 transition-colors">
                HC_AI
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-zinc-100 hidden sm:block">HireCraft</span>
              </div>
            </div>
            
            <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block mx-2" />
            
            <nav className="hidden md:flex items-center gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2">System // 04.10</span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-zinc-800 bg-zinc-900/50 hidden lg:flex">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-400 lowercase">{user?.email}</span>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/5 gap-2 h-8 px-3 font-mono text-[10px] uppercase border border-transparent hover:border-emerald-500/20"
            >
              <LogOut className="h-3 w-3" />
              <span className="hidden sm:inline">Terminate</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col relative overflow-hidden">
        <div className="scanline pointer-events-none opacity-[0.03]" />
        {children}
      </main>

      {/* Technical Footer */}
      <footer className="py-6 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
              © 2026 [ hirecraft.sys ]
            </p>
            <div className="h-3 w-[1px] bg-zinc-800 hidden md:block" />
            <div className="flex gap-4">
              <a href="#" className="text-zinc-600 hover:text-emerald-500 text-[10px] transition-colors font-mono uppercase tracking-widest">Docs</a>
              <a href="#" className="text-zinc-600 hover:text-emerald-500 text-[10px] transition-colors font-mono uppercase tracking-widest">Log</a>
            </div>
          </div>
          <div className="text-[10px] font-mono text-zinc-700 hidden md:block">
            BUILD_REV: 0x2A4F9C // STATUS: OPTIMAL
          </div>
        </div>
      </footer>
    </div>
  );
}

