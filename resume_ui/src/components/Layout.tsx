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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Premium Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
              <FileText className="h-6 w-6 text-zinc-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight leading-none">HireCraft AI</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium mt-0.5">Premium Resume Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 hidden md:flex">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-zinc-400">{user?.email}</span>
            </div>
            
            <div className="h-8 w-[1px] bg-zinc-800 hidden md:block" />

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10 gap-2 transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Subtle Footer */}
      <footer className="py-8 border-t border-zinc-900 bg-zinc-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs text-center">
            © 2026 HireCraft AI. Optimized for high-performance ATS parsing.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Documentation</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
