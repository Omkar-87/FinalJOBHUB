import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, CheckCircle2, FileText, Upload } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { jobService } from '@/api/jobService';
import { resumeService } from '@/api/resumeService';
import { applicationService } from '@/api/applicationService';
import { candidateService } from '@/api/candidateService';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/States';
import { ResumeUploader } from '@/components/resume/ResumeUploader';
import { cn, formatDate } from '@/lib/utils';
import type { Application, Resume } from '@/types';

const STEPS = ['Personal Information', 'Resume', 'Cover Letter', 'Review Application', 'Submit'];

export default function ApplicationFlowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading: jobLoading } = useAsync(() => jobService.getJobById(id!), [id]);
  const { data: profile } = useAsync(() => candidateService.getProfile(), []);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<Application | null>(null);

  const [personal, setPersonal] = useState({ name: '', email: '', phone: '' });
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    resumeService.getResumes().then((r) => {
      setResumes(r);
      const primary = r.find((x) => x.isPrimary) ?? r[0];
      if (primary) setSelectedResumeId(primary.id);
    });
  }, []);

  useEffect(() => {
    if (profile) {
      setPersonal({ name: profile.name, email: 'aarav.mehta@example.com', phone: profile.phone ?? '' });
    }
  }, [profile]);

  if (jobLoading) return <LoadingState label="Preparing your application…" />;
  if (!job) return null;

  const canProceed = () => {
    if (step === 0) return personal.name && personal.email && personal.phone;
    if (step === 1) return !!selectedResumeId;
    return true;
  };

  const handleUpload = async (file: File) => {
    const newResume = await resumeService.uploadResume(file);
    setResumes((prev) => [newResume, ...prev]);
    setSelectedResumeId(newResume.id);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const application = await applicationService.submitApplication({
      jobId: job.id,
      resumeId: selectedResumeId,
      coverLetter,
      personalInfo: personal,
    });
    setResult(application);
    setIsSubmitting(false);
    setStep(4);
  };

  if (result) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-slate-900">Application Submitted Successfully</h1>
        <p className="mt-2 text-sm text-slate-500">
          Your application has been sent to {job.companyName}. Here's a summary:
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-xl bg-slate-50 p-5 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Job</span>
            <span className="font-medium text-slate-800">{job.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Company</span>
            <span className="font-medium text-slate-800">{job.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Application ID</span>
            <span className="font-mono text-xs font-medium text-slate-800">{result.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Submitted</span>
            <span className="font-medium text-slate-800">{formatDate(result.appliedDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="font-medium text-brand-700">{result.status}</span>
          </div>
        </div>

        <Button size="lg" fullWidth className="mt-6" onClick={() => navigate(`/candidate/applications/${result.id}`)}>
          Track Application
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="mb-8 flex items-center">
        {STEPS.slice(0, 4).map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                  i < step ? 'bg-brand-600 text-white' : i === step ? 'bg-brand-600 text-white ring-4 ring-brand-100' : 'bg-slate-100 text-slate-400'
                )}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </span>
              <span className={cn('hidden text-[11px] font-medium sm:block', i <= step ? 'text-slate-700' : 'text-slate-400')}>
                {label}
              </span>
            </div>
            {i < 3 && <div className={cn('mx-2 h-0.5 flex-1', i < step ? 'bg-brand-600' : 'bg-slate-100')} />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">Applying for</p>
        <h1 className="font-display text-lg font-bold text-slate-900">
          {job.title} · {job.companyName}
        </h1>

        <div className="mt-6">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <Input label="Full name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} required />
              <Input label="Email" type="email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} required />
              <Input label="Phone" type="tel" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} required />
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              {resumes.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  {resumes.map((r) => (
                    <label
                      key={r.id}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
                        selectedResumeId === r.id ? 'border-brand-400 bg-brand-50/50' : 'border-slate-200 hover:bg-slate-50'
                      )}
                    >
                      <input
                        type="radio"
                        name="resume"
                        checked={selectedResumeId === r.id}
                        onChange={() => setSelectedResumeId(r.id)}
                        className="h-4 w-4 accent-brand-600"
                      />
                      <FileText size={18} className="text-brand-500" />
                      <span className="flex-1 text-sm text-slate-700">{r.fileName}</span>
                      {r.isPrimary && <span className="text-[11px] font-medium text-brand-500">Primary</span>}
                    </label>
                  ))}
                </div>
              )}
              <p className="text-xs font-medium text-slate-400">Or upload a new resume for this application</p>
              <ResumeUploader onUpload={handleUpload} />
            </div>
          )}

          {step === 2 && (
            <Textarea
              label="Cover letter (optional)"
              rows={9}
              placeholder={`Tell ${job.companyName} why you're a great fit for this role…`}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 text-sm">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Personal Information</p>
                <p className="mt-1 text-slate-700">{personal.name} · {personal.email} · {personal.phone}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Resume</p>
                <p className="mt-1 flex items-center gap-2 text-slate-700">
                  <Upload size={14} /> {resumes.find((r) => r.id === selectedResumeId)?.fileName ?? 'None selected'}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Cover Letter</p>
                <p className="mt-1 text-slate-600">{coverLetter || 'No cover letter added.'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between border-t border-slate-100 pt-5">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} isLoading={isSubmitting}>
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
