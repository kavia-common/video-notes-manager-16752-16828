import React from "react";
import { NavBar } from "../components/NavBar";
import { NotesSidebar } from "../components/NotesSidebar";
import { NoteEditor } from "../components/NoteEditor";
import { VideoPreview } from "../components/VideoPreview";
import { useNotes } from "../hooks/useNotes";
import { ThemeProvider } from "../theme/ThemeContext";
import "../styles/global.css";

/**
 * App:
 * Main application layout: top navigation bar, left notes list sidebar,
 * main area with note editor and video preview/player controls.
 */
const App: React.FC = () => {
  const {
    notes,
    selectedId,
    selectNote,
    addNote,
    updateNote,
    deleteNote,
    clearAll,
    exportVideo,
    isExporting,
    auth,
  } = useNotes();

  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;

  return (
    <ThemeProvider>
      <div className="app-root">
        <NavBar
          onAdd={() => addNote()}
          onExport={() => exportVideo()}
          exporting={isExporting}
          auth={auth}
        />
        <div className="app-content">
          <NotesSidebar
            notes={notes}
            selectedId={selectedId}
            onSelect={selectNote}
            onAdd={addNote}
            onDelete={deleteNote}
            onClearAll={clearAll}
          />
          <main className="main">
            <div className="editor-and-preview">
              <NoteEditor
                note={selectedNote}
                onChange={(partial) => {
                  if (selectedNote) {
                    updateNote(selectedNote.id, partial);
                  }
                }}
                isEmpty={!selectedNote}
              />
              <VideoPreview notes={notes} />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
