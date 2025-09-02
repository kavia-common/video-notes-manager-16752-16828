import React from "react";

type Props = {
  playing: boolean;
  onTogglePlay: () => void;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  total: number;
};

export const PlayerControls: React.FC<Props> = ({
  playing, onTogglePlay, currentIndex, onPrev, onNext, total
}) => {
  return (
    <div className="player-controls card">
      <div className="pc-left">
        <button className="btn" onClick={onPrev} disabled={total <= 1}>⟨ Prev</button>
        <button className="btn" onClick={onTogglePlay}>{playing ? "Pause" : "Play"}</button>
        <button className="btn" onClick={onNext} disabled={total <= 1}>Next ⟩</button>
      </div>
      <div className="pc-right">
        <span className="tag">Slide {total === 0 ? 0 : currentIndex + 1} / {total}</span>
      </div>
    </div>
  );
};
