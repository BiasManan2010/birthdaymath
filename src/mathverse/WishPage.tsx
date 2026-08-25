import { TripleTitle } from "../components/EasterEggs"
import { MamPortrait } from "../components/MamPortrait"
import { letter, student, teacher } from "../content/teacher"

export function WishPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 pb-24 pt-20 sm:pt-24">
      <header className="text-center">
        <p className="eq text-[11px] tracking-[0.35em] text-mute">{teacher.date}</p>
        <MamPortrait className="mt-8" />
        <TripleTitle className="serif mt-8 text-5xl leading-tight sm:text-7xl">Happy Birthday</TripleTitle>
        <p className="serif mt-4 text-3xl italic sm:text-4xl">{teacher.title}</p>
        <p className="eq mt-6 text-xs tracking-[0.2em] text-mute">
          {student.name} · {student.section} · {student.roll}
        </p>
      </header>

      <div className="mx-auto mt-12 max-w-xl border border-ink bg-cream/80 px-5 py-10 sm:px-10">
        <p className="serif text-2xl italic">{letter.greeting}</p>
        <div className="mt-8 space-y-8">
          {letter.sections.map((para) => (
            <p key={para.slice(0, 40)} className="serif text-[1.35rem] leading-[1.85] sm:text-[1.5rem]">
              {para}
            </p>
          ))}
        </div>
        <p className="serif mt-12 text-xl italic">{letter.closing}</p>
        <p className="serif mt-3 text-3xl">{student.name}</p>
        <p className="eq mt-3 text-sm leading-relaxed tracking-wide text-mute">
          {student.section}
          <br />
          {student.roll}
          <br />
          {student.programme}
        </p>
      </div>

      <p className="mt-14 text-center serif text-2xl italic text-mute">
        Four letters. One teacher. A very happy birthday.
      </p>
    </article>
  )
}
