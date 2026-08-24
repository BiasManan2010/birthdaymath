export const student = {
  name: "Manan Bharti",
  section: "CSE B",
  roll: "126030115",
  programme: "Diploma Computer Science — 1st year",
}

export const teacher = {
  name: "Dr. Renu Nagpal",
  firstName: "Renu",
  lastName: "Nagpal",
  title: "Dr. Renu Nagpal",
  date: "25 August 2026",
  universe: "THE MATHVERSE",
  tagline: "Where Mathematics Meets Curiosity.",
  supporting: "A small interactive universe, made with respect, from your student.",
  birthdayMessage: "The answer was never a number. It was you — our teacher.",
  letter: `Dear Ma'am,

Happy Birthday.

You are my Diploma Computer Science 1st year teacher, and you made a difficult subject feel possible.

I still remember how you explain until it actually clicks — not just until the chapter ends.

This little Mathverse is my wish for you.
Not a card. A place you can play with.

Thank you for teaching us.

With respect,
Manan Bharti
CSE B · 126030115`,
  messages: [
    {
      id: "m1",
      kind: "wish" as const,
      author: "Manan Bharti · CSE B · 126030115",
      text: "Happy Birthday, Ma'am. Thank you for being our 1st year Computer Science teacher — and for making maths feel less like a wall and more like a door.",
    },
    {
      id: "m2",
      kind: "thank you" as const,
      author: "Your student",
      text: "You never made a doubt feel small. That is why I wanted to build something you could actually touch, not only read.",
    },
    {
      id: "m3",
      kind: "funny" as const,
      author: "CSE B",
      text: "If a calculator ever appears in class, we already know the next line: do it yourself.",
    },
    {
      id: "m4",
      kind: "memory" as const,
      author: "Diploma CS, 1st year",
      text: "Some lectures stay as formulas. Yours stay as the moment it finally made sense.",
    },
    {
      id: "m5",
      kind: "wish" as const,
      author: "Manan Bharti",
      text: "May this year be as kind to you as you have been patient with us. Happy Birthday, Dr. Renu Nagpal.",
    },
  ],
  memories: [
    {
      id: "mem1",
      title: "The first class",
      caption: "Diploma Computer Science, 1st year — and a teacher who made the board feel alive.",
      hue: 32,
    },
    {
      id: "mem2",
      title: "The click",
      caption: "That quiet second after you explained it once more, and it actually landed.",
      hue: 32,
    },
    {
      id: "mem3",
      title: "CSE B",
      caption: "A classroom full of questions, and you never looking bored of them.",
      hue: 32,
    },
    {
      id: "mem4",
      title: "After doubts",
      caption: "You stayed with the problem until we could carry it ourselves.",
      hue: 32,
    },
  ],
  jokes: [
    {
      id: "j1",
      setup: "Calculator detected.",
      punch: "Do it yourself.",
    },
    {
      id: "j2",
      setup: "Student: “Is this in the exam?”",
      punch: "Ma'am: “This is in life.”",
    },
    {
      id: "j3",
      setup: "“Ma'am, ek baar aur samjha do.”",
      punch: "And you did. Every time.",
    },
  ],
  whyYou: [
    "Why does a teacher matter?",
    "Because someone has to make difficult things feel possible.",
    "Because someone has to say: try again.",
    "And for me, that person is you.",
  ],
  hiddenFinds: [
    "You found something hidden.",
    "From CSE B: thank you for every extra explanation.",
    "Mini equation: respect = teaching + patience",
    "Manan Bharti · 126030115 · Happy Birthday, Ma'am.",
    "Fact: the best proofs are the ones a teacher helps you see.",
  ],
  stats: {
    questionsAnswered: "∞",
    doubtsCleared: "∞",
    ekBaarAur: 100,
    samajhAaGaya: 40,
  },
} as const
