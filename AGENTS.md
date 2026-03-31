# ChatFlow - Agent Context

## Project Overview
Full-stack chat application (Telegram-like). Currently frontend-only, backend will be added as `chatflow_backend/`.

## Monorepo Structure
```
ChatFlow/
├── chatflow_frontend/     # Next.js 16 + React frontend
│   ├── AGENTS.md          # ← Detailed frontend context
│   ├── src/
│   └── package.json
└── chatflow_backend/      # (Coming soon)
```

## Quick Navigation
- **Frontend details**: See `chatflow_frontend/AGENTS.md`
- **Frontend code**: `chatflow_frontend/src/`

## Tech Summary
| Layer | Stack |
|-------|-------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS, Zustand |
| Backend | TBD (planned) |

## Common Commands

### Frontend
```bash
cd chatflow_frontend
npm run dev      # localhost:3000
npm run build
npm run lint
```

## Coding Conventions (Project-Wide)
1. **TypeScript strictly** - No `any` types
2. **Feature-based organization** - Code lives near where it's used
3. **Barrel exports** - Clean import paths via `index.ts`
4. **Explicit over implicit** - Clear types, named exports

## When Adding Backend
1. Create `chatflow_backend/` at root level
2. Add its own `AGENTS.md` with backend-specific context
3. Update this file to include backend commands/stack
4. Document API contracts between frontend/backend
