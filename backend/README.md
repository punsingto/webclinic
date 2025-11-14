# Backend (Go + Fiber)

Commands (dev):

```bash
cd backend
go mod download
# run the server entrypoint under cmd/server
go run ./cmd/server
```

Files:
- `cmd/server/main.go` — app entry and route registration (preferred)
- `main.go` — legacy scaffold (may be present)

Notes:
- If you see build errors about missing modules, run `go get` or `go mod download`.
- Use `PORT` env var to change listen port (default `8080`).
