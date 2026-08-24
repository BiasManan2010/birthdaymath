import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"
import { letterFromNumber } from "../lib/math"

export function IdentityPuzzle({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle } = useExperience()
  const [value, setValue] = useState("")
  const [letter, setLetter] = useState<string | null>(null)
  const [finale, setFinale] = useState(false)

  function submit() {
    if (Number(value.trim()) !== 18) return
    const next = letterFromNumber(18)
    if (!next) return
    play("correct")
    setLetter(next)
    markPuzzle("identity")
    window.setTimeout(() => setFinale(true), 500)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
      <p className="mb-4 text-[11px] tracking-[0.3em] text-mute">A NAME, IN NUMBERS</p>
      <p className="eq mb-8 min-h-10 text-2xl tracking-[0.4em]">{letter ?? "·"}</p>
      {!finale ? (
        <>
          <p className="text-mute">Alphabet position of 3 × 6</p>
          <input
            inputMode="numeric"
            aria-label="Numeric answer"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="eq glass mt-4 h-14 w-40 rounded-none text-center text-2xl"
          />
          <ActionButton className="mt-5" onClick={submit}>
            DECODE
          </ActionButton>
        </>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="eq tracking-[0.35em]">R E N U &nbsp; N A G P A L</p>
            <p className="serif mt-4 text-4xl italic">DR. RENU NAGPAL</p>
            <p className="mt-8 text-lg text-mute">So that's who we've been looking for.</p>
            <ActionButton className="mt-8" onClick={onNext}>
              CONTINUE
            </ActionButton>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
