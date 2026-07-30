import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-navy text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <Logo withWordmark={false} className="h-9 w-auto" />
        <p className="badge-mono text-xs text-paper/60">
          © {new Date().getFullYear()} MAMIFS TECH CENTER — LEARN TECH, BUILD FUTURES
        </p>
      </div>
    </footer>
  );
}
