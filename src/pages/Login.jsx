import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [tab, setTab] = useState('student'); // student | staff
  const { studentLogin, staffLogin } = useAuth();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleStudentSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await studentLogin(studentId, pin);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setBusy(false);
    }
  }

  async function handleStaffSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await staffLogin(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Email or password is incorrect.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-6 py-20">
      <h1 className="text-3xl font-semibold text-navy">Sign in</h1>

      <div className="mt-8 flex rounded-md border border-navy/20 p-1">
        <button
          onClick={() => setTab('student')}
          className={`flex-1 rounded py-2 text-sm font-semibold uppercase tracking-widest ${
            tab === 'student' ? 'bg-navy text-paper' : 'text-navy/60'
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setTab('staff')}
          className={`flex-1 rounded py-2 text-sm font-semibold uppercase tracking-widest ${
            tab === 'staff' ? 'bg-navy text-paper' : 'text-navy/60'
          }`}
        >
          Staff
        </button>
      </div>

      {tab === 'student' ? (
        <form onSubmit={handleStudentSubmit} className="mt-8 space-y-5">
          <div>
            <label className="badge-mono text-xs uppercase tracking-widest text-navy">Student ID</label>
            <input
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
            />
          </div>
          <div>
            <label className="badge-mono text-xs uppercase tracking-widest text-navy">PIN</label>
            <input
              required
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
            />
          </div>
          {error && <p className="badge-mono text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-amber px-6 py-3 text-sm font-semibold uppercase tracking-widest text-navy disabled:opacity-60"
          >
            {busy ? 'Checking…' : 'Enter portal'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleStaffSubmit} className="mt-8 space-y-5">
          <div>
            <label className="badge-mono text-xs uppercase tracking-widest text-navy">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
            />
          </div>
          <div>
            <label className="badge-mono text-xs uppercase tracking-widest text-navy">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
            />
          </div>
          {error && <p className="badge-mono text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-widest text-paper disabled:opacity-60"
          >
            {busy ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      )}
    </section>
  );
}
