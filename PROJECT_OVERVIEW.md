# Tactical Ops - Project Overview

## Project Summary

**Tactical Ops** is a modern, AI-powered Kanban board application built with Next.js, React, and TypeScript. It combines a sleek military-inspired design with intelligent features like GPT-4o-powered prompt generation, making it an ideal tool for developers to manage projects and generate development prompts.

### Key Stats
- **Lines of Code:** ~2,000+
- **Components:** 4 major
- **Pages:** 1 main + 1 API route
- **Styling:** Tailwind CSS (custom tactical theme)
- **Build Size:** 128 KB (First Load JS)
- **Performance:** 60 FPS animations

---

## Project Structure

```
Tactical Ops/
├── app/
│   ├── api/
│   │   └── generate-prompt/
│   │       └── route.ts                 # OpenAI API endpoint
│   ├── globals.css                      # Global styles & theme
│   ├── layout.tsx                       # Root layout wrapper
│   ├── page.tsx                         # Main Kanban board page
│   └── favicon.ico
├── components/
│   ├── Card.tsx                         # Individual task card
│   ├── Column.tsx                       # Column container
│   ├── KanbanBoard.tsx                  # Main board component
│   └── PromptModal.tsx                  # AI prompt modal
├── lib/
│   ├── localStorage.ts                  # State management utils
│   └── types.ts                         # TypeScript interfaces
├── public/                              # Static assets
├── .env.local                           # Environment variables (not committed)
├── .eslintrc.json                       # ESLint configuration
├── .gitignore                           # Git ignore rules
├── next.config.js                       # Next.js configuration
├── package.json                         # Dependencies
├── postcss.config.js                    # PostCSS configuration
├── tailwind.config.ts                   # Tailwind theme config
├── tsconfig.json                        # TypeScript configuration
├── FEATURES.md                          # Complete feature documentation
├── PROJECT_OVERVIEW.md                  # This file
└── README.md                            # Quick start guide
```

---

## Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│         KanbanBoard (Main Page)         │
│  State Management: React hooks + Local  │
└──────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
    ┌───────┐   ┌───────┐   ┌───────┐
    │Column │   │Column │   │Column │
    │ (To-Do)  │(In Progress)│(Done) │
    └───────┘   └───────┘   └───────┘
        │           │           │
    ┌───────┐   ┌───────┐   ┌───────┐
    │ Card  │   │ Card  │   │ Card  │
    └───────┘   └───────┘   └───────┘
        │           │           │
        └───────────┼───────────┘
                    │
            ┌───────────────┐
            │ PromptModal   │
            │  (AI Feature) │
            └───────────────┘
```

### Data Flow

```
User Action
    ↓
React State Update
    ↓
localStorage Save
    ↓
UI Re-render
    ↓
Framer Motion Animation
```

### API Integration (Optional AI Feature)

```
┌──────────────────┐
│   Client-Side    │
│  (Card Component)│
└────────┬─────────┘
         │
    POST /api/generate-prompt
         │
    ┌────▼──────────────────┐
    │  Next.js API Route    │
    │ (Server-side secure)  │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │   OpenAI GPT-4o       │
    │   (Generate Prompt)   │
    └────┬──────────────────┘
         │
    ┌────▼──────────────────┐
    │   Response JSON       │
    │  (Prompt Text)        │
    └────┬──────────────────┘
         │
    Display in Modal
