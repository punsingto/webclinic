# Copilot instructions for Webclinic

Project layout
- `frontend/` — Next.js (TypeScript) app. Pages live in `frontend/pages`. API routes for edge/serverless examples live in `frontend/pages/api`.
- `backend/` — Go service using Fiber. Primary server entry is under `backend/cmd/server/main.go`. HTTP routes are under `/api/*`.

Big picture
- Monorepo with two main components: the Next.js frontend (server-rendered/static) and a Go Fiber backend serving JSON APIs. The frontend communicates with backend via REST (e.g., `GET /api/hello`, `GET /api/health`).

Key patterns and conventions
- Frontend uses TypeScript (see `frontend/tsconfig.json`). Keep page components in `frontend/pages` and global styles in `frontend/styles`.
- Backend uses Go modules (see `backend/go.mod`). Keep HTTP handlers grouped in `backend/handlers` and register them in `backend/main.go`.
- API surface: the backend exposes endpoints under `/api/*`. The frontend fetches those using absolute paths in development (proxying is not configured by default).

Developer workflows (commands)
- Frontend (dev):

```bash
cd frontend
npm install
npm run dev
```

- Frontend (build & start):

```bash
cd frontend
npm run build
npm run start
```

- Backend (dev):

```bash
cd backend
go mod download
# preferred entrypoint
go run ./cmd/server
# or build:
go build -o bin/server ./cmd/server && ./bin/server
```

- Docker (optional): build frontend with `docker build` in `frontend/` and build Go image using `backend/Dockerfile`.

Important files to inspect when coding
- `frontend/pages/index.tsx` — example page showing how frontend calls the backend.
- `frontend/pages/api/hello.ts` — example local API route.
-- `backend/cmd/server/main.go` — app entry, middleware and route registration (preferred).
-- `backend/handlers/` — handler examples (small handlers may be present). If handlers appear malformed, check for alternate server entries under `cmd/`.

Coding notes for AI agents
- Make minimal, focused changes: prefer adding a new route/handler or page rather than large refactors.
- When modifying APIs, update both `backend/handlers` and `frontend/pages` examples demonstrating usage.
- Keep TypeScript types in `frontend/` consistent; if adding new API response shapes, add matching frontend interfaces near the consumer page.
- Respect the module paths used in `go.mod` and do not assume external frameworks beyond Fiber.

If anything here is unclear, ask for the specific file you'd like to change (example: `backend/main.go` or `frontend/pages/index.tsx`).
