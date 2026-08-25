import { useEffect, useState } from 'react';
import { Building2, Globe, MapPin, Users, Pencil } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { recruiterService } from '@/api/recruiterService';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LoadingState } from '@/components/ui/States';

export default function RecruiterCompanyPage() {
  const { data: company, isLoading, refetch } = useAsync(() => recruiterService.getCompany(), []);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ about: '', website: '', location: '', employeeCount: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (company) setForm({ about: company.about, website: company.website, location: company.location, employeeCount: company.employeeCount });
  }, [company]);

  const save = async () => {
    if (!company) return;
    setIsSaving(true);
    await recruiterService.updateCompany(company.id, form);
    setIsSaving(false);
    setEditOpen(false);
    refetch();
  };

  if (isLoading || !company) return <LoadingState label="Loading company profile…" />;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 font-display text-2xl font-bold text-brand-700">
              {company.name[0]}
            </span>
            <div>
              <h1 className="font-display text-xl font-bold text-slate-900">{company.name}</h1>
              <p className="text-sm text-slate-500">{company.industry}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {company.employeeCount} employees
                </span>
                <a href={company.website} className="flex items-center gap-1 text-brand-600 hover:underline">
                  <Globe size={12} /> Website
                </a>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" icon={<Pencil size={14} />} onClick={() => setEditOpen(true)}>
            Edit
          </Button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{company.about}</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold text-slate-900">
          <Building2 size={17} className="text-brand-600" /> Candidate-facing profile
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          This is what candidates see when they view your company page from a job listing.
        </p>
        <a href={`/company/${company.id}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
          View public profile →
        </a>
      </div>

      <Modal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Company Profile"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={save} isLoading={isSaving}>Save Changes</Button>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <Textarea label="About" rows={4} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
          <Input label="Website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input label="Employee Count" value={form.employeeCount} onChange={(e) => setForm({ ...form, employeeCount: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
