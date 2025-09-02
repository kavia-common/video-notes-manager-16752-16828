import { useCallback, useEffect, useMemo, useState } from "react";
import { Note, AuthInfo, Theme } from "../types";
import { fetchNotes, saveNotes } from "../api/notesApi";
import { getAuth, loginMock, logoutMock } from "../api/auth";

// Theme used in app and passed to composition
export const defaultTheme: Theme = {
  primary: "#3b82f6",
  secondary: "#6366f1",
  accent: "#f59e42",
  background: "#ffffff",
  text: "#0f172a",
};

type UseNotes = {
  notes: Note[];
  selectedId: string | null;
  selectNote: (id: string) => void;
  addNote: () => void;
  updateNote: (id: string, data: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  clearAll: () => void;
  exportVideo: () => Promise<void>;
  isExporting: boolean;
  auth: {
    info: AuthInfo;
    login: (name: string) => void;
    logout: () => void;
  };
};

const safeRandomId = () => {
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const c: any = g?.crypto;
  if (c && typeof c.randomUUID === "function") {
    return c.randomUUID();
  }
  return `note_${Math.random().toString(36).slice(2)}_${Date.now()}`;
};

const newNoteTemplate = (): Note => ({
  id: safeRandomId(),
  title: "New note",
  content: "Write your content here...",
  color: defaultTheme.primary,
  updatedAt: Date.now(),
});

/**
 * useNotes:
 * Manages notes CRUD, selection, mock auth, and export flow placeholder.
 */
export function useNotes(): UseNotes {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>(getAuth());

  useEffect(() => {
    (async () => {
      const data = await fetchNotes();
      setNotes(data);
      if (data.length > 0) setSelectedId(data[0].id);
    })();
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const selectNote = useCallback((id: string) => setSelectedId(id), []);

  const addNote = useCallback(() => {
    const note = newNoteTemplate();
    setNotes((prev) => [note, ...prev]);
    setSelectedId(note.id);
  }, []);

  const updateNote = useCallback((id: string, data: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...data, updatedAt: Date.now() } : n))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const clearAll = useCallback(() => {
    setNotes([]);
    setSelectedId(null);
  }, []);

  const login = useCallback((name: string) => {
    setAuthInfo(loginMock(name));
  }, []);
  const logout = useCallback(() => {
    setAuthInfo(logoutMock());
  }, []);

  // Prepare props for composition if needed elsewhere
  useMemo(
    () => ({
      title: "My Notes Presentation",
      notes,
      theme: defaultTheme,
      secondsPerNote: 4,
    }),
    [notes]
  );

  const exportVideo = useCallback(async () => {
    // Placeholder: In browser Studio, instruct to use CLI rendering.
    setIsExporting(true);
    try {
      const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
      const win: any = g?.window;
      if (win && typeof win.alert === "function") {
        win.alert(
          "To export, run: npx remotion render src/index.ts NotesVideo out/notes-video.mp4"
        );
      }
    } finally {
      setIsExporting(false);
    }
  }, []);

  return {
    notes,
    selectedId,
    selectNote,
    addNote,
    updateNote,
    deleteNote,
    clearAll,
    exportVideo,
    isExporting,
    auth: {
      info: authInfo,
      login,
      logout,
    },
  };
}
