import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { z } from "zod";
import { Note, Theme } from "../types";

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  color: z.string().optional(),
  updatedAt: z.number().optional(),
});

export const themeSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  background: z.string(),
  text: z.string(),
});

export const notesVideoSchema = z.object({
  title: z.string(),
  notes: z.array(noteSchema),
  theme: themeSchema,
  secondsPerNote: z.number().min(1).max(30),
});

type NotesVideoProps = z.infer<typeof notesVideoSchema>;

// PUBLIC_INTERFACE
export const NotesVideo: React.FC<NotesVideoProps> = ({
  title,
  notes,
  theme,
  secondsPerNote,
}) => {
  const { fps } = useVideoConfig();
  const durationPerNote = secondsPerNote * fps;
  const total = Math.max(1, notes.length);
  const totalFrames = total * durationPerNote;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      <AbsoluteFill>
        <TitleBar title={title} theme={theme} />
      </AbsoluteFill>
      {notes.map((n, i) => (
        <Sequence key={n.id} from={i * durationPerNote} durationInFrames={durationPerNote}>
          <Slide note={n} theme={theme} index={i} />
        </Sequence>
      ))}
      {/* If no notes, show a default empty slide */}
      {notes.length === 0 && (
        <Sequence from={0} durationInFrames={totalFrames}>
          <EmptySlide theme={theme} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};

const TitleBar: React.FC<{ title: string; theme: Theme }> = ({ title, theme }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 32,
        left: 64,
        right: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          }}
        />
        <div
          style={{
            fontWeight: 800,
            fontSize: 48,
            color: theme.text,
            textShadow: "0 2px 0 rgba(0,0,0,.05)",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: 20,
          padding: "6px 12px",
          borderRadius: 999,
          border: "2px solid rgba(0,0,0,.06)",
          color: theme.text,
          background: "#fff",
        }}
      >
        Video Notes
      </div>
    </div>
  );
};

const Slide: React.FC<{ note: Note; theme: Theme; index: number }> = ({ note, theme, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [0, 12], [40, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const accent = note.color || theme.primary;

  const pulse = Math.sin((frame / fps) * Math.PI) * 0.02;

  return (
    <AbsoluteFill
      style={{
        padding: "140px 120px 120px",
        transform: `translateY(${enter}px)`,
        opacity,
      }}
    >
      <div
        style={{
          borderRadius: 24,
          background: "#ffffff",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          height: "100%",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${accent}, ${theme.secondary})`,
            padding: "24px 28px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 40 }}>{note.title || "Untitled"}</div>
          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "6px 12px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            Slide {index + 1}
          </div>
        </div>
        <div style={{ padding: 28, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(600px 200px at 10% 10%, ${accent}22, transparent)`,
              transform: `scale(${1 + pulse})`,
              transition: "transform .2s",
            }}
          />
          <div
            style={{
              position: "relative",
              fontSize: 36,
              lineHeight: 1.4,
              color: theme.text,
              whiteSpace: "pre-wrap",
            }}
          >
            {note.content}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EmptySlide: React.FC<{ theme: Theme }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          padding: "24px 32px",
          borderRadius: 16,
          border: "2px dashed #e5e7eb",
          background: "#fff",
          color: theme.text,
          fontSize: 32,
        }}
      >
        No notes yet. Add notes to generate slides.
      </div>
    </AbsoluteFill>
  );
};
