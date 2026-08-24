export const teacher = {
  name: "Dr. Renu Nagpal",
  firstName: "Renu",
  lastName: "Nagpal",
  title: "Dr. Renu Nagpal",
  date: "25 August 2026",
  universe: "THE MATHVERSE",
  tagline: "Where Mathematics Meets Curiosity.",
  supporting:
    "A little mathematical universe made especially for you. ❤️",
  birthdayMessage:
    "The answer to this equation was never a number. It was the impact of a teacher.",
  letter: `Dear Ma'am,

Some teachers explain a chapter.
You explain a way of seeing.

You made difficult things feel possible.
You made questions feel welcome.
You made “I don’t get it” into “wait… I think I do.”

Today the universe is not asking for a proof.
It is simply thanking you.

Happy Birthday.

With infinite gratitude,
Your students`,
  messages: [
    {
      id: "m1",
      kind: "thank you" as const,
      author: "A former student",
      text: "You never made us feel small for not knowing. That is a rare kind of mathematics.",
    },
    {
      id: "m2",
      kind: "funny" as const,
      author: "Back-bench committee",
      text: "Whenever someone whispered ‘calculator?’, the room temperature dropped by 12 degrees.",
    },
    {
      id: "m3",
      kind: "memory" as const,
      author: "Class of questions",
      text: "You once spent extra minutes on one doubt until the whole board looked like a constellation. We still remember the silence after it clicked.",
    },
    {
      id: "m4",
      kind: "wish" as const,
      author: "Your Mathverse",
      text: "May this year bring you as much wonder as you have given us. Happy Birthday, Dr. Renu Nagpal.",
    },
    {
      id: "m5",
      kind: "thank you" as const,
      author: "Someone who was scared of maths",
      text: "I walked in afraid of x. I walked out curious about why x was hiding.",
    },
    {
      id: "m6",
      kind: "funny" as const,
      author: "Homework universe",
      text: "‘Do it yourself’ should be printed on every calculator sold in a 5 km radius of your classroom.",
    },
    {
      id: "m7",
      kind: "memory" as const,
      author: "A quiet student",
      text: "You noticed when we understood, and you noticed when we were only nodding. That noticing changed everything.",
    },
    {
      id: "m8",
      kind: "wish" as const,
      author: "∞",
      text: "If kindness had a closed form, it would look a lot like you.",
    },
  ],
  memories: [
    {
      id: "mem1",
      title: "The first proof",
      caption: "The moment a proof stopped being a ritual and became a story.",
      hue: 262,
    },
    {
      id: "mem2",
      title: "Board full of light",
      caption: "Chalk, questions, and a diagram that somehow explained more than the textbook.",
      hue: 190,
    },
    {
      id: "mem3",
      title: "One more time",
      caption: "Ma'am, ek baar aur samjha do — and you always did.",
      hue: 32,
    },
    {
      id: "mem4",
      title: "The click",
      caption: "A classroom going quiet in the best possible way.",
      hue: 330,
    },
    {
      id: "mem5",
      title: "After class",
      caption: "Doubt-clearing that never felt like extra work.",
      hue: 150,
    },
    {
      id: "mem6",
      title: "Infinite patience",
      caption: "Some constants never change.",
      hue: 48,
    },
  ],
  jokes: [
    {
      id: "j1",
      setup: "Calculator detected.",
      punch: "Do it yourself. 😂",
    },
    {
      id: "j2",
      setup: "Student: “Is this in the exam?”",
      punch: "Teacher: “This is in life.”",
    },
    {
      id: "j3",
      setup: "Student copies from neighbour.",
      punch: "Neighbour also copied. Now we have a recursive error.",
    },
    {
      id: "j4",
      setup: "“Ma'am, this chapter is hard.”",
      punch: "“Good. So are you.”",
    },
  ],
  whyYou: [
    "Why does a teacher matter?",
    "Because someone has to make difficult things feel possible.",
    "Because someone has to say: try again.",
    "Because someone has to turn confusion into clarity.",
    "And for us, that person is you.",
  ],
  hiddenFinds: [
    "You found something hidden. 👀",
    "Funny: Parallel lines have so much in common. It’s a shame they’ll never meet.",
    "Student quote: “I came for marks. I stayed for understanding.”",
    "Fact: Zero is even. Yes, really. And yes, this argument has been happening since forever.",
    "Mini equation: happiness ≥ coffee + curiosity",
    "Compliment: Your explanations have a better signal-to-noise ratio than most textbooks.",
    "Memory: That time the whole class pretended they followed, and you knew.",
  ],
  stats: {
    questionsAnswered: "∞",
    doubtsCleared: "∞",
    ekBaarAur: 100,
    samajhAaGaya: 32,
  },
} as const
