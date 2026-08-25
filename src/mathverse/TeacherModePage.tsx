import { teacher } from "../content/teacher"

export function TeacherModePage() {
  return (
    <div className="mx-auto max-w-lg px-5 pt-8 pb-10">
      <p className="eq text-xs tracking-[0.3em]">TEACHER MODE: ACTIVATED</p>
      <div className="mt-6 space-y-4">
        <Stat label="Questions answered" value={teacher.stats.questionsAnswered} fill={100} />
        <Stat label="Doubts cleared" value={teacher.stats.doubtsCleared} fill={100} />
        <Stat label={`"Ma'am, ek baar aur samjha do"`} value="" fill={teacher.stats.ekBaarAur} />
        <Stat label={`Students saying "Samajh aa gaya"`} value="" fill={teacher.stats.samajhAaGaya} />
      </div>
      <div className="mt-8 space-y-3">
        {teacher.jokes.map((j) => (
          <article key={j.id} className="glass rounded-none p-5">
            <p className="text-mute">{j.setup}</p>
            <p className="mt-2 text-lg">{j.punch}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value, fill }: { label: string; value: string; fill: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span>{label}</span>
        {value ? <span className="eq">{value}</span> : null}
      </div>
      <div className="h-2 border border-ink">
        <div className="h-full bg-ink" style={{ width: `${fill}%` }} />
      </div>
    </div>
  )
}
