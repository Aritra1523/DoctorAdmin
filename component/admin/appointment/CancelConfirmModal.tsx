"use client";

import { useEffect } from "react";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelConfirmModal({ open, onConfirm, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={styles.iconWrap}>⚠️</div>
        <h2 style={styles.title}>Cancel Appointment?</h2>
        <p style={styles.text}>You cannot undo this action.</p>
        <div style={styles.btns}>
          <button style={styles.noBtn}  onClick={onClose}>No, keep it</button>
          <button style={styles.yesBtn} onClick={onConfirm}>Yes, Cancel</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 999, backdropFilter: "blur(2px)",
  },
  box: {
    background: "#1e1e1e",
    border: "0.5px solid #2a2a2a",
    borderRadius: 14,
    padding: "28px",
    width: 320,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 60, height: 60, borderRadius: "50%",
    background: "#332006",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 28,
  },
  title: { fontSize: 16, fontWeight: 500, color: "#fff", margin: 0 },
  text:  { fontSize: 13, color: "#8a8a8a", margin: 0 },
  btns:  { display: "flex", gap: 10, marginTop: 8, width: "100%" },
  yesBtn: {
    flex: 1, padding: "9px 0", borderRadius: 8,
    background: "#e24b4a", color: "#fff", border: "none",
    fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif",
  },
  noBtn: {
    flex: 1, padding: "9px 0", borderRadius: 8,
    background: "#1a1a1a", color: "#c5c5c5", border: "0.5px solid #2a2a2a",
    fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif",
  },
};