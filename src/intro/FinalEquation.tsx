import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { SymbolField } from "../components/SymbolField"
import { useExperience } from "../context/Experience"

const TERMS = [
  "Knowledge",
  "Patience",
  "Wisdom",
  "Kindness",
  "Countless Questions",
  "Countless Students",
  "Dr. Renu Nagpal",
]

export function FinalEquation({ onNext }: { onNext: () => void }) {
  const { reducedMotion } = useExperience()
  const [n, setN] = useState(reducedMotion ? TERMS.length : 0)
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      const t = window.setTimeout(() => setCollapse(true), 400)
      return () => window.clearTimeout(t)
    }
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= TERMS.length) {
          window.clearInterval(id)
          window.setTimeout(() => setCollapse(true), 700)
          return v
        }
        return v + 1
      })
    }, 420)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 text-center">
      <SymbolField density={12} />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!collapse ? (
            <motion.div key="sum" className="space-y-1">
              {TERMS.slice(0, n).map((t, i) => (
                <p key={t} className="serif text-2xl sm:text-3xl">
                  {t}
                  {i < n - 1 ? <span className="mx-2 text-violet">+</span> : null}
                </p>
              ))}
            </motion.div>
          ) : (
            <motion.div key="inf" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
              <p className="text-[22vw] leading-none text-cyan">∞</p>
              <p className="mt-4 tracking-[0.35em] text-mute">ONE FINAL CALCULATION</p>
              <ActionButton className="mt-8" onClick={onNext}>
                COMPUTE
              </ActionButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
