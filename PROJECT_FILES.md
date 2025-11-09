# Tactical Ops - Project Files Reference

Complete directory structure and file descriptions for the Tactical Ops Kanban board application.

---

## Directory Structure

```
Tactical Ops/
├── 📁 app/                          # Next.js app directory
│   ├── 📁 api/
│   │   └── 📁 generate-prompt/
│   │       └── route.ts             # OpenAI GPT-4o API endpoint
│   ├── globals.css                  # Global styles and theme
│   ├── layout.tsx                   # Root layout component
│   └── page.tsx                     # Main Kanban board page
│
├── 📁 components/                   # React components
│   ├── Card.tsx                     # Task card component with AI integration
│   ├── Column.tsx                   # Column container component
│   ├── KanbanBoard.tsx              # Main board component with state
│   └── PromptModal.tsx              # AI prompt display modal
│
├── 📁 lib/                          # Utilities and types
│   ├── localStorage.ts              # State management and persistence
│   └── types.ts                     # TypeScript type definitions
│
├── 📁 public/                       # Static assets (empty)
│
├── 📁 node_modules/                 # Dependencies (not committed)
│
├── 📄 .env.local                    # Environment variables (not committed)
├── 📄 .eslintrc.json                # ESLint configuration
├── 📄 .gitignore                    # Git ignore patterns
├── 📄 next.config.js                # Next.js configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 package-lock.json             # Dependency lock file
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 tailwind.config.ts            # Tailwind CSS theme config
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 tsconfig.node.json            # TypeScript node config
│
├── 📘 README.md                     # Quick start guide
├── 📘 FEATURES.md                   # Complete feature documentation
├── 📘 GETTING_STARTED.md            # Step-by-step setup guide
├── 📘 PROJECT_OVERVIEW.md           # Architecture and design
├── 📘 PROJECT_FILES.md              # This file
└── 📘 CHANGELOG.md                  # Version history
```

---

## Configuration Files

### `package.json`
**Purpose:** Dependencies and npm scripts
**Key Content:**
- Next.js, React, TypeScript dependencies
- OpenAI SDK for GPT-4o integration
- Framer Motion for animations
- Tailwind CSS and PostCSS
- Development and build scripts

**Scripts:**
```json
{
  "dev": "next dev",           // Start dev server
  "build": "next build",       // Production build
  "start": "next start",       // Run production server
  "lint": "next lint"          // Run ESLint
}
```

### `.env.local`
**Purpose:** Secret configuration (not committed)
**Content:**
```env
OPENAI_API_KEY=sk-your-key-here
```
**Note:** This file is in `.gitignore` and must be created manually

### `tsconfig.json`
**Purpose:** TypeScript compiler configuration
**Key Settings:**
- Target: ES2020
- Strict mode enabled
- Path aliases: `@/*` points to project root
- Module resolution: Node.js compatible

### `tailwind.config.ts`
**Purpose:** Tailwind CSS theme customization
**Custom Colors:**
```typescript
tactical: {
  dark: '#0a0e27',
  darkAlt: '#141829',
  border: '#1a1f3a',
  orange: '#ff6b35',
  orangeLight: '#ff8c42',
  text: '#e0e0e0',
  textSecondary: '#a0a0a0'
}
```

### `next.config.js`
**Purpose:** Next.js build configuration
**Current:** Minimal config, uses defaults

### `postcss.config.js`
**Purpose:** CSS processing pipeline
**Includes:**
- Tailwind CSS
- Autoprefixer for vendor prefixes

### `.eslintrc.json`
**Purpose:** Code quality and style rules
**Extends:** Next.js recommended ESLint config

### `.gitignore`
**Purpose:** Prevent committing sensitive files
**Key Patterns:**
- `.env.local` - Environment variables
- `node_modules/` - Dependencies
- `.next/` - Build output
- `.git/` - Git internals

---

## Source Files

### App Directory

#### `app/page.tsx`
**Purpose:** Main page component
**Size:** ~4 lines
**Content:**
```typescript
import KanbanBoard from '@/components/KanbanBoard'

export default function Home() {
  return <KanbanBoard />
}
```

#### `app/layout.tsx`
**Purpose:** Root layout wrapper
**Size:** ~20 lines
**Content:**
- Metadata (title, description)
- Font imports
- Body with global styles
- Renders children

#### `app/globals.css`
**Purpose:** Global styles and theme
**Size:** ~50 lines
**Content:**
- Tailwind imports
- CSS custom properties (if needed)
- Scrollbar styling (orange theme)
- Selection color
- Base transitions

#### `app/api/generate-prompt/route.ts`
**Purpose:** OpenAI API endpoint
**Size:** ~80 lines
**Content:**
- POST endpoint handler
- OpenAI SDK initialization
- Request validation
- GPT-4o prompt generation
- Error handling
- Server-side security (API key protected)

---

### Components Directory

#### `components/KanbanBoard.tsx`
**Purpose:** Main application component
**Size:** ~200 lines
**Responsibilities:**
- Global state management
- Task and column operations (CRUD)
- Drag-and-drop handling
- Event handler orchestration
- Layout and overall structure
- localStorage sync

