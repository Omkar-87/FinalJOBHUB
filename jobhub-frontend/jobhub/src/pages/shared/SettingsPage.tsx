import { useState } from 'react';
import { Bell, Lock, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

function SettingsSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <h2 className="flex items-center gap-2 font-display text-base font-semibold text-slate-900">
        <Icon size={17} className="text-brand-600" /> {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your account and notification preferences.</p>
      </div>

      <SettingsSection icon={Lock} title="Account">
        <div className="flex flex-col gap-4">
          <Input label="Full name" defaultValue={user?.name} />
          <Input label="Email" type="email" defaultValue={user?.email} />
          <Button
            className="self-start"
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection icon={Bell} title="Notifications">
        <div className="flex flex-col gap-3">
          <Checkbox label="Email me about application status changes" defaultChecked />
          <Checkbox label="Email me about new job matches" defaultChecked />
          <Checkbox label="Email me about interview reminders" defaultChecked />
          <Checkbox label="Send me product updates and tips" />
        </div>
      </SettingsSection>

      <SettingsSection icon={Trash2} title="Danger Zone">
        <p className="text-sm text-slate-500">Deleting your account is permanent and cannot be undone.</p>
        <Button variant="danger" size="sm" className="mt-3">
          Delete Account
        </Button>
      </SettingsSection>
    </div>
  );
}
