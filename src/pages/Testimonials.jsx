import { testimonials } from '../data/testimonials.js';

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Testimonials</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">From our graduates</h1>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <blockquote key={i} className="rounded-lg border border-navy/10 bg-white p-6">
            <p className="text-slate-ink/80">"{t.quote}"</p>
            <footer className="badge-mono mt-4 text-xs uppercase tracking-widest text-navy">
              {t.name} — {t.program}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
