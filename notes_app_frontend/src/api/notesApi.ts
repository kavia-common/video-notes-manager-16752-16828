import { Note } from "../types";

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  /** Fetch notes from backend - mocked for now. */
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const ls = g?.localStorage;
  if (!ls) return [];
  const raw = ls.getItem("notes-app-notes");
  if (raw) {
    try {
      return JSON.parse(raw) as Note[];
    } catch {
      return [];
    }
  }
  return [];
}

// PUBLIC_INTERFACE
export async function saveNotes(notes: Note[]): Promise<void> {
  /** Persist notes to storage; replace with backend POST/PUT in future. */
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const ls = g?.localStorage;
  if (!ls) return;
  ls.setItem("notes-app-notes", JSON.stringify(notes));
}
