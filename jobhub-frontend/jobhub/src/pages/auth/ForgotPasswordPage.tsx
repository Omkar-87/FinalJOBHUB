import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authService } from '@/api/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await authService.requestPasswordReset(email);
    setIsLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a link to get back into your account.">
      {sent ? (
        <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-700">
          If an account exists for <strong>{email}</strong>, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail size={16} />} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" isLoading={isLoading} fullWidth size="lg">
            Send reset link
          </Button>
        </form>
      )}
      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-brand-600 hover:underline">
        <ArrowLeft size={14} /> Back to log in
      </Link>
    </AuthLayout>
  );
}
