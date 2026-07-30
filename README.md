# Mamifs Tech Center

Marketing website + student/staff portal for Mamifs Tech Center. Built with
React, Vite, Tailwind CSS, and Firebase (Auth + Firestore). Deploys to
Firebase Hosting automatically via GitHub Actions.

## Local development

    npm install
    cp .env.example .env.local   # then paste in your Firebase config values
    npm run dev

## Connect GitHub Actions to Firebase

    npm install -g firebase-tools
    firebase login
    firebase init hosting:github

This links your Firebase project, adds the `FIREBASE_SERVICE_ACCOUNT` secret
to your repo automatically. Then add these secrets manually under
**Settings → Secrets and variables → Actions**: `FIREBASE_PROJECT_ID`,
`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`,
`VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`,
`VITE_FIREBASE_APP_ID`.

Every push to `main` then auto-deploys to your live Firebase Hosting URL.

## Add your first staff account

Firebase Console → Authentication → Users → Add user (email/password).
Sign in at `/login` under **Staff**.

## Add your first student

Firestore Console → create a `students` collection with a document like:

    { "studentId": "STU-001", "pin": "1234", "name": "Jane Student" }

Sign in at `/login` under **Student** with that ID and PIN.
