import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', program: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus('sent');
      setForm({ name: '', email: '', program: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <p className="badge-mono text-xs uppercase tracking-widest text-teal-deep">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold text-navy">Enroll or ask a question</h1>
      <p className="mt-4 text-slate-ink/70">
        Tell us what you're hoping to learn — an instructor replies within 1–2 business days.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label className="badge-mono text-xs uppercase tracking-widest text-navy">Name</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
          />
        </div>
        <div>
          <label className="badge-mono text-xs uppercase tracking-widest text-navy">Email</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
          />
        </div>
        <div>
          <label className="badge-mono text-xs uppercase tracking-widest text-navy">Program of interest</label>
          <input
            name="program"
            value={form.program}
            onChange={handleChange}
            placeholder="e.g. Web Development"
            className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
          />
        </div>
        <div>
          <label className="badge-mono text-xs uppercase tracking-widest text-navy">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full rounded-md border border-navy/20 px-4 py-3 focus:border-teal"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-md bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-widest text-paper disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>

        {status === 'sent' && (
          <p className="badge-mono text-xs text-teal-deep">Sent — we'll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="badge-mono text-xs text-red-600">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
      </form>
    </section>
  );
}
