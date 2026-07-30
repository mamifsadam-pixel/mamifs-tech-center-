import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminDashboard() {
  const { staffUser, staffLogout } = useAuth();
  const [students, setStudents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const studentsSnap = await getDocs(collection(db, 'students'));
      setStudents(studentsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      const inquiriesSnap = await getDocs(
        query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
      );
      setInquiries(inquiriesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Staff Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-navy">{staffUser?.email}</h1>
        </div>
        <button
          onClick={staffLogout}
          className="badge-mono text-xs uppercase tracking-widest text-navy underline"
        >
          Sign out
        </button>
      </div>

      {loading ? (
        <p className="badge-mono mt-10 text-sm text-slate-ink/60">Loading…</p>
      ) : (
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="badge-mono text-xs uppercase tracking-widest text-navy">
              Students ({students.length})
            </h2>
            <ul className="mt-4 space-y-3">
              {students.map((s) => (
                <li key={s.id} className="rounded-md border border-navy/10 bg-white p-4">
                  <p className="font-semibold text-navy">{s.name || 'Unnamed'}</p>
                  <p className="badge-mono text-xs text-slate-ink/60">ID: {s.studentId}</p>
                </li>
              ))}
              {students.length === 0 && (
                <p className="text-sm text-slate-ink/60">No students enrolled yet.</p>
              )}
            </ul>
          </div>

          <div>
            <h2 className="badge-mono text-xs uppercase tracking-widest text-navy">
              Inquiries ({inquiries.length})
            </h2>
            <ul className="mt-4 space-y-3">
              {inquiries.map((i) => (
                <li key={i.id} className="rounded-md border border-navy/10 bg-white p-4">
                  <p className="font-semibold text-navy">{i.name}</p>
                  <p className="text-sm text-slate-ink/70">{i.email}</p>
                  {i.program && <p className="badge-mono text-xs text-teal-deep">{i.program}</p>}
                  {i.message && <p className="mt-2 text-sm text-slate-ink/70">{i.message}</p>}
                </li>
              ))}
              {inquiries.length === 0 && (
                <p className="text-sm text-slate-ink/60">No inquiries yet.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
