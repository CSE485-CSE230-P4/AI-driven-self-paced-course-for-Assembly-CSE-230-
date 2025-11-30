# Capstone

Monorepo with Next.js frontend, FastAPI backend, and PostgreSQL (pgvector). Docker Compose runs everything with one command.

## Quick Start

Prereqs: Docker, Docker Compose

```bash
docker compose up --build
```

Open `http://localhost:3000` for the frontend.
Backend API: `http://localhost:8000`
DB runs on `localhost:5432` (user: `app`, password: `app_password`, db: `app`).

## Structure

- `frontend/`: Next.js 16 + Tailwind
- `backend/`: FastAPI + psycopg
- `db/`: init scripts (pgvector)

## Acceptance Criteria

- Single command to run stack: `docker compose up`
- Frontend and backend communicate (frontend calls `backend:8000` via env)
- Database connection succeeds (backend connects to PostgreSQL)

## Test Scenarios

New developer onboarding
1. Clone repo
2. Run `docker compose up --build`
3. Visit `http://localhost:3000` and `http://localhost:8000/docs` (FastAPI docs)

Expected: all services start without errors; Next.js page loads; FastAPI docs accessible.

## Branching Strategy (GitFlow-lite)

- `main`: stable releases
- `develop`: integration branch
- Feature branches: `feature/<name>` → PR into `develop`
- Release branches: `release/<version>` → merge to `main` and `develop`
- Hotfix branches: `hotfix/<name>` → PR into `main` and `develop`

## Local Development (without Docker)

Frontend:
```bash
cd frontend && npm install && npm run dev
```

Backend:
```bash
export CREATEAI_API_TOKEN="your-token"
# or set it in the .env file with:
# CREATEAI_API_TOKEN="your-token"
# Optional: export CREATEAI_API_URL="https://api-main.aiml.asu.edu/query"
cd backend && pip install -r requirements.txt && uvicorn app.main:app --reload
```

## Configuration

### Frontend
- `NEXT_PUBLIC_API_URL`: Base URL the browser uses when calling FastAPI.
  Defaults to `http://localhost:8000`, which works for both local dev and Docker because
  the backend is published on the host. Override it when deploying elsewhere.

### Backend
- `CORS_ALLOW_ORIGINS`: Comma-separated list of origins that FastAPI should
  allow. The default enables `http://localhost:3000`, `http://127.0.0.1:3000`, and the
  Docker service name `http://frontend:3000`. Set this if your frontend is served from a
  different domain.
- `CREATEAI_API_TOKEN`: Required token for CreateAI service authentication
- `CREATEAI_API_URL`: Optional CreateAI API endpoint URL (defaults to `https://api-main.aiml.asu.edu/query`)
- `DATABASE_URL`: PostgreSQL connection string (automatically set in Docker Compose)

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login (returns JWT token)
- `GET /auth/protected` - Protected route (requires JWT token)
- `GET /auth/users/me` - Get current user info (requires JWT token)

### AI/Query
- `POST /fetch/query` - Query CreateAI service with custom prompts
- `POST /fetch/quiz` - Generate quiz questions

### API Documentation
- Interactive API docs: `http://localhost:8000/docs` (Swagger UI)

### Environment Variables

The backend requires the following environment variables for AI functionality:
- `CREATEAI_API_TOKEN` (required): Token for CreateAI service authentication
- `CREATEAI_API_URL` (optional): CreateAI API endpoint URL (defaults to `https://api-main.aiml.asu.edu/query`)
- `DATABASE_URL` (required for Docker): PostgreSQL connection string
- `CORS_ALLOW_ORIGINS` (optional): Comma-separated list of allowed CORS origins

