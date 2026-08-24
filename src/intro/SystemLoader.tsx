import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { SymbolField } from "../components/SymbolField"
import { useExperience } from "../context/Experience"

const LINES = [
  "Initializing mathematical environment...",
  "Loading variables...",
  "Checking equations...",
  "Searching for something unusual...",
]

export function SystemLoader({ onNext }: { onNext: () => void }) {
  const { reducedMotion } = useExperience()
  const [step, setStep] = useState(0)
  const [twist, setTwist] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      setStep(4)
      setTwist(true)
      return
    }
    const t = window.setInterval(() => {
      setStep((s) => {
        if (s >= 4) {
          window.clearInterval(t)
          return s
        }
        return s + 1
      })
    }, 700)
    return () => window.clearInterval(t)
  }, [reducedMotion])

  useEffect(() => {
    if (step < 4) return
    const t = window.setTimeout(() => setTwist(true), reducedMotion ? 0 : 900)
    return () => window.clearTimeout(t)
  }, [step, reducedMotion])

  return (
    <div className="relative flex min-h-[100dvh] flex-col justify-end px-5 pb-10 pt-20">
      <SymbolField />
      <div className="glass relative z-10 mx-auto w-full max-w-lg rounded-3xl p-6">
        <p className="mb-4 text-[11px] tracking-[0.28em] text-cyan/80">SYSTEM // MATH.ENV</p>
        <div className="eq space-y-3 text-sm text-mute">
          {LINES.map((line, i) =>
            i <= step ? (
              <div key={line}>
                <p>{line}</p>
                {i === 1 && (
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-[86%] bg-violet" />
                  </div>
                )}
                {i === 2 && step >= 2 && (
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/8">
                    <div className="h-full w-full bg-cyan" />
                  </div>
                )}
              </div>
            ) : null,
          )}
        </div>
        <AnimatePresence>
          {twist && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-3"
            >
              <p className="text-2xl font-semibold tracking-wide">SOMETHING DOESN'T ADD UP.</p>
              <p className="text-mute">There is one equation left.</p>
              <ActionButton className="mt-4 w-full" onClick={onNext}>
                INVESTIGATE →
              </ActionButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
