# Notes App Frontend (Remotion)

Responsive, light-themed notes manager that displays notes as dynamic video slides using Remotion.

## Features
- Add, edit, delete notes
- Dynamic video slides generated from notes
- Play and export as a video (CLI Node rendering)
- Responsive UI: Top nav (login/logout), sidebar for notes, main editor + video preview
- Color theme:
  - Primary: #3b82f6
  - Secondary: #6366f1
  - Accent: #f59e42

## Getting Started

Install dependencies:
```bash
npm i
```

Start Remotion Studio:
```bash
npm run dev
```

Open the app in the preview and start adding notes. Notes are stored in localStorage for now.

## Exporting a Video

This project prepares export via Remotion Node APIs. In CI/local Node:
```bash
npm run render
```
Or:
```bash
npx remotion render src/index.ts NotesVideo out/notes-video.mp4 --props='{"title":"My Notes Presentation"}'
```

Note: In the browser Studio, exporting triggers a message explaining to run the CLI.

## Backend Integration

API calls are mocked and persisted in localStorage. When the backend is ready, replace `src/api/notesApi.ts` with actual HTTP requests and wire auth in `src/api/auth.ts`.

## Code Structure

- src/app/App.tsx: Main layout and orchestration
- src/components/*: UI components
- src/hooks/useNotes.ts: Notes state, CRUD, export, auth mocks
- src/video/NotesVideo.tsx: Remotion composition rendering slides
- src/theme/ThemeContext.tsx: Theme colors
- src/styles/global.css: Global styles
- src/index.ts, src/Root.tsx: Remotion entry and composition registration
