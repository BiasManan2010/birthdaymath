import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"

const STEPS = [
  "Think of any number.",
  "Don't tell me.",
  "× 2",
  "+ 10",
  "÷ 2",
  "− your original number",
]

export function MathMagic({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle } = useExperience()
  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [line, setLine] = useState("")

  function next() {
    if (i < STEPS.length - 1) setI(i + 1)
  }

  function reveal() {
    play("correct")
    setRevealed(true)
    setLine("You didn't tell me your number.")
    window.setTimeout(() => setLine("And yet mathematics did."), 1100)
    markPuzzle("magic")
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
      <p className="mb-6 text-[11px] tracking-[0.3em] text-mute">MATH MAGIC</p>
      <p className="min-h-16 text-3xl font-medium">{STEPS[i]}</p>
      {!revealed && i < STEPS.length - 1 && (
        <ActionButton className="mt-8" onClick={next}>
          NEXT
        </ActionButton>
      )}
      {!revealed && i === STEPS.length - 1 && (
        <ActionButton className="mt-8" onClick={reveal}>
          REVEAL
        </ActionButton>
      )}
      {revealed && (
        <>
          <p className="eq mt-6 text-6xl text-cyan">5</p>
          <p className="mt-6 max-w-sm text-lg text-mute">{line}</p>
          {line.includes("mathematics") && (
            <ActionButton className="mt-8" onClick={onNext}>
              CONTINUE
            </ActionButton>
          )}
        </>
      )}
    </div>
  )
}
