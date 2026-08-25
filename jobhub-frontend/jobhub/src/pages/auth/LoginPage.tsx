import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const roleParam = (searchParams.get('role')?.toUpperCase() as UserRole) || 'CANDIDATE';
  const [role, setRole] = useState<UserRole>(roleParam === 'RECRUITER' ? 'RECRUITER' : 'CANDIDATE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const user = await login({ email, password, role });
      navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard');
    } catch {
      setError('We could not log you in. Check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your job search or manage your postings.">
      <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
        {(['CANDIDATE', 'RECRUITER'] as UserRole[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
              role === r ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500'
            }`}
          >
            {r === 'CANDIDATE' ? 'Candidate' : 'Recruiter'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={<Lock size={16} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" defaultChecked />
          <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} fullWidth size="lg">
          Log in
        </Button>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="h-px flex-1 bg-slate-100" />
          OR
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <Button type="button" variant="outline" fullWidth size="lg">
          <svg width="18" height="18" viewBox="0 0 18 18" className="mr-1">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.61z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
          </svg>
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
