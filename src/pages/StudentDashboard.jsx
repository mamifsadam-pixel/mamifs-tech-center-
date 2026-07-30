import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import { programs } from '../data/programs.js';

export default function StudentDashboard() {
  const { student, studentLogout } = useAuth();
  const [progress, setProgress] = useState({}); // { [programId]: completedLessons }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      const ref = doc(db, 'progress', student.id);
      const snap = await getDoc(ref);
      setProgress(snap.exists() ? snap.data() : {});
      setLoading(false);
    }
    loadProgress();
  }, [student.id]);

  async function markLessonComplete(programId) {
    const current = progress[programId] || 0;
    const program = programs.find((p) => p.id === programId);
    const next = Math.min(current + 1, program.lessonCount);
    const updated = { ...progress, [programId]: next };
    setProgress(updated);
    await setDoc(doc(db, 'progress', student.id), updated, { merge: true });
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Student Portal</p>
          <h1 className="mt-2 text-3xl font-semibold text-navy">Welcome, {student.name || student.studentId}</h1>
        </div>
        <button
          onClick={studentLogout}
          className="badge-mono text-xs uppercase tracking-widest text-navy underline"
        >
          Sign out
        </button>
      </div>

      {loading ? (
        <p className="badge-mono mt-10 text-sm text-slate-ink/60">Loading progress…</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {programs.map((p) => {
            const done = progress[p.id] || 0;
            const pct = Math.round((done / p.lessonCount) * 100);
            return (
              <div key={p.id} className="rounded-lg border border-navy/10 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-navy">{p.name}</h2>
                  <span className="badge-mono text-xs text-teal-deep">{done}/{p.lessonCount}</span>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-navy/10">
                  <div
                    className="h-2 rounded-full bg-teal transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <button
                  disabled={done >= p.lessonCount}
                  onClick={() => markLessonComplete(p.id)}
                  className="badge-mono mt-4 text-xs uppercase tracking-widest text-amber disabled:opacity-40"
                >
                  {done >= p.lessonCount ? 'Track complete' : 'Mark next lesson complete'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
