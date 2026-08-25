import { http, USE_MOCK_DATA, mockDelay } from '@/api/config';
import { demoCandidate } from '@/data/mockData';
import type { AuthUser, UserRole } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CandidateRegisterPayload {
  role: 'CANDIDATE';
  name: string;
  email: string;
  password: string;
  phone: string;
  skills: string[];
}

export interface RecruiterRegisterPayload {
  role: 'RECRUITER';
  name: string;
  company: string;
  workEmail: string;
  password: string;
}

export type RegisterPayload = CandidateRegisterPayload | RecruiterRegisterPayload;

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

const MOCK_USERS: Record<UserRole, AuthUser> = {
  CANDIDATE: {
    id: demoCandidate.id,
    name: demoCandidate.name,
    email: 'aarav.mehta@example.com',
    role: 'CANDIDATE',
  },
  RECRUITER: {
    id: 'rec-1',
    name: 'Sneha Kapoor',
    email: 'sneha.kapoor@nimbuscloud.example.com',
    role: 'RECRUITER',
    companyId: 'c1',
  },
};

export const authService = {
  // POST /api/auth/login
  async login(payload: LoginPayload & { role?: UserRole }): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      const role: UserRole = payload.role ?? 'CANDIDATE';
      return mockDelay({ token: 'mock-jwt-token', user: MOCK_USERS[role] });
    }
    return http.post<AuthResponse>('/auth/login', payload);
  },

  // POST /api/auth/register
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    if (USE_MOCK_DATA) {
      const role = payload.role;
      const user: AuthUser =
        role === 'CANDIDATE'
          ? { id: demoCandidate.id, name: payload.name, email: payload.email, role }
          : { id: 'rec-new', name: payload.name, email: payload.workEmail, role, companyId: 'c1' };
      return mockDelay({ token: 'mock-jwt-token', user });
    }
    return http.post<AuthResponse>('/auth/register', payload);
  },

  async logout(): Promise<void> {
    localStorage.removeItem('jobhub_token');
    if (USE_MOCK_DATA) return mockDelay(undefined, 150);
    return http.post('/auth/logout');
  },

  // GET /api/auth/forgot-password (placeholder — matched to Spring Boot endpoint later)
  async requestPasswordReset(email: string): Promise<{ sent: boolean }> {
    if (USE_MOCK_DATA) return mockDelay({ sent: true });
    return http.post('/auth/forgot-password', { email });
  },
};
