import React from "react";
import { Note } from "../types";

type Props = {
  note: Note | null;
  onChange: (partial: Partial<Note>) => void;
  isEmpty: boolean;
};

export const NoteEditor: React.FC<Props> = ({ note, onChange, isEmpty }) => {
  if (isEmpty || !note) {
    return (
      <section className="card editor">
        <h3 style={{ marginTop: 0 }}>Editor</h3>
        <div style={{ color: "#6b7280" }}>Select or create a note to start editing.</div>
      </section>
    );
  }

  return (
    <section className="card editor">
      <h3 style={{ marginTop: 0 }}>Editor</h3>
      <label>
        <div>Title</div>
        <input
          className="input"
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Note title"
        />
      </label>
      <label>
        <div>Content</div>
        <textarea
          className="textarea"
          value={note.content}
          onChange={(e) => onChange({ content: e.target.value })}
          placeholder="Write your note..."
        />
      </label>
      <label>
        <div>Slide Color</div>
        <input
          className="input"
          type="color"
          value={note.color || "#3b82f6"}
          onChange={(e) => onChange({ color: e.target.value })}
          title="Pick slide accent color"
        />
      </label>
    </section>
  );
};
