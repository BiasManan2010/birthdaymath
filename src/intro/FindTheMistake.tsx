import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"

const STEPS = [
  { text: "2x + 6 = 14", wrong: false },
  { text: "2x = 14 + 6", wrong: true },
  { text: "2x = 20", wrong: false },
  { text: "x = 10", wrong: false },
]

export function FindTheMistake({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle } = useExperience()
  const [picked, setPicked] = useState<number | null>(null)
  const [phase, setPhase] = useState(0)

  function pick(i: number) {
    setPicked(i)
    if (STEPS[i].wrong) {
      play("correct")
      setPhase(1)
      markPuzzle("mistake")
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5">
      <p className="mb-3 text-[11px] tracking-[0.3em] text-rose">SOMETHING IS WRONG.</p>
      <p className="mb-8 text-mute">Find the mistake.</p>
      <div className="w-full max-w-md space-y-3">
        {STEPS.map((s, i) => {
          const selected = picked === i
          const good = selected && s.wrong
          const bad = selected && !s.wrong
          return (
            <button
              key={s.text}
              type="button"
              onClick={() => pick(i)}
              className={`eq glass flex min-h-14 w-full items-center rounded-2xl px-4 text-left text-lg ${
                good ? "border-cyan/60 text-cyan" : bad ? "border-rose/50 text-rose" : ""
              }`}
            >
              {s.text}
            </button>
          )
        })}
      </div>
      {phase >= 1 && (
        <div className="mt-8 max-w-md text-center">
          <p>There it is.</p>
          <p className="mt-4 text-mute">A good mathematician finds the answer.</p>
          <p className="mt-2 text-mute">A great teacher helps others find the mistake.</p>
          <ActionButton className="mt-6" onClick={onNext}>
            CONTINUE
          </ActionButton>
        </div>
      )}
    </div>
  )
}