```

---

## Core Components

### 1. **KanbanBoard** (`components/KanbanBoard.tsx`)
**Lines of Code:** ~200
**Responsibility:** Main application component, state orchestration

**Key Functions:**
- Manages global board state (tasks, columns)
- Handles CRUD operations for tasks and columns
- Manages drag-and-drop between columns
- Renders all columns and provides props down the tree
- Handles localStorage sync

**State Shape:**
```typescript
{
  tasks: Record<string, Task>,
  columns: Column[],
  columnOrder: string[]
}
```

### 2. **Column** (`components/Column.tsx`)
**Lines of Code:** ~140
**Responsibility:** Column container and drag-drop target

**Key Functions:**
- Renders column header with task count
- Displays all tasks in column
- Handles drag-over visual feedback
- Manages drop zone for card reordering
- Provides add card form

**Drag-Drop Handlers:**
- `onDragOver()` - Enable drop zone, show feedback
- `onDragLeave()` - Disable feedback
- `onDrop()` - Process card move

### 3. **Card** (`components/Card.tsx`)
**Lines of Code:** ~190
**Responsibility:** Individual task card with full CRUD

**Key Functions:**
- Render task content (title, description, notes)
- Handle drag initiation with data payload
- Edit mode toggle and save/cancel
- Delete task with confirmation
- Generate AI prompt via modal

**States:**
- Display mode (normal)
- Edit mode (inline editors)
- Dragging (visual feedback)
- AI generating (spinner)

### 4. **PromptModal** (`components/PromptModal.tsx`)
**Lines of Code:** ~120
**Responsibility:** Display AI-generated prompts

**Key Features:**
- Modal backdrop with click-to-close
- Animated appearance/disappearance
- Read-only textarea for prompt text
- Copy-to-clipboard with success feedback
- Loading spinner during generation

**Animation Timings:**
- Scale: 0.95 → 1 (300ms)
- Opacity: 0 → 1 (300ms)
- Smooth cubic-bezier easing

---

## State Management Strategy

### Local Component State
- Form inputs (title, description, notes)
- UI toggles (edit mode, modal visibility)
- Loading states (isGenerating, isAdding)

### Global State (Context-like)
Passed through component tree:
- `tasks`: All task objects
- `columns`: All column definitions
- Handler callbacks (onAddTask, onDeleteTask, etc.)

### Persistent State
Stored in localStorage:
- Complete board state serialized as JSON
- Auto-saves on every change
- Loaded on app initialization

```typescript
// localStorage.ts provides these utilities:
- getInitialState()    // Load from localStorage
- saveState()          // Persist to localStorage
- addTask()            // Create task
- updateTask()         // Modify task
- deleteTask()         // Remove task
- moveTask()           // Reorder between columns
- addColumn()          // Create column
- deleteColumn()       // Remove column
```

---

## Styling Architecture

### Tailwind CSS + Custom Theme

**Configuration:** `tailwind.config.ts`

**Custom Color Variables:**
```typescript
tactical: {
  dark: '#0a0e27',           // Primary background
  darkAlt: '#141829',        // Secondary background
  border: '#1a1f3a',         // Border color
  orange: '#ff6b35',         // Primary accent
  orangeLight: '#ff8c42',    // Hover accent
  text: '#e0e0e0',          // Primary text
  textSecondary: '#a0a0a0'  // Secondary text
}
```

**Custom Animations:**
```typescript
animation: {
  'pulse-orange': 'pulse-orange 2s ease infinite'
}
```

**Global Styles:** `app/globals.css`
- Scrollbar styling (orange theme)
- Selection colors (tactical theme)
- Base transitions on interactive elements
- Smooth font rendering

---

## Key Features Implementation

### Drag-and-Drop

**Technology:** Native HTML5 Drag and Drop API

**Implementation:**
```
Card:
  - Set draggable={!isEditing}
  - On dragstart: Serialize task/column data

Column:
  - Enable drop zone with onDragOver
  - Highlight on onDragLeave
  - Process move on onDrop

KanbanBoard:
  - Call moveTask() state handler
  - Update column ordering
  - Animate card into position
