# ChatFlow Frontend - Agent Context

## Project Overview
Telegram-like chat application frontend built for learning modern React patterns. Part of a monorepo (backend will be added at root level as `chatflow_backend/`).

## Tech Stack
| Category      | Technology                   |
|---------------|------------------------------|
| Framework     | Next.js 16 (App Router)      |
| Language      | TypeScript 5                 |
| Styling       | Tailwind CSS 4               |
| State         | Zustand 5                    |
| Data Fetching | TanStack Query (React Query) |
| Icons         | Lucide React                 |
| Real-time     | Socket.io-client (ready)     |

## Quick Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## Architecture

### Feature-Based Folder Structure
```
src/
├── app/                 # Next.js App Router (routes)
├── components/          # Shared UI components (cross-feature)
│   └── layout/          # Layout components, providers
├── features/            # Self-contained features (CORE PATTERN)
│   ├── sidebar/         # Contact list, search, navigation
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts     # Barrel exports
│   └── chat/            # Message area, input, bubbles
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── lib/                 # Global configs, store
│   └── store.ts         # Zustand store
├── hooks/               # Shared hooks (if any)
├── utils/               # Shared utilities
└── types/               # Global types
```

### Key Patterns

**1. Barrel Exports (Required)**
Every feature must export through `index.ts`:
```typescript
// features/sidebar/index.ts
export { Sidebar } from './components'
export { SearchBar } from './components'
export { useClickOutside } from './hooks'
```

**2. Import Convention**
```typescript
// ✅ CORRECT: Use barrel imports
import { Sidebar } from '@/features/sidebar'

// ❌ AVOID: Deep imports
import Sidebar from '@/features/sidebar/components/Sidebar'
```

**3. Client vs Server Components**
- Server components: Data fetching, static UI (default)
- Client components: Interactive elements, state
```typescript
'use client'  // Required for Zustand, event handlers, useState
```

## Coding Standards

### TypeScript Patterns
```typescript
// ✅ Explicit interfaces, readonly props
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

// ✅ Arrow functions with React.FC
export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false 
}) => { ... }

// ❌ NEVER use 'any'
```

### Zustand Store Pattern
```typescript
// lib/store.ts structure
interface ChatState {
  contacts: Contact[]
  currentContact: Contact | null
  messages: Map<string, Message[]>  // O(1) lookup by contactId
  
  // Actions
  setCurrentContact: (contact: Contact | null) => void
  addMessage: (contactId: string, message: Message) => void
}

// Usage with selectors (prevents re-renders)
const currentContact = useChatStore(state => state.currentContact)
```

### Styling (Tailwind)
```typescript
// ✅ Use clsx + tailwind-merge for conditionals
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const baseClasses = 'rounded-lg border p-6 shadow-sm'
const variantClasses = {
  default: 'bg-white border-gray-200',
  highlighted: 'bg-blue-50 border-blue-200'
}

className={twMerge(baseClasses, variantClasses[variant], className)}
```

### Accessibility Requirements
- All interactive elements need `aria-label`
- Keyboard navigation support (Enter, Space)
- Focus rings: `focus:outline-none focus:ring-2 focus:ring-blue-500`
- Form inputs need `aria-describedby` when applicable

## State Management Decisions

| Decision | Rationale |
|----------|-----------|
| Zustand over Redux | Simpler API, no providers, better TypeScript |
| Map for messages | O(1) lookup by contactId vs filtering arrays |
| Selective subscriptions | Prevents re-renders when unrelated state changes |
| React Query for server state | Caching, loading states, error handling |

## Component Checklist
Before finishing a component:
- [ ] Props interface defined (no `any`)
- [ ] Exported via barrel file
- [ ] `'use client'` if using hooks/events
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation (if interactive)
- [ ] Loading/error states handled
- [ ] Next.js Image used instead of `<img>`

## Common Pitfalls to Avoid
1. **Don't** import components directly from deep paths - use barrel exports
2. **Don't** use `any` - always type props and state
3. **Don't** forget `'use client'` for interactive components
4. **Don't** use regular `<img>` tags - use Next.js `Image` component
5. **Don't** mutate Zustand state directly - always use actions

## Upcoming (When Backend Added)
- WebSocket integration for real-time messaging
- Authentication flow
- File upload/download
- Message persistence

## Reference Files
- Store: `src/lib/store.ts`
- Types: Check feature folders or create `src/types/`
- Patterns: See existing `features/sidebar/` and `features/chat/` for examples
