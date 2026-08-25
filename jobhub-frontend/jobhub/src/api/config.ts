// ---------------------------------------------------------------------------
// Central API configuration.
//
// Every service in api/*.ts routes through here. To connect JOBHUB to the
// real Spring Boot backend:
//   1. Set VITE_API_BASE_URL in a .env file (falls back to localhost:8080).
//   2. Flip USE_MOCK_DATA to false.
//   3. Each service function already calls `http.get/post/put/delete` with
//      the exact endpoint paths from the spec — nothing else needs to change.
// ---------------------------------------------------------------------------

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8080/api';

// While true, every service function resolves with realistic mock data
// (see src/data/mockData.ts) instead of hitting the network. This lets the
// full UI run standalone during frontend development. Flip to false once
// the Spring Boot endpoints below are live.
export const USE_MOCK_DATA = true;

// Simulated network latency for mock responses, so loading states are
// actually visible during the demo instead of resolving instantly.
export const MOCK_LATENCY_MS = 450;

export function mockDelay<T>(value: T, ms: number = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('jobhub_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(body.message ?? 'Request failed', res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const http = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  upload: <T>(path: string, formData: FormData) =>
    request<T>(path, { method: 'POST', body: formData, headers: {} }),
};
