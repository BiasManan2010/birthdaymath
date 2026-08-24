import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"

const EQS = [
  { display: "x + 7 = 15", answer: 8 },
  { display: "3x = 21", answer: 7 },
  { display: "x² = 16", answer: 4 },
]

export function UnsolvedEquation({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle } = useExperience()
  const [i, setI] = useState(0)
  const [value, setValue] = useState("")
  const [ok, setOk] = useState(false)
  const [done, setDone] = useState(false)
  const [msg, setMsg] = useState("")
  const eq = EQS[i]

  function submit() {
    const n = Number(value.trim())
    if (n === eq.answer) {
      play("correct")
      setOk(true)
      setMsg("Correct.")
      window.setTimeout(() => {
        if (i < EQS.length - 1) {
          setI(i + 1)
          setValue("")
          setOk(false)
          setMsg("Interesting...")
        } else {
          markPuzzle("equations")
          setDone(true)
          setMsg("Interesting...")
        }
      }, 700)
    } else {
      setMsg("Not quite. Try again.")
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5">
      <p className="mb-8 text-[11px] tracking-[0.3em] text-mute">UNSOLVED EQUATION</p>
      <AnimatePresence mode="wait">
        <motion.p
          key={eq.display}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="eq mb-8 text-4xl sm:text-5xl"
        >
          {eq.display}
        </motion.p>
      </AnimatePresence>
      <label className="sr-only" htmlFor="solve">
        Answer
      </label>
      <input
        id="solve"
        inputMode="numeric"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className={`eq glass h-14 w-40 rounded-2xl text-center text-2xl outline-none ${ok ? "border-cyan/50" : ""}`}
      />
      <ActionButton className="mt-6" onClick={submit} disabled={done}>
        SOLVE
      </ActionButton>
      <p className="mt-6 min-h-8 text-mute">{msg}</p>
      {done && (
        <ActionButton className="mt-4" variant="ghost" onClick={onNext}>
          CONTINUE →
        </ActionButton>
      )}
    </div>
  )
}
