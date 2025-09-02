import React, { useEffect, useMemo, useState } from "react";
import { Note } from "../types";
import { PlayerControls } from "./PlayerControls";
import { useTheme } from "../theme/ThemeContext";
import { Player } from "@remotion/player";
import { NotesVideo } from "../video/NotesVideo";

type Props = {
  notes: Note[];
};

export const VideoPreview: React.FC<Props> = ({ notes }) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [notes.length]);

  const inputProps = useMemo(
    () => ({
      title: "My Notes Presentation",
      notes,
      theme,
      secondsPerNote: 4,
    }),
    [notes, theme]
  );

  return (
    <section className="preview">
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Video Preview</h3>
        <div className="preview-stage">
          <Player
            component={NotesVideo}
            inputProps={inputProps}
            durationInFrames={Math.max(1, notes.length) * 4 * 30}
            compositionWidth={1280}
            compositionHeight={720}
            fps={30}
            controls
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      <PlayerControls
        playing={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        currentIndex={index}
        onPrev={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(notes.length - 1, i + 1))}
        total={notes.length}
      />
    </section>
  );
};
