import { useRef, useState, useCallback, useEffect } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";

/* ─── Chapter data ─────────────────────────────────────────────────────────── */
const CHAPTERS = [
  { time: 0, label: "Launch Codegen" },
  { time: 7, label: "Open with Base URL" },
  { time: 14, label: "Recorded Registry & Tests" },
  { time: 19, label: "Record New Test" },
  { time: 21, label: "Record New Serial Test" },
  { time: 27, label: "Readable Registry Keys" },
  { time: 31, label: "Restart Recording" },
  { time: 35, label: "Resumed From Previous Session" },
] as const;

const FALLBACK_DURATION = 40;

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}

function labelX(idx: number, total: number): string {
  if (idx === 0) return "translateX(0%)";
  if (idx === total - 1) return "translateX(-100%)";
  return "translateX(-50%)";
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function CodegenVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FALLBACK_DURATION);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const captionTimer = useRef<ReturnType<typeof setTimeout>>();

  const activeIdx = CHAPTERS.reduce((acc, ch, i) => (currentTime >= ch.time ? i : acc), 0);
  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

  /* ── video events ── */
  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleTimeUpdate = useCallback(() => {
    if (!isDragging) setCurrentTime(videoRef.current?.currentTime ?? 0);
  }, [isDragging]);
  const handleLoadedMetadata = useCallback(() => {
    const d = videoRef.current?.duration;
    if (d && isFinite(d)) setDuration(d);
  }, []);

  /* ── play/pause ── */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => { }); else v.pause();
  }, []);

  /* ── seek ── */
  const seekToTime = useCallback((t: number) => {
    const clamped = Math.max(0, Math.min(t, duration));
    setCurrentTime(clamped);
    if (videoRef.current) videoRef.current.currentTime = clamped;
  }, [duration]);

  const timeFromX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    return (Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * duration;
  }, [duration]);

  /* ── drag on track ── */
  const onTrackMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    seekToTime(timeFromX(e.clientX));
  }, [seekToTime, timeFromX]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => seekToTime(timeFromX(e.clientX));
    const onUp = () => setIsDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, seekToTime, timeFromX]);

  /* ── space key (global, skip inputs) ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if ((e.target as HTMLElement).isContentEditable) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [togglePlay]);

  /* ── fullscreen ── */
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen().catch(() => { });
    else document.exitFullscreen();
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* ── Chapter caption (show briefly on chapter change) ── */
  useEffect(() => {
    setShowCaption(true);
    clearTimeout(captionTimer.current);
    captionTimer.current = setTimeout(() => setShowCaption(false), 2500);
    return () => clearTimeout(captionTimer.current);
  }, [activeIdx]);

  return (
    <div
      ref={containerRef}
      style={{ borderRadius: isFullscreen ? 0 : "0 0 12px 12px", overflow: "clip", display: "flex", flexDirection: "column" }}
    >
      {/* ── Video wrapped in relative container for caption overlay ─── */}
      <div className="relative" style={{ flex: isFullscreen ? "1" : undefined, minHeight: isFullscreen ? 0 : undefined }}>
        <video
          ref={videoRef}
          src="/codegen.mp4"
          className="w-full block"
          style={{ cursor: "pointer", background: "#000", display: "block" }}
          autoPlay loop muted playsInline
          onClick={togglePlay}
          onPlay={handlePlay} onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Chapter caption overlay */}
        <div
          className="absolute left-1/2 pointer-events-none"
          style={{
            bottom: "16px",
            transform: showCaption
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(8px)",
            opacity: showCaption ? 1 : 0,
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl"
            style={{
              background: "rgba(0,0,0,0.78)",
              border: "1px solid rgba(245,158,11,0.22)",
              backdropFilter: "blur(10px)",
            }}
          >
            <span
              className="shrink-0 rounded-full"
              style={{ width: "7px", height: "7px", background: "#f59e0b", boxShadow: "0 0 7px rgba(245,158,11,1)" }}
            />
            <span
              className="font-sans text-white leading-none whitespace-nowrap"
              style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.01em" }}
            >
              {CHAPTERS[activeIdx].label}
            </span>
          </div>
        </div>
      </div>

      {/* ── Controls panel ─────────────────────────────────────────────── */}
      <div style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>

        {/* Row: play · time · spacer · fullscreen */}
        <div className="flex items-center gap-2.5 px-3 pt-2 pb-1.5">
          <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}
            className="text-slate-400 hover:text-amber-400 transition-colors duration-150 shrink-0">
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <span className="text-[9px] font-mono tabular-nums text-slate-500 shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="flex-1" />
          <button onClick={toggleFullscreen} aria-label="Toggle fullscreen"
            className="text-slate-500 hover:text-slate-300 transition-colors duration-150 shrink-0">
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* ── Unified seek bar with chapter markers ─────────────────────── */}
        <div className="px-3 pb-3 select-none">

          {/* Track (click / drag to seek) */}
          <div
            ref={trackRef}
            className="relative cursor-pointer"
            style={{ height: "18px", display: "flex", alignItems: "center" }}
            onMouseDown={onTrackMouseDown}
          >
            {/* Background track */}
            <div className="absolute inset-x-0 rounded-full"
              style={{ height: "2px", background: "rgba(255,255,255,0.07)", top: "50%", transform: "translateY(-50%)" }} />
            {/* Filled track */}
            <div className="absolute left-0 rounded-full"
              style={{ height: "2px", width: `${pct}%`, background: "#f59e0b", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />

            {/* Chapter markers ON the track */}
            {CHAPTERS.map((ch, i) => {
              const chPct = (ch.time / duration) * 100;
              const isActive = i === activeIdx;
              const isPassed = currentTime > ch.time;
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{ left: `${chPct}%`, top: "50%", transform: "translateX(-50%) translateY(-50%)", zIndex: 2 }}
                  onMouseEnter={(e) => { e.stopPropagation(); setHoveredChapter(i); }}
                  onMouseLeave={() => setHoveredChapter(null)}
                  onMouseDown={(e) => { e.stopPropagation(); seekToTime(ch.time); }}
                >
                  {/* Hover tooltip */}
                  {hoveredChapter === i && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none" style={{ zIndex: 20 }}>
                      <span className="block whitespace-nowrap font-sans rounded px-1.5 py-0.5 text-slate-200"
                        style={{ fontSize: "8px", background: "rgba(0,0,0,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {ch.label}
                      </span>
                    </div>
                  )}
                  {/* Chapter dot */}
                  <span className="block rounded-full" style={{
                    width: isActive ? "9px" : "6px",
                    height: isActive ? "9px" : "6px",
                    background: (isActive || isPassed) ? "#f59e0b" : "rgba(71,85,105,0.55)",
                    boxShadow: isActive ? "0 0 8px rgba(245,158,11,0.7)" : "none",
                    transition: "all 0.15s ease",
                  }} />
                </div>
              );
            })}

            {/* Seek thumb — drawn last so it sits on top */}
            <div className="absolute rounded-full pointer-events-none" style={{
              left: `${pct}%`, top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              width: "12px", height: "12px",
              background: "#f59e0b",
              boxShadow: "0 0 8px rgba(245,158,11,0.65)",
              zIndex: 3,
            }} />
          </div>

          {/* Active chapter label — slides to the active dot position, no overlap */}
          <div className="relative" style={{ height: "13px", marginTop: "4px" }}>
            <button
              onClick={() => seekToTime(CHAPTERS[activeIdx].time)}
              className="absolute focus:outline-none"
              style={{
                left: `${(CHAPTERS[activeIdx].time / duration) * 100}%`,
                transform: labelX(activeIdx, CHAPTERS.length),
                transition: "left 0.3s ease",
              }}
            >
              <span
                className="block font-sans leading-none whitespace-nowrap"
                style={{ fontSize: "8.5px", color: "#f59e0b", letterSpacing: "0.02em" }}
              >
                {CHAPTERS[activeIdx].label}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
