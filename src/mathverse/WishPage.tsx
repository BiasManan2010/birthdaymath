import { useEffect, useRef } from "react"
import { TripleTitle } from "../components/EasterEggs"
import { MamPortrait } from "../components/MamPortrait"
import { useExperience } from "../context/Experience"
import { letter, students, teacher } from "../content/teacher"

export function WishPage() {
  const { play } = useExperience()
  const sang = useRef(false)

  useEffect(() => {
    if (sang.current) return
    sang.current = true
    const id = window.setTimeout(() => play("wish"), 400)
    return () => window.clearTimeout(id)
  }, [play])

  return (
    <article className="mx-auto max-w-2xl px-5 pb-24 pt-20 sm:pt-24">
      <header className="text-center">
        <p className="eq text-[11px] tracking-[0.35em] text-mute">{teacher.date}</p>
        <MamPortrait className="mt-8" />
        <TripleTitle className="serif mt-8 text-5xl leading-tight sm:text-7xl">Happy Birthday</TripleTitle>
        <p className="serif mt-4 text-3xl italic sm:text-4xl">{teacher.title}</p>
        <div className="eq mt-6 space-y-1 text-xs tracking-[0.2em] text-mute">
          {students.map((s) => (
            <p key={s.roll}>
              {s.name} · {s.section} · {s.roll}
            </p>
          ))}
        </div>
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
        <div className="mt-6 space-y-6">
          {students.map((s) => (
            <div key={s.roll}>
              <p className="serif text-3xl">{s.name}</p>
              <p className="eq mt-2 text-sm leading-relaxed tracking-wide text-mute">
                {s.section} · {s.roll}
                <br />
                {s.programme}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-14 text-center serif text-2xl italic text-mute">
        Four letters. One teacher. A very happy birthday.
      </p>
    </article>
  )
}
