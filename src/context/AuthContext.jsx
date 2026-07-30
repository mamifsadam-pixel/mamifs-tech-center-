import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from '../firebase.js';

const AuthContext = createContext(null);

const STUDENT_SESSION_KEY = 'mamifs_student_session';

export function AuthProvider({ children }) {
  const [staffUser, setStaffUser] = useState(null);
  const [student, setStudent] = useState(() => {
    const raw = localStorage.getItem(STUDENT_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setStaffUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Staff / instructor / admin login via Firebase Authentication.
  async function staffLogin(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  async function staffLogout() {
    await signOut(auth);
  }

  // Student login via student ID + PIN, checked against Firestore.
  // Students don't need an email account — this keeps enrollment simple.
  async function studentLogin(studentId, pin) {
    const studentsRef = collection(db, 'students');
    const q = query(
      studentsRef,
      where('studentId', '==', studentId.trim()),
      where('pin', '==', pin.trim())
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error('Student ID or PIN is incorrect.');
    }
    const docSnap = snapshot.docs[0];
    const record = { id: docSnap.id, ...docSnap.data() };
    delete record.pin; // never keep the PIN in local session storage
    setStudent(record);
    localStorage.setItem(STUDENT_SESSION_KEY, JSON.stringify(record));
    return record;
  }

  function studentLogout() {
    setStudent(null);
    localStorage.removeItem(STUDENT_SESSION_KEY);
  }

  const value = {
    staffUser,
    student,
    loading,
    staffLogin,
    staffLogout,
    studentLogin,
    studentLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
