import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"
import { letterFromNumber } from "../lib/math"

const CLUES = [
  { q: "3 × 6", a: 18 },
  { q: "20 ÷ 4", a: 5 },
  { q: "7 × 2", a: 14 },
  { q: "15 + 6", a: 21 },
]

export function IdentityPuzzle({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle } = useExperience()
  const [i, setI] = useState(0)
  const [value, setValue] = useState("")
  const [letters, setLetters] = useState<string[]>([])
  const [finale, setFinale] = useState(false)
  const clue = CLUES[i]

  function submit() {
    if (Number(value.trim()) !== clue.a) return
    const letter = letterFromNumber(clue.a)
    if (!letter) return
    play("correct")
    const next = [...letters, letter]
    setLetters(next)
    setValue("")
    if (i < CLUES.length - 1) setI(i + 1)
    else {
      markPuzzle("identity")
      window.setTimeout(() => setFinale(true), 600)
    }
  }

  const first = letters.join(" ")

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
      <p className="mb-4 text-[11px] tracking-[0.3em] text-mute">HIDDEN IDENTITY</p>
      <p className="eq mb-2 min-h-10 text-2xl tracking-[0.4em] text-cyan">{first || "· · · ·"}</p>
      <p className="eq mb-8 min-h-10 text-2xl tracking-[0.35em] text-violet">
        {letters.length === 4 ? "N A G P A L" : ""}
      </p>
      {!finale && letters.length < 4 ? (
        <>
          <p className="text-mute">Alphabet position of</p>
          <p className="eq my-4 text-4xl">{clue.q}</p>
          <input
            inputMode="numeric"
            aria-label="Numeric answer"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="eq glass h-14 w-40 rounded-2xl text-center text-2xl"
          />
          <ActionButton className="mt-5" onClick={submit}>
            DECODE
          </ActionButton>
        </>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="serif mt-2 text-4xl italic">DR. RENU NAGPAL</p>
            <p className="mt-8 text-lg text-mute">So that's who we've been looking for...</p>
            <ActionButton className="mt-8" onClick={onNext}>
              CONTINUE
            </ActionButton>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
