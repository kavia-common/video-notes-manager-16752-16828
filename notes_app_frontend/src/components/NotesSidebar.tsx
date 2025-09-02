import React from "react";
import { Note } from "../types";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export const NotesSidebar: React.FC<Props> = ({
  notes,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
  onClearAll,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3 style={{ margin: 0 }}>Notes</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={onAdd}>+ Add</button>
          <button className="btn" onClick={onClearAll} disabled={notes.length === 0}>Clear</button>
        </div>
      </div>
      <div className="notes-list">
        {notes.map((n) => (
          <div
            key={n.id}
            className={`note-item ${selectedId === n.id ? "active" : ""}`}
            onClick={() => onSelect(n.id)}
          >
            <div className="note-title-row">
              <span className="color-dot" style={{ background: n.color || "#94a3b8" }} />
              <strong style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {n.title || "Untitled"}
              </strong>
            </div>
            <div className="note-actions" onClick={(e) => e.stopPropagation()}>
              <button className="btn" onClick={() => onDelete(n.id)} title="Delete">🗑️</button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <div className="card">No notes yet. Click + Add to create one.</div>}
      </div>
    </aside>
  );
};