```

### AI Prompt Generation

**Technology:** OpenAI GPT-4o API

**Flow:**
1. Click ✨ on card
2. Fetch POST `/api/generate-prompt`
3. API endpoint calls OpenAI SDK
4. GPT-4o generates prompt
5. Response returned to client
6. Modal displays result
7. One-click copy to clipboard

**System Prompt:**
```
"Convert task titles into detailed development prompts for Claude Code.
Include technical requirements, UI considerations, and specific technologies.
Format for easy copy-paste. Keep concise but detailed."
```

### Data Persistence

**Technology:** Browser's localStorage API

**Key Points:**
- Automatic save on every change
- No backend required
- Works offline
- Survives page refresh
- ~5-10MB storage typically available

**Data Structure:**
```json
{
  "kanban-board-state": {
    "tasks": {
      "task-1234": {
        "id": "task-1234",
        "title": "Feature Name",
        "description": "Details",
        "notes": "Additional info",
        "createdAt": 1699472100000
      }
    },
    "columns": [
      {"id": "col-1", "title": "TO-DO", "taskIds": ["task-1234"]},
      {"id": "col-2", "title": "IN PROGRESS", "taskIds": []},
      {"id": "col-3", "title": "COMPLETED", "taskIds": []}
    ],
    "columnOrder": ["col-1", "col-2", "col-3"]
  }
}
```

---

## Performance Considerations

### Build Optimization
- Next.js static generation where possible
- Code splitting by route
- Tree-shaking unused code
- Image optimization (future)

### Runtime Performance
- Memoized callbacks with useCallback
- Optimized re-renders with React.memo (future)
- Efficient animations with Framer Motion
- No unnecessary state updates

### Memory Usage
- Efficient state serialization
- Cleanup on component unmount
- Event listener delegation

### Network
- All data stored locally
- Minimal API calls (only for AI generation)
- No polling or live sync overhead

---

## Security Architecture

### Secrets Management
- API keys in `.env.local` (not committed)
- `.gitignore` prevents accidental commits
- Environment variables loaded at build time

### Server-Side Protection
- OpenAI API calls through Next.js API route
- API key never exposed to client
- Request validation on API endpoint
- Error handling prevents info leakage

### Data Security
- No authentication in current version
- Local-only data storage
- No external API for data sync
- All data handled in-memory and localStorage

---

## Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Add environment variables
echo "OPENAI_API_KEY=your_key" > .env.local

# Start development server
npm run dev
```

### Development Loop
1. Make code changes
2. Next.js hot-reloads
3. Test in browser
4. Commit to git
5. Push to GitHub

### Build & Deploy
```bash
# Production build
npm run build

# Run production version
npm start
```

---

## Testing Strategy (Future)

### Planned Test Coverage
- **Unit Tests:** Component logic, utilities
- **Integration Tests:** Component interactions
- **E2E Tests:** Full user workflows
- **Performance Tests:** Animation smoothness

### Test Tools (Planned)
- Jest for unit testing
- React Testing Library for components
- Cypress/Playwright for E2E

---

## Deployment Options

### Current Capability
- Fully static app (except API route)
- No database required
- No external dependencies needed

### Deployment Platforms
- **Vercel** (Recommended - free tier)
- **Netlify** (With serverless functions)
- **Self-hosted** (Any Node.js server)

### Environment Variables
Must set on deployment platform:
```
OPENAI_API_KEY=your_production_key
```

---

## Monitoring & Analytics (Future)

### Planned Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (Posthog)
- API usage tracking (OpenAI dashboard)

---

## Maintenance & Updates

### Regular Maintenance
- Monitor OpenAI API status
- Update dependencies (npm audit)
- Monitor localStorage size
- Check browser compatibility

### Breaking Changes
- Documented in CHANGELOG (future)
- Version bumping strategy
- Migration guides for major versions

---

## Roadmap

### Phase 1 (Current - v1.0)
✅ Core Kanban board
✅ Drag-and-drop
✅ Task CRUD
✅ AI prompts
✅ Local storage

### Phase 2 (Planned - v2.0)
- User authentication
- Cloud sync
- Collaborative editing
- Advanced filtering/search
- Time tracking

### Phase 3 (Future - v3.0)
- Mobile app
- Integrations (GitHub, Slack)
- Advanced analytics
- Team management

---

## Contributing

### Code Style
- TypeScript strict mode
- ESLint configuration
- Tailwind CSS utilities
- Component-based architecture

### Pull Request Process
1. Create feature branch
2. Make changes with tests
3. Update documentation
4. Submit PR with description
5. Address review feedback

---

## Support & Contact

For questions, issues, or suggestions:
- Check [FEATURES.md](FEATURES.md) for detailed documentation
- Review [README.md](README.md) for quick start
- Open an issue on GitHub
- Contact: [Your Contact Info]

---

## License

MIT License - Open source and free to use!

**Copyright © 2024 Tactical Ops Contributors**

Permission is hereby granted, free of charge, to use, modify, and distribute this software.

---

**Last Updated:** November 2024
**Version:** 1.0.0
**Status:** Production Ready
