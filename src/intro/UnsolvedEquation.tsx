import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"

export function UnsolvedEquation({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle } = useExperience()
  const [value, setValue] = useState("")
  const [done, setDone] = useState(false)
  const [msg, setMsg] = useState("")

  function submit() {
    if (Number(value.trim()) !== 8) {
      setMsg("Not quite. Try again.")
      return
    }
    play("correct")
    markPuzzle("equations")
    setDone(true)
    setMsg("Correct.")
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5">
      <p className="mb-8 text-[11px] tracking-[0.3em] text-mute">ONE EQUATION</p>
      <p className="eq mb-8 text-4xl sm:text-5xl">x + 7 = 15</p>
      <label className="sr-only" htmlFor="solve">
        Answer
      </label>
      <input
        id="solve"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="eq glass h-14 w-40 rounded-none text-center text-2xl outline-none"
      />
      {!done ? (
        <ActionButton className="mt-6" onClick={submit}>
          SOLVE
        </ActionButton>
      ) : (
        <ActionButton className="mt-6" variant="ghost" onClick={onNext}>
          CONTINUE →
        </ActionButton>
      )}
      <p className="mt-6 min-h-8 text-mute">{msg}</p>
    </div>
  )
}
