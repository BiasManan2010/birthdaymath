import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"
import { useExperience } from "../context/Experience"

export function TripleTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [taps, setTaps] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (taps === 0) return
    const t = window.setTimeout(() => setTaps(0), 700)
    return () => window.clearTimeout(t)
  }, [taps])

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          const n = taps + 1
          setTaps(n)
          if (n >= 3) {
            setShow(true)
            setTaps(0)
          }
        }}
      >
        {children}
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-cream/90 px-6 text-center"
            onClick={() => setShow(false)}
            role="dialog"
            aria-label="Secret message"
          >
            <p className="text-2xl">You really thought that was the end? 😄</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function EasterEggs() {
  const { reducedMotion } = useExperience()
  const [pi, setPi] = useState(0)
  const [bounce, setBounce] = useState(false)
  const [portal, setPortal] = useState(false)
  const [renu, setRenu] = useState(false)
  const [buffer, setBuffer] = useState("")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key.length !== 1) return
      const next = (buffer + e.key).toUpperCase().slice(-4)
      setBuffer(next)
      if (next === "RENU") setRenu(true)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [buffer])

  return (
    <>
      <button
        type="button"
        aria-label="Pi easter egg"
        className={`fixed bottom-24 left-3 z-30 text-3xl text-ink md:bottom-8 ${bounce ? "animate-bounce" : ""}`}
        onClick={() => {
          const n = pi + 1
          setPi(n)
          if (n >= 3) {
            setBounce(true)
            setPi(0)
          }
        }}
      >
        π
      </button>
      <button
        type="button"
        aria-label="Infinity portal"
        className="fixed bottom-24 right-3 z-30 text-3xl text-ink md:bottom-8"
        onPointerDown={() => {
          const t = window.setTimeout(() => setPortal(true), 450)
          const up = () => {
            window.clearTimeout(t)
            window.removeEventListener("pointerup", up)
          }
          window.addEventListener("pointerup", up)
        }}
      >
        ∞
      </button>
      <AnimatePresence>
        {portal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-cream"
            onClick={() => setPortal(false)}
          >
            <div className="h-48 w-48 rounded-full border border-ink" />
            <p className="absolute serif text-3xl">A portal to more questions.</p>
          </motion.div>
        )}
        {renu && (
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-cream/90"
            onClick={() => setRenu(false)}
          >
            <p className="serif text-5xl">R E N U</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
