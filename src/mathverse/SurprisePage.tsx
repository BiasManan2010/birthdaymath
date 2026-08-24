import { Link } from "react-router-dom"
import { teacher } from "../content/teacher"
import { TeacherModePage } from "./TeacherModePage"

export function SurprisePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-24 pb-28">
      <h1 className="eq text-xs tracking-[0.35em]">A LETTER</h1>
      <article className="serif mt-6 whitespace-pre-line text-xl leading-relaxed">{teacher.letter}</article>
      <Link to="/memories" className="mt-8 inline-block text-sm underline-offset-4 hover:underline">
        Visit the memory constellation →
      </Link>
      <WhyYou />
      <TeacherModePage />
    </div>
  )
}

function WhyYou() {
  return (
    <section className="mt-16 space-y-16">
      {teacher.whyYou.map((line, i) => (
        <p
          key={line}
          className={`max-w-md ${i === 0 ? "text-mute" : i === teacher.whyYou.length - 1 ? "serif text-3xl" : "text-2xl"}`}
        >
          {line}
        </p>
      ))}
      <p className="serif text-4xl">{teacher.title}</p>
    </section>
  )
}
