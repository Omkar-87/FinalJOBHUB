# JOBHUB — Frontend

A modern, responsive job recruitment platform frontend, built with React, TypeScript, Tailwind CSS, and React Router. Designed to connect to a Spring Boot REST API.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173. The app runs entirely on mock data out of the box — no backend required to explore it.

To create a production build:

```bash
npm run build
npm run preview
```

## Demo accounts

There's no real backend yet, so login is mocked — enter *any* email/password and pick a role (Candidate or Recruiter) on the login screen to sign in as that role's demo persona.

## Project structure

```
src/
  api/            Service layer — one file per domain (auth, jobs, applications, ...)
  components/     Reusable UI: components/ui (buttons, inputs, cards...) and
                  domain components (jobs, applications, candidates, company, resume...)
  context/        AuthContext (login/register/logout, current user)
  data/           mockData.ts — realistic sample dataset used while USE_MOCK_DATA is true
  hooks/          useAsync, useNotifications
  pages/          One file per route, organized by candidate/ recruiter/ auth/ shared/
  types/          Shared TypeScript interfaces mirroring the expected Spring Boot API shapes
```

## Connecting to your Spring Boot backend

Everything routes through `src/api/config.ts`. To switch from mock data to your real API:

1. Create a `.env` file in the project root:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
2. In `src/api/config.ts`, set `USE_MOCK_DATA = false`.
3. That's it — every function in `src/api/*.ts` already calls `http.get/post/put/patch/delete`
   against the exact endpoint paths from the spec (`/auth/login`, `/jobs`, `/applications`,
   `/profile`, `/resume`, `/recommendations`, etc.). No component code needs to change.

The `http` client in `config.ts` attaches a `Bearer` token from `localStorage` automatically
(set on login/register) and sends `credentials: 'include'` for session-based auth if you'd
rather use that instead of JWT.

### Endpoints expected by the frontend

| Method | Path                          | Used by                          |
|--------|-------------------------------|-----------------------------------|
| POST   | /auth/login                   | authService.login                 |
| POST   | /auth/register                | authService.register              |
| GET    | /jobs                         | jobService.getJobs                |
| GET    | /jobs/{id}                    | jobService.getJobById             |
| POST   | /jobs                         | jobService.createJob              |
| PUT    | /jobs/{id}                    | jobService.updateJob              |
| POST   | /applications                 | applicationService.submitApplication |
| GET    | /applications                 | applicationService.getMyApplications |
| PATCH  | /applications/{id}/status     | applicationService.updateStatus   |
| GET    | /profile                      | candidateService.getProfile       |
| PUT    | /profile                      | candidateService.updateProfile    |
| POST   | /resume                       | resumeService.uploadResume        |
| GET    | /resume                       | resumeService.getResumes          |
| GET    | /recommendations              | recommendationService.getRecommendations |
| GET    | /notifications                | notificationService.getNotifications |

See each file in `src/api/` for the full list, including recruiter-side endpoints
(`/recruiter/stats`, `/company/{id}`, etc.).

## Design system

- Colors: an indigo–violet "brand" palette plus a violet "accent" hue, defined as CSS
  variables in `src/index.css` (Tailwind v4 `@theme`).
- Type: **Sora** for headings (`font-display`), **Inter** for body text, **IBM Plex Mono**
  for numeric/data values (salaries, stats, application IDs).
- All components are in `src/components/ui/` and are reused throughout — no page hand-rolls
  its own button or input.

## Notes

- AI recommendations (`recommendationService`) and resume analysis
  (`resumeService.getResumeAnalysis`) are clearly marked as placeholders for your AI/ML
  service — swap the mock implementation for a real endpoint whenever that's ready.
- Mock data lives in `src/data/mockData.ts` if you want to add more sample jobs/companies
  while the backend is still in progress.
