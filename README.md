# Mamifs Tech Center

Marketing website + student/staff portal for Mamifs Tech Center. Built with
React, Vite, Tailwind CSS, and Firebase (Auth + Firestore). Deploys to
Firebase Hosting automatically via GitHub Actions.

## What's included

- Marketing site: Home, Programs, Testimonials, Contact (with a live Firestore-backed enrollment form)
- Student portal: sign in with Student ID + PIN, track lesson progress per course
- Staff dashboard: sign in with email/password, view enrolled students and inquiries
- Navy / amber / teal brand, IBM Plex Sans + Mono, circuit-board motif
- GitHub Actions: auto-deploy to Firebase Hosting on merge to `main`, preview deploys on pull requests

## 1. Local development

Install [Node.js](https://nodejs.org) (v20 or later) if you don't have it, then:

```bash
npm install
cp .env.example .env.local   # then paste in your Firebase config values (see step 2)
npm run dev
```

This starts a local server, usually at `http://localhost:5173`. The site
won't fully work yet (login, contact form) until you complete step 2.

## 2. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. Once created, go to **Build → Authentication → Sign-in method** and enable **Email/Password** (this is for staff logins).
3. Go to **Build → Firestore Database → Create database** (start in production mode).
4. Go to **Project settings → General → Your apps → Add app → Web (`</>`icon)**, register the app, and copy the config values shown.
5. Paste those values into your local `.env.local` file (from step 1), matching each key to `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc.
6. Update `.firebaserc` in this repo, replacing `REPLACE-WITH-YOUR-FIREBASE-PROJECT-ID` with your actual Firebase project ID.

## 3. Connect GitHub Actions to Firebase Hosting (auto-deploy)

Install the Firebase CLI and link this repo to your Firebase project:

```bash
npm install -g firebase-tools
firebase login
firebase init hosting:github
```

Follow the prompts — pick the Firebase project you just created, confirm the
GitHub repo, and let it install the deploy workflow. This step automatically:

- Adds a `FIREBASE_SERVICE_ACCOUNT` secret to your GitHub repo
- Confirms/creates the two workflow files already included here (`.github/workflows/firebase-hosting-merge.yml` and `firebase-hosting-pull-request.yml`)

Then add these additional secrets manually, under your **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**:

| Secret name | Where to find it |
|---|---|
| `FIREBASE_PROJECT_ID` | Firebase console → Project settings → General |
| `VITE_FIREBASE_API_KEY` | Firebase console → Project settings → Your apps |
| `VITE_FIREBASE_AUTH_DOMAIN` | same |
| `VITE_FIREBASE_PROJECT_ID` | same |
| `VITE_FIREBASE_STORAGE_BUCKET` | same |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | same |
| `VITE_FIREBASE_APP_ID` | same |

Once these are set, **every push to `main` auto-builds and deploys** to your
live Firebase Hosting URL. Every pull request gets its own preview URL,
posted as a comment on the PR.

## 4. Deploy Firestore security rules

The rules in `firestore.rules` control who can read/write your data. Deploy them with:

```bash
firebase deploy --only firestore:rules
```

## 5. Add your first staff account

Firebase Console → **Authentication → Users → Add user** → enter an email
and password for yourself or an instructor.

That account can now sign in at `/login` under the **Staff** tab and reach
the `/admin` dashboard, where they'll see enrolled students and contact-form
inquiries.

## 6. Add your first student

Firebase Console → **Firestore Database → Start collection** → name it
`students` → add a document with these fields:

```json
{
  "studentId": "STU-001",
  "pin": "1234",
  "name": "Jane Student"
}
```

That student can now sign in at `/login` under the **Student** tab using
Student ID `STU-001` and PIN `1234`, and will land on `/dashboard` where they
can track their progress through each course track.

## Day-to-day usage once it's live

- **Enrolling a new student:** add a new document to the `students` collection in Firestore (same format as above). No code changes needed.
- **Adding a new staff/instructor account:** Firebase Console → Authentication → Users → Add user.
- **Reviewing enrollment inquiries:** sign in as staff and check the `/admin` dashboard — every submission from the public Contact page lands there.
- **Publishing changes to the live site:** edit files, commit, and push (or merge a pull request) to `main`. GitHub Actions rebuilds and redeploys automatically — no manual `firebase deploy` needed.
- **Previewing a change before it's live:** open a pull request instead of pushing straight to `main`; GitHub Actions will post a preview link as a comment.

## Notes on this build

- Lesson content for the 7 tracks is scaffolded with lesson **counts**, not
  full lesson text yet (`src/data/programs.js`). Swap in real curriculum
  content when ready — the progress tracker already works against these counts.
- Student PIN login is intentionally lightweight (no Firebase Auth account
  per student) to keep enrollment simple. See the comments in
  `firestore.rules` if you want to harden this later — for example, migrating
  students to real Firebase Auth accounts once the school grows.
