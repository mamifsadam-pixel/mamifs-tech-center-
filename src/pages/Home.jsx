import { Link } from 'react-router-dom';
import { programs } from '../data/programs.js';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-paper">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
          viewBox="0 0 800 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="trace-line" d="M0 60 H220 V180 H420" fill="none" stroke="#2EC4B6" strokeWidth="1.5" />
          <path className="trace-line" d="M800 400 H600 V260 H340" fill="none" stroke="#F5A623" strokeWidth="1.5" />
          <path className="trace-line" d="M100 500 V380 H300 V300" fill="none" stroke="#2EC4B6" strokeWidth="1.5" />
          <circle cx="420" cy="180" r="4" fill="#2EC4B6" />
          <circle cx="340" cy="260" r="4" fill="#F5A623" />
          <circle cx="300" cy="300" r="4" fill="#2EC4B6" />
        </svg>

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="badge-mono mb-4 text-xs uppercase tracking-[0.3em] text-amber">
            Computer Basics → Career-Ready Skills
          </p>
          <h1 className="max-w-2xl font-mono text-4xl font-semibold leading-tight md:text-6xl">
            Learn tech. Build futures.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            Mamifs Tech Center trains complete beginners into confident,
            job-ready practitioners across computer basics, development,
            networking, security, data, and design.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/programs"
              className="rounded-md bg-amber px-6 py-3 text-sm font-semibold uppercase tracking-widest text-navy transition-transform hover:-translate-y-0.5"
            >
              Explore Programs
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-paper/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-paper transition-colors hover:border-teal hover:text-teal"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Tracks</p>
            <h2 className="mt-2 text-3xl font-semibold text-navy">
              Seven tracks, {programs.reduce((s, p) => s + p.lessonCount, 0)} lessons
            </h2>
          </div>
          <Link to="/programs" className="badge-mono text-xs uppercase tracking-widest text-navy underline">
            View all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="group rounded-lg border border-navy/10 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <p className="badge-mono text-xs text-teal-deep">{String(p.lessonCount).padStart(2, '0')} lessons</p>
              <h3 className="mt-2 text-lg font-semibold text-navy">{p.name}</h3>
              <p className="mt-2 text-sm text-slate-ink/70">{p.tagline}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
