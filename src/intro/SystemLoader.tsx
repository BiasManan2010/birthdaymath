import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { useExperience } from "../context/Experience"

export function SystemLoader({ onNext }: { onNext: () => void }) {
  const { reducedMotion } = useExperience()
  const [ready, setReady] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) return
    const t = window.setTimeout(() => setReady(true), 900)
    return () => window.clearTimeout(t)
  }, [reducedMotion])

  return (
    <div className="relative flex min-h-[100dvh] flex-col justify-end px-5 pb-10 pt-20">
      <div className="glass relative z-10 mx-auto w-full max-w-lg rounded-none p-6">
        <p className="mb-4 text-[11px] tracking-[0.28em] text-mute">A SMALL PROBLEM</p>
        <p className="eq text-sm text-mute">One equation is unfinished.</p>
        <AnimatePresence>
          {ready && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-3">
              <p className="text-2xl font-medium tracking-wide">SOMETHING DOESN'T ADD UP.</p>
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
