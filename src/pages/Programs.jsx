import { programs, additionalOfferings } from '../data/programs.js';

export default function Programs() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Programs</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">Find your track</h1>
      <p className="mt-4 max-w-2xl text-slate-ink/70">
        Every track is hands-on and project-based. Start from zero or jump in
        at your level — instructors place you after a short placement chat.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {programs.map((p, i) => (
          <div key={p.id} className="flex gap-5 rounded-lg border border-navy/10 bg-white p-6">
            <span className="badge-mono text-2xl text-amber">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h2 className="text-lg font-semibold text-navy">{p.name}</h2>
              <p className="mt-1 text-sm text-slate-ink/70">{p.tagline}</p>
              <p className="badge-mono mt-3 text-xs text-teal-deep">{p.lessonCount} lessons</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-navy/10 pt-10">
        <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Also offered</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {additionalOfferings.map((o) => (
            <div key={o.id} className="rounded-lg bg-navy/5 p-6">
              <h3 className="font-semibold text-navy">{o.name}</h3>
              <p className="mt-1 text-sm text-slate-ink/70">{o.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
