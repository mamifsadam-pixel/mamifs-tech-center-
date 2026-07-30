import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `badge-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive ? 'text-teal-deep' : 'text-slate-ink/70 hover:text-navy'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            className="rounded-md bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-navy-light"
          >
            Student / Staff Login
          </Link>
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0B1F3A" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-navy/10 px-6 py-4 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="badge-mono text-xs uppercase tracking-widest text-slate-ink/80"
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="rounded-md bg-navy px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-paper"
          >
            Student / Staff Login
          </Link>
        </div>
      )}
    </header>
  );
}
