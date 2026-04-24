export type ChildProfile = {
  id: string;
  name: string;
  age: number;
  place: string;
  level: string;
  interests: string[];
  goal: string;
  progress: number;
  need: string;
  accent: "primary" | "warm" | "accent";
  story: string;
  recentLessons: { title: string; date: string; mentor: string }[];
  goals: { label: string; done: boolean }[];
};

export const CHILDREN: ChildProfile[] = [
  {
    id: "aisha",
    name: "Aisha",
    age: 11,
    place: "Nairobi, Kenya",
    level: "Grade 5 · Reading",
    interests: ["Stories", "Science", "Drawing"],
    goal: "Become a marine biologist",
    progress: 72,
    need: "English mentor",
    accent: "primary",
    story: "Aisha walks 4km to her local learning hub every morning. She loves ocean documentaries and dreams of protecting Kenya's coral reefs.",
    recentLessons: [
      { title: "Reading: Charlotte's Web Ch. 3", date: "2 days ago", mentor: "Sara M." },
      { title: "Science: How fish breathe", date: "5 days ago", mentor: "EduAI" },
      { title: "English speaking practice", date: "1 week ago", mentor: "James K." },
    ],
    goals: [
      { label: "Read 10 chapter books this year", done: false },
      { label: "Pass Grade 5 English exam", done: true },
      { label: "Weekly mentor calls", done: false },
    ],
  },
  {
    id: "mateo",
    name: "Mateo",
    age: 9,
    place: "Lima, Peru",
    level: "Grade 3 · Math",
    interests: ["Robots", "Music", "Football"],
    goal: "Build flying machines",
    progress: 48,
    need: "Math expert · Tablet",
    accent: "warm",
    story: "Mateo lost his mother last year and lives with his grandmother. He builds tiny machines from scrap and asks 'why?' about everything.",
    recentLessons: [
      { title: "Math: Multiplication tables 6-9", date: "1 day ago", mentor: "EduAI" },
      { title: "Storytelling in Spanish", date: "3 days ago", mentor: "Lucia P." },
    ],
    goals: [
      { label: "Master multiplication", done: false },
      { label: "Receive a learning tablet", done: false },
      { label: "Build a working windmill model", done: true },
    ],
  },
  {
    id: "priya",
    name: "Priya",
    age: 13,
    place: "Dhaka, Bangladesh",
    level: "Grade 7 · STEM",
    interests: ["Code", "Stars", "Poetry"],
    goal: "Engineer for clean water",
    progress: 86,
    need: "Career mentor",
    accent: "accent",
    story: "Priya is the first in her family to attend secondary school. She codes simple games on a shared phone and writes poetry about the monsoon.",
    recentLessons: [
      { title: "Intro to Python: Loops", date: "Yesterday", mentor: "Dev R." },
      { title: "Astronomy: The Pleiades", date: "4 days ago", mentor: "EduAI" },
      { title: "Poetry workshop", date: "1 week ago", mentor: "Anika H." },
    ],
    goals: [
      { label: "Build first website", done: true },
      { label: "Find university mentor", done: false },
      { label: "Apply for STEM scholarship", done: false },
    ],
  },
];

export function getChild(id: string) {
  return CHILDREN.find((c) => c.id === id);
}