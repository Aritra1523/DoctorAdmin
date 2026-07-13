"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Oswald, IBM_Plex_Mono } from "next/font/google";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-utility",
});

// ───────────────────────── Data ─────────────────────────

type Dept = { code: string; name: string; color: string; blurb: string };

const DEPARTMENTS: Dept[] = [
  { code: "01", name: "Cardiology", color: "#ff6259", blurb: "Heart, blood pressure, and circulation." },
  { code: "02", name: "Neurology", color: "#9b83f5", blurb: "Headaches, seizures, and nerve care." },
  { code: "03", name: "Orthopedics", color: "#4fc3d9", blurb: "Bones, joints, sprains, and fractures." },
  { code: "04", name: "Pediatrics", color: "#f7c343", blurb: "Care built for infants and children." },
  { code: "05", name: "ENT", color: "#ee7fb5", blurb: "Ear, nose, and throat concerns." },
  { code: "06", name: "General Medicine", color: "#7ed08a", blurb: "Fevers, colds, and everyday checkups." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Say what's wrong", body: "Search by symptom, department, or doctor's name — whichever you know." },
  { step: "02", title: "Pick a doctor", body: "Compare department, availability, and see who's free this week." },
  { step: "03", title: "Confirm your slot", body: "Choose a time, confirm, and get a slip with everything you need." },
];

const DOCTORS = [
  { name: "Dr. A. Sen", dept: "Cardiology", color: "#ff6259" },
  { name: "Dr. R. Kapoor", dept: "Neurology", color: "#9b83f5" },
  { name: "Dr. M. Iyer", dept: "Pediatrics", color: "#f7c343" },
];

// Free, rule-based symptom → department matcher (no API, no cost)
const SYMPTOM_MAP: Record<string, string[]> = {
  Cardiology: ["chest pain", "heart", "palpitation", "high blood pressure", "shortness of breath", "chest tightness"],
  Neurology: ["headache", "migraine", "seizure", "numbness", "dizziness", "vertigo", "fainting"],
  Orthopedics: ["joint pain", "back pain", "fracture", "bone", "sprain", "knee pain", "shoulder pain"],
  Pediatrics: ["child fever", "infant", "baby", "child cough", "vaccination"],
  ENT: ["ear pain", "throat pain", "sore throat", "hearing loss", "sinus", "nose bleed"],
  "General Medicine": ["fever", "fatigue", "weakness", "body ache", "cold", "flu"],
};

function suggestDepartment(input: string) {
  const text = input.toLowerCase().trim();
  if (!text) return null;
  let best: { specialty: string; score: number; matched: string[] } | null = null;
  for (const [specialty, keywords] of Object.entries(SYMPTOM_MAP)) {
    const matched = keywords.filter((kw) => text.includes(kw));
    if (matched.length === 0) continue;
    const score = matched.reduce((s, kw) => s + kw.split(" ").length, 0);
    if (!best || score > best.score) best = { specialty, score, matched };
  }
  return best;
}

// ───────────────────────── 3D tilt card ─────────────────────────

function TiltCard({
  children,
  className = "",
  style = {},
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 14;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlowPos({ x: px * 100, y: py * 100 });
  };

  const reset = () => setTransform("rotateX(0deg) rotateY(0deg)");

  return (
    <div style={{ perspective: 900 }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
        style={{ transform, transformStyle: "preserve-3d", ...style }}
      >
        {children}
        {glow && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glow}22, transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ───────────────────────── Page ─────────────────────────

export default function LandingClient() {
  const [symptom, setSymptom] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const match = useMemo(() => (symptom.trim() ? suggestDepartment(symptom) : null), [symptom]);
  const activeDept = useMemo(
    () => (match ? DEPARTMENTS.find((d) => d.name.toLowerCase() === match.specialty.toLowerCase()) ?? null : null),
    [match]
  );

  return (
    <div
      className={`${display.variable} ${mono.variable} min-h-screen overflow-x-hidden bg-[#0b0f14] text-[#f4f2ec]`}
      style={{ fontFamily: "var(--font-utility), monospace" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0b0f14]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg tracking-[0.08em]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            MediSlot<span className="text-[#4fc3d9]">BOOK</span>
          </span>

          <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.12em] text-white/50 md:flex">
            <a href="#departments" className="transition-colors hover:text-white">Departments</a>
            <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
            <a href="#doctors" className="transition-colors hover:text-white">Doctors</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/auth/login" className="text-[13px] uppercase tracking-[0.1em] text-white/50 transition-colors hover:text-white">
              LOGIN
            </Link>
            <a href="#book" className="group inline-flex items-center gap-2 rounded-md bg-[#f4f2ec] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0b0f14] transition-colors hover:bg-[#4fc3d9]">
              Book now
              <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={menuOpen} className="flex flex-col gap-1.5 md:hidden">
            <span className="h-[1.5px] w-6 bg-[#f4f2ec]" />
            <span className="h-[1.5px] w-6 bg-[#f4f2ec]" />
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-1 border-t border-white/[0.06] px-6 py-4 text-sm uppercase tracking-[0.1em] text-white/60 md:hidden">
            <a href="#departments" onClick={() => setMenuOpen(false)} className="py-2">Departments</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="py-2">How it works</a>
            <a href="#doctors" onClick={() => setMenuOpen(false)} className="py-2">Doctors</a>
            <Link href="/auth/login" className="py-2">Staff sign in</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#4fc3d9]/[0.08] blur-3xl" />

        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="relative z-10 animate-[fadeUp_0.6s_ease-out]">
            <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-[#7ed08a]">— Patient portal</p>
            <h1 className="text-[13vw] leading-[0.95] tracking-tight md:text-[3.6rem]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              FIND YOUR
              <br />
              DOCTOR.
              <br />
              <span className="text-[#4fc3d9]">BOOK TODAY.</span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
              One directory for every department in the building. Tell us what's going on and we'll point you to the right door.
            </p>

            <div className="mt-8 rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
              <label htmlFor="symptom" className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-white/40">
                Not sure who to see? Describe it here.
              </label>
              <input
                id="symptom"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="e.g. sore throat and ear pain"
                className="w-full border-b border-white/10 bg-transparent pb-2 text-[15px] text-[#f4f2ec] outline-none placeholder:text-white/25 focus:border-[#4fc3d9]"
              />
              <p className="mt-3 min-h-[1.25rem] text-[12px] text-white/50">
                {activeDept ? (
                  <>
                    Suggested:{" "}
                    <span className="font-semibold" style={{ color: activeDept.color }}>
                      {activeDept.name.toUpperCase()}
                    </span>{" "}
                    — see it on the right, or{" "}
                    <a href="#book" className="underline underline-offset-2">book with this department</a>.
                  </>
                ) : symptom.trim() ? (
                  "No direct match yet — keep typing, or browse departments on the right."
                ) : (
                  "Runs instantly on your device — nothing is sent anywhere."
                )}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <a href="#book" className="group inline-flex items-center gap-2 rounded-md bg-[#f4f2ec] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0b0f14] transition-colors hover:bg-[#4fc3d9]">
                Book an appointment
                <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[#7ed08a]">
                <span className="h-1.5 w-1.5 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#7ed08a]" />
                Live availability
              </span>
            </div>
          </div>

          {/* 3D stacked card deck — signature visual */}
          <div className="relative z-10 flex h-[380px] items-center justify-center md:h-[440px]" style={{ perspective: 1400 }}>
            <div className="relative h-[300px] w-[240px]" style={{ transformStyle: "preserve-3d" }}>
              {DEPARTMENTS.slice(0, 3).map((dept, i) => (
                <div
                  key={dept.code}
                  className="absolute inset-0 rounded-xl border border-white/10 bg-[#12171f] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                  style={{
                    transform: `translateZ(${-i * 50}px) translateY(${i * 26}px) translateX(${i * 18}px) rotateZ(${i * 3}deg)`,
                    animation: `float${i} 6s ease-in-out infinite`,
                  }}
                >
                  <span className="text-[11px]" style={{ fontFamily: "var(--font-utility)", color: dept.color }}>
                    DEPT {dept.code}
                  </span>
                  <p className="mt-3 text-[19px] leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                    {dept.name}
                  </p>
                  <p className="mt-2 text-[12.5px] text-white/45">{dept.blurb}</p>
                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-white/40">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: dept.color }} />
                    Open today
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments — 3D tilt grid */}
      <section id="departments" className="border-t border-white/[0.06] bg-[#0d1218]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-[26px] tracking-tight md:text-[32px]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              SIX DEPARTMENTS. ONE SEARCH.
            </h2>
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-white/35 md:block">Hover a card</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept) => (
              <TiltCard key={dept.code} glow={dept.color} className="rounded-xl">
                <a
                  href="#book"
                  className="block rounded-xl border border-white/10 bg-[#141a22] p-6 transition-colors hover:border-white/20"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px]" style={{ fontFamily: "var(--font-utility)", color: dept.color }}>
                      {dept.code}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                  </div>
                  <p className="mt-4 text-[19px]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                    {dept.name.toUpperCase()}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/45">{dept.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.1em] text-white/50">
                    Book here <Arrow className="h-3 w-3" />
                  </span>
                </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-12 text-[26px] tracking-tight md:text-[32px]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            THREE STEPS. NO WAITING ROOM SURPRISES.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step}>
                <span className="text-[13px] text-[#4fc3d9]" style={{ fontFamily: "var(--font-utility)" }}>{item.step}</span>
                <h3 className="mt-3 text-[19px]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/50">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor spotlight — 3D tilt */}
      <section id="doctors" className="border-t border-white/[0.06] bg-[#0d1218]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 text-[26px] tracking-tight md:text-[32px]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            ON CALL THIS WEEK
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {DOCTORS.map((doc) => (
              <TiltCard key={doc.name} glow={doc.color} className="rounded-xl">
                <div className="rounded-xl border border-white/10 bg-[#141a22] p-6 text-center" style={{ transform: "translateZ(20px)" }}>
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-[15px] font-semibold"
                    style={{ backgroundColor: `${doc.color}22`, color: doc.color }}
                  >
                    {doc.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <p className="mt-4 text-[16px]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{doc.name}</p>
                  <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-white/40">{doc.dept}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
          {[
            { label: "One search", body: "Symptom, doctor, or department — start wherever you know most." },
            { label: "Real slots", body: "See a doctor's actual open times before you commit to anything." },
            { label: "No back and forth", body: "Confirm a time once. No phone tag, no waiting on a callback." },
          ].map((f) => (
            <div key={f.label} className="border-l border-white/[0.08] pl-5">
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/40">{f.label}</span>
              <p className="mt-2 text-[14px] leading-relaxed text-white/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="border-t border-white/[0.06] bg-[#141a22]">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-[28px] tracking-tight md:text-[38px]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            READY TO SEE A SPECIALIST?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] text-white/50">
            Appointments are managed by our front desk team. Reach out and we'll get you on the right doctor's schedule.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="tel:+10000000000" className="group inline-flex items-center gap-2 rounded-md bg-[#f4f2ec] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0b0f14] transition-colors hover:bg-[#4fc3d9]">
              Call the front desk
              <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link href="/auth/login" className="text-[13px] uppercase tracking-[0.1em] text-white/50 transition-colors hover:text-white">
              LOGIN →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    {/* Footer */}
<footer className="border-t border-white/[0.06] bg-[#0d1218]">
  <div className="mx-auto max-w-6xl px-6 py-12">
    {/* Main Footer Grid */}
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {/* Brand */}
      <div className="col-span-2 md:col-span-1">
        <span className="text-lg tracking-[0.08em]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
          MediSlot<span className="text-[#4fc3d9]">BOOK</span>
        </span>
        <p className="mt-3 text-[13px] leading-relaxed text-white/40 max-w-[200px]">
          Book appointments across six departments. One directory, zero hassle.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="#" className="text-white/30 transition-colors hover:text-[#4fc3d9]" aria-label="Twitter">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
          </a>
          <a href="#" className="text-white/30 transition-colors hover:text-[#4fc3d9]" aria-label="LinkedIn">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" className="text-white/30 transition-colors hover:text-[#4fc3d9]" aria-label="YouTube">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">Quick Links</h4>
        <ul className="mt-4 space-y-2.5">
          <li>
            <a href="#departments" className="text-[13px] text-white/40 transition-colors hover:text-white">
              Departments
            </a>
          </li>
          <li>
            <a href="#doctors" className="text-[13px] text-white/40 transition-colors hover:text-white">
              Our Doctors
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="text-[13px] text-white/40 transition-colors hover:text-white">
              How It Works
            </a>
          </li>
          <li>
            <a href="#book" className="text-[13px] text-white/40 transition-colors hover:text-white">
              Book Appointment
            </a>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">Support</h4>
        <ul className="mt-4 space-y-2.5">
          <li>
            <a href="#" className="text-[13px] text-white/40 transition-colors hover:text-white">
              FAQ
            </a>
          </li>
          <li>
            <a href="#" className="text-[13px] text-white/40 transition-colors hover:text-white">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="text-[13px] text-white/40 transition-colors hover:text-white">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-[13px] text-white/40 transition-colors hover:text-white">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">Contact</h4>
        <ul className="mt-4 space-y-2.5">
          <li className="flex items-start gap-2 text-[13px] text-white/40">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>123 Medical Plaza,<br />Healthcare City</span>
          </li>
          <li className="flex items-center gap-2 text-[13px] text-white/40">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:+10000000000" className="hover:text-white">+1 (000) 000-0000</a>
          </li>
          <li className="flex items-center gap-2 text-[13px] text-white/40">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:info@doctoradmin.com" className="hover:text-white">info@doctoradmin.com</a>
          </li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="my-8 border-t border-white/[0.06]" />

    {/* Bottom Bar */}
    <div className="flex flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-[0.1em] text-white/30 sm:flex-row">
      <div className="flex flex-wrap items-center gap-3">
        <span>© {new Date().getFullYear()} MediSlotBook</span>
        <span className="hidden h-3 w-px bg-white/10 sm:block" />
        <span>All rights reserved</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span>Six departments, one directory.</span>
        <span className="hidden h-3 w-px bg-white/10 sm:block" />
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7ed08a]" />
          <span className="text-white/20">v2.0</span>
        </span>
      </div>
    </div>
  </div>
</footer>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float0 {
          0%, 100% { transform: translateZ(0px) translateY(0px) translateX(0px) rotateZ(0deg); }
          50% { transform: translateZ(0px) translateY(-8px) translateX(0px) rotateZ(0deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateZ(-50px) translateY(26px) translateX(18px) rotateZ(3deg); }
          50% { transform: translateZ(-50px) translateY(18px) translateX(18px) rotateZ(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateZ(-100px) translateY(52px) translateX(36px) rotateZ(6deg); }
          50% { transform: translateZ(-100px) translateY(44px) translateX(36px) rotateZ(6deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}