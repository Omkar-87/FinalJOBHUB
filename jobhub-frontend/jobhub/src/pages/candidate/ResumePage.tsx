import { useState } from 'react';
import { Download, Eye, FileText, Sparkles, Star, Trash2 } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { resumeService } from '@/api/resumeService';
import { ResumeUploader } from '@/components/resume/ResumeUploader';
import { Button } from '@/components/ui/Button';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { formatDate } from '@/lib/utils';

export default function ResumePage() {
  const { data: resumes, isLoading, refetch } = useAsync(() => resumeService.getResumes(), []);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState<{ score: number; suggestions: string[] } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    await resumeService.uploadResume(file);
    setIsUploading(false);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await resumeService.deleteResume(id);
    refetch();
  };

  const handleSetPrimary = async (id: string) => {
    await resumeService.setPrimary(id);
    refetch();
  };

  const runAnalysis = async () => {
    if (!resumes?.[0]) return;
    setAnalyzing(true);
    const result = await resumeService.getResumeAnalysis(resumes[0].id);
    setAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Resume</h1>
        <p className="mt-1 text-sm text-slate-500">Manage the resumes you use to apply for jobs.</p>
      </div>

      <ResumeUploader onUpload={handleUpload} isUploading={isUploading} />

      <div>
        <h2 className="mb-3 font-display text-base font-semibold text-slate-900">Your Resumes</h2>
        {isLoading ? (
          <LoadingState />
        ) : resumes && resumes.length > 0 ? (
          <div className="flex flex-col gap-3">
            {resumes.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FileText size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">{r.fileName}</p>
                    <p className="text-xs text-slate-400">
                      {r.fileType} · {r.fileSizeKb} KB · Uploaded {formatDate(r.uploadedAt)}
                    </p>
                  </div>
                  {r.isPrimary && (
                    <span className="ml-1 shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">
                      Primary
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  {!r.isPrimary && (
                    <button onClick={() => handleSetPrimary(r.id)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-amber-500" aria-label="Set as primary">
                      <Star size={16} />
                    </button>
                  )}
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600" aria-label="Preview">
                    <Eye size={16} />
                  </button>
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600" aria-label="Download">
                    <Download size={16} />
                  </button>
                  <button onClick={() => handleDelete(r.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={<FileText size={20} />} title="No resumes yet" description="Upload your first resume to start applying." />
        )}
      </div>

      <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-purple-50 p-6">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-brand-600" />
          <h2 className="font-display text-base font-semibold text-slate-900">Improve your resume</h2>
        </div>
        <p className="mt-1.5 text-sm text-slate-600">
          Get AI-powered suggestions to strengthen your primary resume based on your target roles.
        </p>
        <Button className="mt-4" onClick={runAnalysis} isLoading={analyzing} disabled={!resumes?.length}>
          Analyze My Resume
        </Button>

        {analysis && (
          <div className="mt-5 rounded-xl bg-white/70 p-4">
            <p className="text-sm font-semibold text-slate-800">Resume score: {analysis.score}/100</p>
            <ul className="mt-2 flex flex-col gap-2">
              {analysis.suggestions.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
