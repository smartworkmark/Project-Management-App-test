# Getting Started with Tactical Ops

Welcome to Tactical Ops - Your AI-Powered Kanban Board! This guide will get you up and running in minutes.

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v16.x or later) - [Download](https://nodejs.org/)
- **npm** (v7.x or later) - Comes with Node.js
- **OpenAI API Key** (free or paid account) - [Get one here](https://platform.openai.com/api-keys)
- **A code editor** - VS Code recommended
- **A modern web browser** - Chrome, Firefox, Safari, or Edge

### Check Your Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## Installation (5 minutes)

### 1. Clone or Download the Repository

```bash
# Clone from GitHub (if applicable)
git clone https://github.com/smartworkmark/Project-Management-App-test.git
cd Project-Management-App-test

# Or extract the ZIP file and navigate to the directory
cd Tactical-Ops
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`. It may take a minute or two.

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Create the file
touch .env.local

# Or on Windows:
type nul > .env.local
```

Open `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-api-key-here
```

**Important:**
- Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- Never share your API key publicly
- `.env.local` is automatically ignored by Git (won't be committed)

### 4. Start the Development Server

```bash
npm run dev
```

You'll see output like:

```
> vibe-kanban@0.1.0 dev
> next dev

  ▲ Next.js 14.2.33
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### 5. Open in Browser

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

You should see the Tactical Ops Kanban board with the "TACTICAL OPS" header!

---

## First Steps (2 minutes)

### Create Your First Task

1. **Click "+ Add Card"** in the "TO-DO" column
2. **Enter a task title** - e.g., "Build login feature"
3. **Add optional description** - e.g., "Implement secure authentication"
4. **Add optional notes** - e.g., "Use JWT tokens"
5. **Click "Add"** - Your task appears on the board!

### Move a Task

1. **Click and drag** any card
2. **Drag to another column** - Notice the column highlights in orange
3. **Release the mouse** - Card smoothly animates to new position
4. **Changes auto-save** to localStorage

### Edit a Task

1. **Click the ✎ button** on any card
2. **Modify the title, description, or notes**
3. **Click "Save"** - Changes saved instantly
4. **Click "Cancel"** - Discard changes

### Delete a Task

1. **Click the ✕ button** on any card
2. **Confirm** - Card is removed with animation

### Generate an AI Prompt

1. **Click the ✨ button** on any card
2. **Wait for the modal** - GPT-4o generates a detailed prompt
3. **Read the prompt** - Scroll if needed
4. **Click "Copy to Clipboard"** - Prompt copied
5. **Paste into Claude Code** - Use the prompt to build features!

---

## Key Features Overview

### The Dashboard

```
┌─────────────────────────────────────────────────────┐
│             TACTICAL OPS (Header)                   │
│     Mission Control System v2.1.7 | Classified      │
│                                                      │
│  TO-DO        │  IN PROGRESS  │  COMPLETED          │
│  (3 tasks)    │  (2 tasks)    │  (1 task)           │
│  ──────────   │  ──────────   │  ──────────          │
│  [Cards]      │  [Cards]      │  [Cards]            │
│               │               │                      │
│  + Add Card   │  + Add Card   │  + Add Card         │
│               │               │                      │
│  + Add Column                                        │
├─────────────────────────────────────────────────────┤
│ System Status: ONLINE | Tasks: 6 | Columns: 3      │
│ Data persisted locally | Last sync: now             │
└─────────────────────────────────────────────────────┘
```

### Card Buttons (Left to Right)

- **✨ AI Prompt** - Generate development prompt with GPT-4o
- **✎ Edit** - Modify card content
- **✕ Delete** - Remove card

### Column Features

- **Task Count** - Shows number of tasks (0-999)
- **Drag Zone** - Drop cards here to add to column
- **+ Add Card** - Quick add form for new tasks
- **✕ Delete** - Remove custom columns (default columns protected)

---

## Pro Tips

### 💡 Use Descriptive Titles
Instead of: "Feature"
Better: "Add dark mode toggle to settings page"

### 💡 Use Descriptions for Details
Add context that helps you remember what needs to be done

### 💡 Leverage Notes for Resources
```
Notes example:
- Tailwind classes to use: dark: prefix
- Reference: https://tailwindcss.com/docs/dark-mode
- Time estimate: 2 hours
```

### 💡 Create Custom Columns
Don't limit yourself to the default three! Create columns like:
- "Backlog", "Ready", "In Review", "Testing", "Deployed"
- "Ideas", "In Development", "Stable", "Deprecated"
- Anything that matches your workflow!

### 💡 Copy AI Prompts to Claude Code
1. Click ✨ on a card
2. Click "Copy to Clipboard"
3. Go to Claude Code
4. Paste the prompt
5. Get detailed implementation guidance!

### 💡 Organize by Priority
Use columns or card order to track priority

### 💡 Use Notes for Decisions
Document why you chose something
```
Decided to use PostgreSQL instead of MongoDB because:
- Better for relational data
- ACID transactions needed
- Team expertise with SQL
```

---

## Troubleshooting

### "Port 3000 is already in use"

```bash
# Use a different port
npm run dev -- -p 3001

# Or kill the process on port 3000
# On macOS/Linux:
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot find module 'openai'"

```bash
# Reinstall dependencies
npm install
```

### "OPENAI_API_KEY is not configured"

Make sure your `.env.local` file:
1. Exists in the project root
2. Contains: `OPENAI_API_KEY=sk-...`
3. Is not in `.gitignore` (it shouldn't be committed)
4. Restart the dev server after creating/editing

### AI button not working / Getting API errors

1. **Check your API key** is valid at [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Check you have credits** - Free trial may have expired
3. **Check browser console** - Open DevTools (F12) and look for error messages
4. **Restart the server** - Sometimes fresh start helps
5. **Check API status** - Visit [OpenAI Status](https://status.openai.com/)

### Changes not saving

1. **Check browser storage**
   - Open DevTools → Application → Local Storage
   - Look for `kanban-board-state` key
   - If empty, localStorage might be disabled

2. **Try clearing cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear cookies and site data
   - Reload page

3. **Check storage quota**
   - localStorage limited to ~5-10MB
   - If you have hundreds of cards, you might hit limit

### Drag-and-drop not working

1. **Make sure you're not in edit mode** - Exit edit mode first (click Cancel)
2. **Try refreshing the page** - F5 or Cmd+R
3. **Check browser compatibility** - Use latest version of Chrome, Firefox, Safari, or Edge
4. **Check extensions** - Some browser extensions interfere with drag-and-drop

---

## Next Steps

### Learn the Full Feature Set
Read [FEATURES.md](FEATURES.md) for detailed documentation of every feature.

### Understand the Architecture
Read [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for technical details.

### Customize Your Setup
- Change colors in `tailwind.config.ts`
- Modify default columns in `lib/localStorage.ts`
- Update system prompt in `app/api/generate-prompt/route.ts`

### Deploy Your App

**Vercel (Recommended - Free)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Self-hosted (Netlify, Railway, etc.)**
```bash
# Build
npm run build

# Run locally
npm start
```

Remember to set `OPENAI_API_KEY` in your deployment environment!

---

## Common Workflows

### Getting Started with a New Project

1. ✅ Create "Backlog" column
2. ✅ Add all your features as cards
3. ✅ Use ✨ button to generate prompts
4. ✅ Copy prompt to Claude Code
5. ✅ Implement feature
6. ✅ Drag card to "Done"

### Daily Standup

1. ✅ Check "In Progress" column
2. ✅ Review what's blocked
3. ✅ Move completed items to "Done"
4. ✅ Plan next day's work
5. ✅ Drag new items to "In Progress"

### Code Review

1. ✅ Create "In Review" column
2. ✅ Move PR items to this column
3. ✅ Use notes to track PR links
4. ✅ Move to "Done" when approved
5. ✅ Clean up after merge

---

## Performance Tips

- **Keep localStorage clean** - Archive old projects occasionally
- **Limit open tasks** - 50-100 concurrent tasks is ideal
- **Use custom columns** - Better organization = better performance
- **Clear browser cache** - Helps with performance issues

---

## Best Practices

✅ **Use clear, specific titles**
✅ **Add descriptions for complex tasks**
✅ **Use notes for decisions and resources**
✅ **Create custom columns for your workflow**
✅ **Archive completed items regularly**
✅ **Review prompts before copying to Claude Code**
✅ **Keep your API key secret**

---

## Getting Help

### Documentation
- [README.md](README.md) - Quick reference
- [FEATURES.md](FEATURES.md) - Detailed features
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Technical details
- [CHANGELOG.md](CHANGELOG.md) - Version history

### Reporting Issues
1. Check the [Troubleshooting](#troubleshooting) section above
2. Check existing issues on GitHub
3. Provide:
   - Description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Browser and OS info
   - Screenshots if helpful

### Feature Requests
Have an idea? Create a GitHub issue with:
- Clear description
- Use case
- Proposed implementation

---

## Keyboard Shortcuts (Coming Soon!)

These shortcuts will be available in v2.0:

- `Ctrl+N` / `Cmd+N` - New card
- `Ctrl+S` / `Cmd+S` - Save current card
- `Escape` - Close modals / Cancel edits
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Shift+Z` / `Cmd+Shift+Z` - Redo

---

## Quick Reference

| Action | Steps |
|--------|-------|
| **Add Task** | Click "+ Add Card" → Fill form → Click "Add" |
| **Edit Task** | Click ✎ → Modify content → Click "Save" |
| **Delete Task** | Click ✕ → Confirm |
| **Move Task** | Drag card → Drop in new column |
| **Generate Prompt** | Click ✨ → Wait for modal → Click "Copy" |
| **Add Column** | Click "+ Add Column" → Name it → Press Enter |
| **Delete Column** | Click ✕ on column header (only custom columns) |

---

## What's Next?

🎉 **Congratulations!** You're all set up. Now:

1. **Create a task** - Try out the main features
2. **Generate a prompt** - Click ✨ on a card
3. **Explore columns** - Add a custom column
4. **Check docs** - Read FEATURES.md for advanced usage

---

**Happy building! 🚀**

For detailed information, see [README.md](README.md)

**Version:** 1.0.0
**Last Updated:** November 2024
**Status:** Production Ready ✅