**Key Functions:**
```typescript
handleAddTask()        // Create new task
handleDeleteTask()     // Remove task
handleUpdateTask()     // Modify task
handleMoveTask()       // Reorder cards
handleAddColumn()      // Create column
handleDeleteColumn()   // Remove column
```

#### `components/Column.tsx`
**Purpose:** Column container
**Size:** ~140 lines
**Responsibilities:**
- Render column with tasks
- Drag-drop zone handling
- Add card form
- Column management
- Task count display

**Key States:**
- `isAdding` - Show/hide add form
- `isDragOver` - Visual feedback
- Form input state

#### `components/Card.tsx`
**Purpose:** Individual task card
**Size:** ~190 lines
**Responsibilities:**
- Task display
- Drag initiation
- Edit mode toggle
- AI prompt generation
- Task deletion
- Notes expansion

**Key Features:**
- Display mode (read-only)
- Edit mode (inline editors)
- Drag handle
- AI button integration
- Delete confirmation

#### `components/PromptModal.tsx`
**Purpose:** AI prompt display modal
**Size:** ~120 lines
**Responsibilities:**
- Modal overlay
- Prompt display
- Copy-to-clipboard
- Loading state
- Error display
- Close functionality

**Key Features:**
- Backdrop click to close
- Animated entrance/exit
- Success feedback on copy
- Loading spinner
- Accessible tabbing

---

### Library Directory

#### `lib/types.ts`
**Purpose:** TypeScript type definitions
**Size:** ~20 lines
**Types:**
```typescript
interface Task {
  id: string
  title: string
  description: string
  notes: string
  createdAt: number
}

interface Column {
  id: string
  title: string
  taskIds: string[]
}

interface KanbanState {
  tasks: Record<string, Task>
  columns: Column[]
  columnOrder: string[]
}
```

#### `lib/localStorage.ts`
**Purpose:** State management and persistence
**Size:** ~150 lines
**Functions:**
```typescript
getInitialState()      // Load from localStorage
saveState()            // Persist to localStorage
addTask()              // Create task in state
updateTask()           // Modify task
deleteTask()           // Remove task
moveTask()             // Reorder between columns
addColumn()            // Create column
deleteColumn()         // Remove column
```

---

## Documentation Files

### `README.md`
**Purpose:** Quick start and feature overview
**Sections:**
- Features summary
- Tech stack
- Installation
- Development server
- Deployment
- Color scheme
- Browser support
- Future enhancements

### `FEATURES.md`
**Purpose:** Comprehensive feature documentation
**Sections:**
- Feature overview (each with status)
- Technical implementation details
- UI/UX descriptions
- Advanced features
- Configuration options
- API documentation
- Security considerations
- Performance metrics
- Troubleshooting

**Size:** ~400 lines

### `PROJECT_OVERVIEW.md`
**Purpose:** Architecture and design documentation
**Sections:**
- Project summary
- Architecture diagrams
- Component descriptions
- State management
- Styling architecture
- Key features implementation
- Performance considerations
- Security architecture
- Development workflow
- Roadmap

**Size:** ~600 lines

### `GETTING_STARTED.md`
**Purpose:** Step-by-step setup and usage guide
**Sections:**
- Prerequisites
- Installation (5 steps)
- First steps (5 features)
- Pro tips
- Troubleshooting
- Workflows
- Quick reference
- Keyboard shortcuts

**Size:** ~500 lines

### `CHANGELOG.md`
**Purpose:** Version history and changes
**Sections:**
- Version 1.0.0 (initial release)
- Features added
- Component changes
- Technical details
- Known limitations
- Future roadmap

### `PROJECT_FILES.md`
**Purpose:** This file - file reference
**Contents:**
- Directory structure
- File descriptions
- Line counts
- Key content summaries

---

## File Statistics

### Code Files
| File | Lines | Type | Purpose |
|------|-------|------|---------|
| KanbanBoard.tsx | 200 | React | Main component |
| Card.tsx | 190 | React | Task card |
| Column.tsx | 140 | React | Column container |
| PromptModal.tsx | 120 | React | Modal display |
| localStorage.ts | 150 | Utils | State management |
| route.ts | 80 | API | GPT-4o endpoint |
| types.ts | 20 | Types | Type definitions |
| globals.css | 50 | CSS | Global styles |
| layout.tsx | 20 | React | Root layout |
| page.tsx | 4 | React | Main page |

**Total Source Code:** ~970 lines

### Documentation Files
| File | Size | Purpose |
|------|------|---------|
| README.md | 4.7 KB | Quick start |
| FEATURES.md | 10.9 KB | Features |
| PROJECT_OVERVIEW.md | 14.3 KB | Architecture |
| GETTING_STARTED.md | 11.7 KB | Setup guide |
| CHANGELOG.md | 7.0 KB | Versions |
| PROJECT_FILES.md | This file | File reference |

**Total Documentation:** ~48 KB

