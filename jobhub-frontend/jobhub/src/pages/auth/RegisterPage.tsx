import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const roleParam = (searchParams.get('role')?.toUpperCase() as UserRole) || 'CANDIDATE';
  const [role, setRole] = useState<UserRole>(roleParam === 'RECRUITER' ? 'RECRUITER' : 'CANDIDATE');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Candidate fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');

  // Recruiter fields
  const [company, setCompany] = useState('');
  const [workEmail, setWorkEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      const user =
        role === 'CANDIDATE'
          ? await register({
              role: 'CANDIDATE',
              name,
              email,
              password,
              phone,
              skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
            })
          : await register({ role: 'RECRUITER', name, company, workEmail, password });
      navigate(user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard');
    } catch {
      setError('We could not create your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join JOBHUB as a candidate or a recruiter.">
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
        <Input label="Full name" placeholder="Aarav Mehta" icon={<User size={16} />} value={name} onChange={(e) => setName(e.target.value)} required />

        {role === 'RECRUITER' && (
          <Input label="Company" placeholder="Nimbus Cloud" icon={<Building2 size={16} />} value={company} onChange={(e) => setCompany(e.target.value)} required />
        )}

        <Input
          label={role === 'CANDIDATE' ? 'Email' : 'Work email'}
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          value={role === 'CANDIDATE' ? email : workEmail}
          onChange={(e) => (role === 'CANDIDATE' ? setEmail(e.target.value) : setWorkEmail(e.target.value))}
          required
        />

        {role === 'CANDIDATE' && (
          <Input label="Phone" type="tel" placeholder="+91 90000 00000" icon={<Phone size={16} />} value={phone} onChange={(e) => setPhone(e.target.value)} required />
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input label="Confirm password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        {role === 'CANDIDATE' && (
          <Input
            label="Skills"
            placeholder="Java, Spring Boot, React"
            hint="Comma-separated — helps us recommend better matches"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" isLoading={isLoading} fullWidth size="lg" className="mt-1">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
