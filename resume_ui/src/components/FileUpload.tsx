import { useState, useCallback } from "react";
import { Upload, File, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
  description?: string;
  isUploading?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept = ".pdf",
  label = "Upload your resume",
  description = "PDF files only, max 10MB",
  isUploading = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const clearFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div
      className={cn(
        "relative rounded-3xl border-2 border-dashed transition-all duration-500 group",
        isDragging
          ? "border-emerald-500 bg-emerald-500/5 scale-[1.01] shadow-2xl shadow-emerald-500/10"
          : "border-border bg-card/40 hover:border-emerald-500/30 hover:bg-card/60",
        isUploading && "pointer-events-none opacity-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        disabled={isUploading}
      />
      <div className="flex flex-col items-center justify-center p-12 text-center min-h-[320px] relative overflow-hidden">
        {/* Background glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {isUploading ? (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <Loader2 className="h-16 w-16 text-emerald-500 animate-spin relative" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-zinc-100 tracking-tight">Processing Engine...</p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">Atomic Analysis in progress</p>
            </div>
          </div>
        ) : selectedFile ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-sm mx-auto">
            <div className="flex items-center gap-4 p-6 bg-card border border-border rounded-2xl shadow-2xl relative group-file">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <File className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="text-left flex-grow min-w-0">
                <p className="text-sm font-bold text-zinc-100 truncate font-mono">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 font-mono">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-red-400 transition-all ml-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="relative mx-auto w-fit">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-6 rounded-2xl bg-background border border-border shadow-xl relative transition-all group-hover:border-emerald-500/30">
                <Upload className="h-10 w-10 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-zinc-100 tracking-tight">{label}</p>
              <p className="text-sm text-zinc-500 font-medium">{description}</p>
            </div>
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                Drag & drop or click to browse
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
}
