"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

// ── Icons (inline SVGs) ───────────────────────────────
const icons = {
  dashboard: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  appointments: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="1" />
      <circle cx="16" cy="15" r="1" />
      <circle cx="8" cy="15" r="1" />
    </svg>
  ),
  doctors: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  departments: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  settings: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  logout: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

// ── Nav config with icons ──────────────────────────────
const NAV: NavSection[] = [
  {
    section: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/dashbord", icon: icons.dashboard },
      {
        label: "Appointments",
        href: "/appointments",
        icon: icons.appointments,
        badge: 12,
      },
    ],
  },
  {
    section: "PEOPLE",
    items: [
      { label: "Doctors", href: "/doctors", icon: icons.doctors },
      { label: "Departments", href: "/deperatments", icon: icons.departments },
    ],
  },
  {
    section: "SYSTEM",
    items: [{ label: "Settings", href: "/settings", icon: icons.settings }],
  },
];

// ── Sidebar ────────────────────────────────────────────
const Sidebar = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <aside style={styles.sidebar}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🏥</span>
          <span style={styles.logoText}>MediAdmin</span>
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          {NAV.map(({ section, items }) => (
            <div key={section} style={styles.section}>
              <p style={styles.sectionLabel}>{section}</p>

              {items.map(({ label, href, icon, badge }) => {
                const active = isActive(href);
                const isHovered = hovered === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      ...styles.navItem,
                      ...(active ? styles.navItemActive : {}),
                      ...(isHovered && !active ? styles.navItemHover : {}),
                    }}
                    onMouseEnter={() => setHovered(href)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span style={styles.navIconWrapper}>
                      <span
                        style={active ? styles.navIconActive : styles.navIcon}
                      >
                        {icon}
                      </span>
                      <span
                        style={active ? styles.navLabelActive : styles.navLabel}
                      >
                        {label}
                      </span>
                    </span>

                    {badge !== undefined && (
                      <span style={styles.badge}>{badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Profile (bottom) */}
        <div style={styles.userProfile}>
          <div style={styles.avatar}>
            <span style={styles.avatarText}>JD</span>
          </div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>John Doe</p>
            <p style={styles.userRole}>Admin</p>
          </div>
        </div>
        <button
          onClick={() => {
            /* handle logout */
          }}
          style={styles.logoutBtn}
          title="Logout"
        >
          {icons.logout}
        </button>
      </aside>

      {/* Global styles for keyframes and hover effects */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sidebar-item {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-item:hover {
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 8px 25px -5px rgba(0,0,0,0.5);
        }
      `}</style>
    </>
  );
};

// ── Styles ─────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 260,
    minWidth: 260,
    minHeight: "100vh",
    backgroundColor: "#0b0b0f",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
    boxShadow:
      "4px 0 30px rgba(0,0,0,0.6), inset -1px 0 0 rgba(255,255,255,0.03)",
    backdropFilter: "blur(4px)",
  },

  // Logo
  logo: {
    padding: "24px 20px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    fontSize: 24,
    lineHeight: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },

  // Nav
  nav: {
    padding: "20px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#4b5563",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    padding: "0 8px",
    margin: "0 0 8px",
  },

  // Nav item
  navItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderRadius: 10,
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    background: "transparent",
    border: "none",
    // will be enhanced by hover classes
  },
  navItemActive: {
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(37,99,235,0.15))",
    boxShadow:
      "0 4px 15px -3px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
    border: "1px solid rgba(59,130,246,0.2)",
    transform: "translateY(-1px)",
  },
  navItemHover: {
    background: "rgba(255,255,255,0.04)",
    transform: "translateY(-1px) scale(1.01)",
    boxShadow: "0 8px 25px -5px rgba(0,0,0,0.5)",
  },

  navIconWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  navIcon: {
    display: "inline-flex",
    color: "#6b7280",
    transition: "color 0.2s",
  },
  navIconActive: {
    display: "inline-flex",
    color: "#60a5fa",
    filter: "drop-shadow(0 0 6px rgba(59,130,246,0.4))",
  },
  navLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: "#9ca3af",
    transition: "color 0.2s",
  },
  navLabelActive: {
    fontSize: 14,
    fontWeight: 500,
    color: "#ffffff",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },

  // Badge
  badge: {
    backgroundColor: "#ef4444",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 6px",
    boxShadow: "0 2px 8px rgba(239,68,68,0.4)",
    transform: "scale(1)",
    transition: "transform 0.2s",
  },

  // User profile
  userProfile: {
    marginTop: "auto",
    padding: "16px 20px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(4px)",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
    flexShrink: 0,
  },
  avatarText: {
    lineHeight: 1,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  userName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    color: "#f3f4f6",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  userRole: {
    margin: 0,
    fontSize: 12,
    color: "#6b7280",
  },
  logoutBtn: {
  marginLeft: "auto",
  background: "transparent",
  border: "none",
  color: "#6b7280",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "8px",
  transition: "background 0.2s, color 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},
};

export default Sidebar;
