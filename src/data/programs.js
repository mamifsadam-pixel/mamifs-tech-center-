export const programs = [
  {
    id: 'computer-basics',
    name: 'Computer Basics',
    tagline: 'Files, folders, and the confidence to use any computer.',
    lessonCount: 10,
  },
  {
    id: 'web-development',
    name: 'Web Development',
    tagline: 'HTML, CSS, and JavaScript, from first tag to first deploy.',
    lessonCount: 14,
  },
  {
    id: 'networking',
    name: 'Networking',
    tagline: 'How devices talk to each other, and how to keep them talking.',
    lessonCount: 12,
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    tagline: 'Spot threats, harden systems, think like a defender.',
    lessonCount: 12,
  },
  {
    id: 'data-ai',
    name: 'Data & AI',
    tagline: 'Reading data, training models, understanding the hype.',
    lessonCount: 12,
  },
  {
    id: 'programming',
    name: 'Programming',
    tagline: 'Logic, loops, and problem-solving in real code.',
    lessonCount: 14,
  },
  {
    id: 'app-development',
    name: 'App Development',
    tagline: 'Design and ship a mobile app from idea to install.',
    lessonCount: 10,
  },
];

// Sum of lessonCount above should match the portal's total lesson count.
export const totalLessons = programs.reduce((sum, p) => sum + p.lessonCount, 0);

export const additionalOfferings = [
  {
    id: 'graphics-design',
    name: 'Graphics Design',
    tagline: 'Visual design fundamentals using industry-standard tools.',
  },
  {
    id: 'digital-literacy',
    name: 'Digital Literacy',
    tagline: 'Everyday digital skills for work, study, and daily life.',
  },
];
