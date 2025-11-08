# Tactical Ops - Kanban Board

A sleek, tactical-themed Kanban board project management app built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

✓ **Kanban Board** - Full drag-and-drop task management
- Default columns: To-Do, In Progress, Completed
- Drag cards between any columns
- Visual feedback while dragging (glowing border effect)
- Add custom columns on the fly
- Delete custom columns
- Smooth animations during card moves

✓ **Task Management**
- Create cards with title, description, and notes
- Edit existing cards
- Delete cards
- Collapse/expand notes section

✓ **Tactical Ops Theme**
- Dark mode with orange accents
- Monospace typography
- Smooth animations with Framer Motion
- Professional UI inspired by military command systems

✓ **Local Storage**
- All data persists in browser's localStorage
- Auto-save on every change
- No backend required

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v3** - Styling
- **Framer Motion** - Smooth animations
- **LocalStorage API** - Data persistence

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── KanbanBoard.tsx      # Main board component
│   ├── Column.tsx           # Column component
│   └── Card.tsx             # Task card component
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   └── localStorage.ts      # State management utilities
├── tailwind.config.ts       # Tailwind configuration
└── package.json
```

## Usage

### Dragging Cards
Simply click and drag any card to move it between columns. As you drag:
- The card becomes semi-transparent
- The destination column highlights in orange
- Drop the card to complete the move
- The card animates smoothly to its new position

### Adding Cards
Click **+ Add Card** in any column to create a new task. Fill in the title, description (optional), and notes (optional).

### Editing Cards
Click the **✎** button on a card to edit its content. Changes are saved when you click **Save**. (Note: Cards cannot be dragged while in edit mode)

### Deleting Cards
Click the **✕** button on a card to remove it.

### Adding Columns
Click **+ Add Column** at the end of the board to create a new column. Name it and it will appear immediately.

### Deleting Columns
Default columns (To-Do, In Progress, Completed) cannot be deleted. Custom columns can be deleted using the **✕** button in the column header.

## Color Scheme

- **Dark**: `#0a0e27` - Main background
- **Dark Alt**: `#141829` - Secondary background
- **Border**: `#1a1f3a` - Borders
- **Orange**: `#ff6b35` - Primary accent
- **Orange Light**: `#ff8c42` - Hover state
- **Text**: `#e0e0e0` - Primary text
- **Text Secondary**: `#a0a0a0` - Secondary text

## Animations

- Cards fade in/out smoothly
- Columns animate on add/remove
- Buttons have hover transitions
- Form inputs highlight on focus
- Custom column addition has scale animation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

- Card labels and priorities
- Due dates and reminders
- Search functionality
- Dark/light theme toggle
- Export board as JSON
- Keyboard shortcuts
- Undo/redo functionality
- Card templates

## License

MIT
