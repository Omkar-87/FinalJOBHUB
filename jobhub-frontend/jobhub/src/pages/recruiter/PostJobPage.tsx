import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MapPin, Briefcase, Wallet } from 'lucide-react';
import { jobService } from '@/api/jobService';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Tag } from '@/components/ui/Tag';
import type { JobType, WorkMode } from '@/types';

const STEPS = ['Role Details', 'Description', 'Compensation & Logistics'];

export default function PostJobPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState<'draft' | 'publish' | null>(null);
  const [published, setPublished] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    responsibilities: '',
    requirements: '',
    skills: '',
    salaryMin: '',
    salaryMax: '',
    location: '',
    employmentType: 'Full Time' as JobType,
    workMode: 'On-site' as WorkMode,
    experience: '',
    deadline: '',
  });

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const handleSave = async (mode: 'draft' | 'publish') => {
    setIsSaving(mode);
    await jobService.createJob({
      title: form.title,
      description: form.description,
      responsibilities: form.responsibilities.split('\n').filter(Boolean),
      requiredSkills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      qualifications: form.requirements.split('\n').filter(Boolean),
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
      location: form.location,
      jobType: form.employmentType,
      workMode: form.workMode,
      experience: form.experience,
      applicationDeadline: form.deadline || undefined,
      status: mode === 'draft' ? 'DRAFT' : 'ACTIVE',
    });
    setIsSaving(null);
    if (mode === 'publish') setPublished(true);
    else navigate('/recruiter/jobs');
  };

  if (published) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-5 font-display text-xl font-bold text-slate-900">Job Published</h1>
        <p className="mt-2 text-sm text-slate-500">
          {form.title || 'Your job'} is now live and visible to candidates.
        </p>
        <Button size="lg" fullWidth className="mt-6" onClick={() => navigate('/recruiter/jobs')}>
          Go to My Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-slate-900">Post a Job</h1>
      <p className="mt-1 text-sm text-slate-500">Create a new listing candidates will discover on JOBHUB.</p>

      <div className="mt-6 flex gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? 'bg-brand-600' : 'bg-slate-100'}`} />
            <p className={`mt-1.5 text-xs font-medium ${i <= step ? 'text-slate-700' : 'text-slate-400'}`}>{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <Input label="Job Title" placeholder="Backend Software Engineer" value={form.title} onChange={(e) => update({ title: e.target.value })} />
            <Input label="Skills" placeholder="Java, Spring Boot, PostgreSQL" hint="Comma-separated" value={form.skills} onChange={(e) => update({ skills: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Employment Type" value={form.employmentType} onChange={(e) => update({ employmentType: e.target.value as JobType })}>
                {(['Full Time', 'Part Time', 'Internship', 'Contract'] as JobType[]).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
              <Input label="Experience Required" placeholder="0–2 years" value={form.experience} onChange={(e) => update({ experience: e.target.value })} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-4">
            <Textarea label="Description" rows={4} value={form.description} onChange={(e) => update({ description: e.target.value })} />
            <Textarea label="Responsibilities" rows={4} hint="One per line" value={form.responsibilities} onChange={(e) => update({ responsibilities: e.target.value })} />
            <Textarea label="Requirements" rows={4} hint="One per line" value={form.requirements} onChange={(e) => update({ requirements: e.target.value })} />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Salary Min (LPA)" type="number" value={form.salaryMin} onChange={(e) => update({ salaryMin: e.target.value })} />
              <Input label="Salary Max (LPA)" type="number" value={form.salaryMax} onChange={(e) => update({ salaryMax: e.target.value })} />
            </div>
            <Input label="Location" placeholder="Bengaluru, India" value={form.location} onChange={(e) => update({ location: e.target.value })} />
            <Select label="Work Mode" value={form.workMode} onChange={(e) => update({ workMode: e.target.value as WorkMode })}>
              {(['Remote', 'Hybrid', 'On-site'] as WorkMode[]).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </Select>
            <Input label="Application Deadline" type="date" value={form.deadline} onChange={(e) => update({ deadline: e.target.value })} />
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-5">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewOpen(true)}>
              Preview
            </Button>
            <Button variant="outline" onClick={() => handleSave('draft')} isLoading={isSaving === 'draft'}>
              Save Draft
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
            ) : (
              <Button onClick={() => handleSave('publish')} isLoading={isSaving === 'publish'}>
                Publish Job
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title="Job Preview">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-base font-bold text-brand-700">
            {(form.title || 'J')[0]}
          </span>
          <div>
            <p className="font-display text-base font-semibold text-slate-900">{form.title || 'Untitled role'}</p>
            <p className="text-sm text-slate-500">Your Company</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {form.location || 'Location TBD'} · {form.workMode}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={12} /> {form.employmentType} · {form.experience || 'Experience TBD'}
          </span>
          <span className="flex items-center gap-1">
            <Wallet size={12} /> ₹{form.salaryMin || '0'}–{form.salaryMax || '0'} LPA
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {form.skills.split(',').map((s) => s.trim()).filter(Boolean).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        {form.description && <p className="mt-4 text-sm leading-relaxed text-slate-600">{form.description}</p>}
      </Modal>
    </div>
  );
}
