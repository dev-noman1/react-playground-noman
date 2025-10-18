import React, { useEffect, useRef, useState } from "react";

export default function UseRef() {
  const videoRef = useRef(null);

  const [state, setState] = useState({
    isPlaying: false,
    volume: 0.5,
  });

  // sync volume when state.volume changes
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = state.volume;
  }, [state.volume]);

  // toggle play/pause
  const handleTogglePlay = async () => {
    if (!videoRef.current) return;
    if (state.isPlaying) {
      videoRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    } else {
      try {
        await videoRef.current.play();
        setState((prev) => ({ ...prev, isPlaying: true }));
      } catch (err) {
        console.warn("Play prevented:", err);
      }
    }
  };

  // handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setState((prev) => ({ ...prev, volume: newVolume }));
  };

  return (
    <div className="page">
      <h1>UseRef</h1>

      <button onClick={handleTogglePlay}>
        {state.isPlaying ? "Pause" : "Play"}
      </button>

      <div style={{ width: 300, marginTop: 12 }}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={state.volume}
          onChange={handleVolumeChange}
          aria-label="volume"
        />
        <div style={{ fontSize: 12 }}>{Math.round(state.volume * 100)}%</div>
      </div>

      <video
        ref={videoRef}
        onPlay={() => setState((prev) => ({ ...prev, isPlaying: true }))}
        onPause={() => setState((prev) => ({ ...prev, isPlaying: false }))}
        src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
        width="620"
        style={{ marginTop: 12 }}
      />
    </div>
  );
}
