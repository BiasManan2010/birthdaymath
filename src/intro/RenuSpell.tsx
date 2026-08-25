import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"
import { transition } from "../lib/motion"

const CLUES = [
  {
    letter: "R",
    prompt: "A beginning.",
    q: "3 × 6",
    a: 18,
    mode: "pad" as const,
  },
  {
    letter: "E",
    prompt: "A breath.",
    q: "20 ÷ 4",
    a: 5,
    mode: "pick" as const,
    options: [4, 5, 8, 16],
  },
  {
    letter: "N",
    prompt: "A hold.",
    q: "7 × 2",
    a: 14,
    mode: "pad" as const,
  },
  {
    letter: "U",
    prompt: "A close.",
    q: "15 + 6",
    a: 21,
    mode: "pick" as const,
    options: [15, 21, 26, 9],
  },
]

function buzz() {
  try {
    navigator.vibrate?.(12)
  } catch {
    /* ignore */
  }
}

export function RenuSpell({ onNext }: { onNext: () => void }) {
  const { play, markPuzzle, reducedMotion } = useExperience()
  const [i, setI] = useState(0)
  const [typed, setTyped] = useState("")
  const [found, setFound] = useState<string[]>([])
  const [wrong, setWrong] = useState(false)
  const [named, setNamed] = useState(false)
  const clue = CLUES[i]
  const done = found.length === 4

  function accept(n: number) {
    if (n !== clue.a) {
      setWrong(true)
      window.setTimeout(() => setWrong(false), 420)
      return
    }
    buzz()
    play("correct")
    const next = [...found, clue.letter]
    setFound(next)
    setTyped("")
    markPuzzle(`letter-${clue.letter}`)
    if (next.length === 4) {
      window.setTimeout(() => setNamed(true), reducedMotion ? 0 : 700)
    } else {
      setI((v) => v + 1)
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5 pb-8 pt-16">
      <p className="eq text-[11px] tracking-[0.35em] text-mute">FOUR NUMBERS · ONE NAME</p>

      <div className="mt-8 flex items-center gap-2 sm:gap-3">
        {CLUES.map((c, idx) => (
          <div key={c.letter} className="flex items-center gap-2 sm:gap-3">
            <motion.div
              layout
              className={`grid h-16 w-14 place-items-center border sm:h-20 sm:w-16 ${
                found[idx] ? "border-ink" : "border-ink/30"
              } ${idx === i && !done ? "border-ink" : ""}`}
            >
              <AnimatePresence>
                {found[idx] && (
                  <motion.span
                    key={found[idx]}
                    initial={reducedMotion ? false : { opacity: 0, y: 18, rotate: -10, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    transition={transition(reducedMotion, { stiffness: 220, damping: 16 })}
                    className="serif text-4xl sm:text-5xl"
                  >
                    {found[idx]}
                  </motion.span>
                )}
              </AnimatePresence>
              {!found[idx] && <span className="text-mute/40">·</span>}
            </motion.div>
            {idx < 3 && (
              <div className={`h-px w-3 sm:w-5 ${found[idx] ? "bg-ink" : "bg-ink/20"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={clue.letter}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-10 w-full max-w-sm text-center"
          >
            <p className="serif text-xl italic text-mute">{clue.prompt}</p>
            <p className="eq mt-3 text-4xl sm:text-5xl">{clue.q}</p>
            <p className="mt-2 text-xs tracking-[0.2em] text-mute">ALPHABET POSITION</p>

            {clue.mode === "pick" ? (
              <div className="mt-8 grid grid-cols-2 gap-3">
                {clue.options.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => accept(n)}
                    className="glass min-h-16 rounded-none text-2xl"
                  >
                    {n}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <motion.p
                  animate={wrong && !reducedMotion ? { x: [-7, 7, -5, 5, 0] } : { x: 0 }}
                  className="eq mt-6 min-h-12 text-3xl tracking-[0.3em]"
                >
                  {typed || "—"}
                </motion.p>
                <Keypad
                  onDigit={(d) => setTyped((t) => (t + d).slice(0, 3))}
                  onDelete={() => setTyped((t) => t.slice(0, -1))}
                />
                <ActionButton className="mt-5 w-full" onClick={() => accept(Number(typed))}>
                  LOCK LETTER
                </ActionButton>
              </>
            )}
            <p className="eq mt-5 text-xs text-mute">{i + 1} / 4</p>
          </motion.div>
        ) : (
          <motion.div
            key="named"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <p className="eq tracking-[0.45em]">R E N U</p>
            <AnimatePresence>
              {named && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="eq mt-3 tracking-[0.35em] text-mute">N A G P A L</p>
                  <p className="serif mt-6 text-4xl italic sm:text-5xl">Dr. Renu Nagpal</p>
                  <p className="mt-5 text-mute">The name was always there. Waiting to be solved.</p>
                  <ActionButton className="mt-8" onClick={onNext}>
                    READ YOUR LETTER →
                  </ActionButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Keypad({ onDigit, onDelete }: { onDigit: (d: string) => void; onDelete: () => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  return (
    <div className="mx-auto mt-5 grid w-56 grid-cols-3 gap-2">
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onDigit(k)}
          className="glass min-h-12 rounded-none text-lg"
        >
          {k}
        </button>
      ))}
      <span />
      <button type="button" onClick={() => onDigit("0")} className="glass min-h-12 rounded-none text-lg">
        0
      </button>
      <button type="button" onClick={onDelete} className="min-h-12 text-sm text-mute" aria-label="Delete">
        ⌫
      </button>
    </div>
  )
}
