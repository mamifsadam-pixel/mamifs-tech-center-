import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
      <p className="badge-mono text-6xl text-amber">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-navy">Page not found</h1>
      <p className="mt-2 text-slate-ink/70">The page you're looking for doesn't exist.</p>
      <Link to="/" className="badge-mono mt-6 text-xs uppercase tracking-widest text-navy underline">
        Back home
      </Link>
    </section>
  );
}
