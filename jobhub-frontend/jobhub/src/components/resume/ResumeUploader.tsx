import { useRef, useState, type DragEvent } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeUploaderProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
}

export function ResumeUploader({ onUpload, isUploading }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors',
        isDragging ? 'border-brand-400 bg-brand-50/50' : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = '';
        }}
      />
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        {isUploading ? <FileText size={22} className="animate-pulse" /> : <UploadCloud size={22} />}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-700">
          {isUploading ? 'Uploading your resume…' : 'Drag and drop your resume here'}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">or click to browse · PDF, DOC, DOCX up to 5MB</p>
      </div>
    </div>
  );
}
