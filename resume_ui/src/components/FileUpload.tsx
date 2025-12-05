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
        "relative rounded-xl border-2 border-dashed transition-all duration-300",
        isDragging
          ? "border-secondary bg-secondary/10 scale-[1.02]"
          : "border-border bg-card hover:border-secondary/50",
        isUploading && "pointer-events-none opacity-70"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      <div className="flex flex-col items-center justify-center p-8 text-center">
        {isUploading ? (
          <>
            <Loader2 className="h-12 w-12 text-secondary animate-spin mb-4" />
            <p className="text-sm font-medium text-foreground">Processing...</p>
          </>
        ) : selectedFile ? (
          <>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg mb-4">
              <File className="h-8 w-8 text-secondary" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="p-1 rounded-full hover:bg-background transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Click or drag to replace</p>
          </>
        ) : (
          <>
            <div className="p-4 rounded-full bg-secondary/10 mb-4">
              <Upload className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            <p className="text-xs text-secondary mt-2">
              Drag & drop or click to browse
            </p>
          </>
        )}
      </div>
    </div>
  );
}