### Configuration Files
- package.json (648 bytes)
- tailwind.config.ts (836 bytes)
- tsconfig.json (813 bytes)
- next.config.js (92 bytes)
- postcss.config.js (82 bytes)
- .eslintrc.json (100 bytes)
- .gitignore (380 bytes)

---

## Dependencies Overview

### Production Dependencies
- **next** (14.2.3) - React framework
- **react** (18.3.1) - UI library
- **react-dom** (18.3.1) - React DOM
- **framer-motion** (11.0.3) - Animations
- **openai** (~1.0.0) - OpenAI SDK

### Development Dependencies
- **typescript** (5.3.3) - Type checking
- **tailwindcss** (3.4.1) - CSS framework
- **postcss** (8.4.32) - CSS processor
- **autoprefixer** (10.4.17) - Vendor prefixes
- **eslint** (8.56.0) - Linting
- **eslint-config-next** (14.2.3) - Next.js rules

### Package Size
- Installed size: ~500 MB (node_modules)
- Production bundle: ~128 KB
- Gzip compressed: ~40 KB

---

## Key File Relationships

### Data Flow
```
page.tsx
   ↓
KanbanBoard.tsx (state management)
   ├─→ Column.tsx (renders columns)
   │    └─→ Card.tsx (renders cards)
   │         └─→ PromptModal.tsx
   └─→ localStorage.ts (persistence)
        └─→ types.ts (type definitions)

API Integration:
Card.tsx
   ↓
POST /api/generate-prompt
   ↓
OpenAI GPT-4o
   ↓
PromptModal.tsx (display result)
```

### Style Hierarchy
```
globals.css (base)
   ↓
tailwind.config.ts (theme config)
   ↓
Component styles (Tailwind classes)
   ├─→ KanbanBoard.tsx
   ├─→ Column.tsx
   ├─→ Card.tsx
   └─→ PromptModal.tsx
```

---

## Import Paths

### Using Path Aliases
```typescript
// Instead of:
import { Task } from '../../../lib/types'

// Use:
import { Task } from '@/lib/types'
```

All imports use `@/` alias to project root for cleaner imports.

---

## Build Artifacts

### Generated Folders (not committed)
- `.next/` - Next.js build output
- `node_modules/` - Installed dependencies
- `.git/` - Git history

### Generated Files
- `package-lock.json` - Dependency lock
- `next-env.d.ts` - TypeScript definitions
- `.env.local` - Environment variables

---

## Adding New Files

### New Component
```
components/YourComponent.tsx
```
- Follow existing patterns
- Use TypeScript interfaces
- Export as default
- Include JSDoc comments

### New Utility
```
lib/yourUtility.ts
```
- Export named functions
- Include type definitions
- Add unit tests (future)

### New Page (if needed)
```
app/yourpage/page.tsx
```
- Use Next.js app router
- Create route.ts for API endpoints
- Leverage automatic code splitting

---

## File Editing Guidelines

### Before Editing
1. Check the file's purpose and scope
2. Review related files
3. Understand the component hierarchy
4. Check for dependencies

### TypeScript Files
- Maintain strict mode
- Use proper type annotations
- Export types from types.ts
- Include JSDoc for complex functions

### Component Files
- Use functional components
- Use hooks (useState, useCallback)
- Keep components focused
- Use prop interfaces

### CSS Files
- Use Tailwind classes
- Use custom theme colors
- Avoid inline styles (usually)
- Document non-obvious classes

---

## File Sizes

```
Total project source: ~1,000 lines
Total documentation: ~1,500 lines
Total configuration: ~2,500 bytes
Production bundle: ~128 KB
Gzip bundle: ~40 KB
```

---

## Version Control

### What's Committed
✅ Source code (.ts, .tsx)
✅ Configuration files
✅ Documentation (.md)
✅ .gitignore, .eslintrc

### What's Not Committed
❌ node_modules/
❌ .next/
❌ .env.local
❌ .git/
❌ Build artifacts

---

## Quick File Navigation

### To Change
| Need | File |
|------|------|
| Colors | `tailwind.config.ts` |
| Fonts | `app/globals.css` |
| API behavior | `app/api/generate-prompt/route.ts` |
| Default columns | `lib/localStorage.ts` |
| Types/interfaces | `lib/types.ts` |
| Main layout | `app/layout.tsx` |

### To Understand
| Need | File |
|------|------|
| Features | `FEATURES.md` |
| Architecture | `PROJECT_OVERVIEW.md` |
| Setup | `GETTING_STARTED.md` |
| Quick ref | `README.md` |
| Versions | `CHANGELOG.md` |

---

## Maintenance Checklist

- [ ] Update `CHANGELOG.md` on version bump
- [ ] Keep `package.json` dependencies updated
- [ ] Run `npm audit` regularly
- [ ] Check TypeScript for errors
- [ ] Run ESLint before committing
- [ ] Update `README.md` for major changes
- [ ] Test in multiple browsers

---

**Last Updated:** November 8, 2024
**Version:** 1.0.0
**Status:** Complete ✅
