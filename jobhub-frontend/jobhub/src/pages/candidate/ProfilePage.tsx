import { useState } from 'react';
import { Pencil, Upload, MapPin, Phone, GraduationCap, Briefcase, FolderGit2, Award } from 'lucide-react';
import { useAsync } from '@/hooks/useAsync';
import { candidateService } from '@/api/candidateService';
import { Avatar } from '@/components/ui/Avatar';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { LoadingState, EmptyState } from '@/components/ui/States';

function Section({ icon: Icon, title, children, onEdit }: { icon: React.ElementType; title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold text-slate-900">
          <Icon size={17} className="text-brand-600" /> {title}
        </h2>
        {onEdit && (
          <button onClick={onEdit} className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:underline">
            <Pencil size={12} /> Edit
          </button>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: profile, isLoading, refetch } = useAsync(() => candidateService.getProfile(), []);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ headline: '', about: '', location: '', phone: '' });
  const [isSaving, setIsSaving] = useState(false);

  const openEdit = () => {
    if (!profile) return;
    setForm({ headline: profile.headline, about: profile.about, location: profile.location ?? '', phone: profile.phone ?? '' });
    setEditOpen(true);
  };

  const save = async () => {
    setIsSaving(true);
    await candidateService.updateProfile(form);
    setIsSaving(false);
    setEditOpen(false);
    refetch();
  };

  if (isLoading) return <LoadingState label="Loading your profile…" />;
  if (!profile) return <EmptyState title="Profile unavailable" />;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Avatar name={profile.name} size="lg" className="h-20 w-20 text-2xl" />
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold text-slate-900">{profile.name}</h1>
            <p className="mt-0.5 text-sm text-slate-500">{profile.headline}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {profile.phone}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" icon={<Pencil size={14} />} onClick={openEdit}>
              Edit Profile
            </Button>
            <Button size="sm" icon={<Upload size={14} />}>
              Upload Resume
            </Button>
          </div>
        </div>
      </div>

      <Section icon={Briefcase} title="About" onEdit={openEdit}>
        <p className="text-sm leading-relaxed text-slate-600">{profile.about}</p>
      </Section>

      <Section icon={Award} title="Skills">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((s) => (
            <Tag key={s} variant="brand">
              {s}
            </Tag>
          ))}
        </div>
      </Section>

      <Section icon={GraduationCap} title="Education">
        <div className="flex flex-col gap-4">
          {profile.education.map((e) => (
            <div key={e.id}>
              <p className="text-sm font-semibold text-slate-800">{e.school}</p>
              <p className="text-sm text-slate-500">
                {e.degree}, {e.field}
              </p>
              <p className="text-xs text-slate-400">
                {e.startYear} – {e.endYear}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Briefcase} title="Experience">
        <div className="flex flex-col gap-5">
          {profile.experience.length > 0 ? (
            profile.experience.map((e) => (
              <div key={e.id}>
                <p className="text-sm font-semibold text-slate-800">{e.title}</p>
                <p className="text-sm text-slate-500">
                  {e.company} · {e.startDate} – {e.endDate}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{e.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">No experience added yet.</p>
          )}
        </div>
      </Section>

      <Section icon={FolderGit2} title="Projects">
        <div className="flex flex-col gap-5">
          {profile.projects.map((p) => (
            <div key={p.id}>
              <p className="text-sm font-semibold text-slate-800">{p.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.techStack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Award} title="Certifications">
        {profile.certifications.length > 0 ? (
          <div className="flex flex-col gap-3">
            {profile.certifications.map((c) => (
              <div key={c.id} className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">{c.name}</span>
                <span className="text-slate-400">
                  {c.issuer} · {c.year}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No certifications added yet.</p>
        )}
      </Section>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile" footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={save} isLoading={isSaving}>Save Changes</Button>
        </div>
      }>
        <div className="flex flex-col gap-4">
          <Input label="Headline" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
          <Textarea label="About" rows={4} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
          <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}
