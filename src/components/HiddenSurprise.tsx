import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { teacher } from "../content/teacher"

export function HiddenSurprise() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState<string>(teacher.hiddenFinds[0])

  return (
    <>
      <button
        type="button"
        aria-label="Hidden surprise"
        className="fixed top-1/2 left-1 z-30 min-h-11 min-w-8 rounded-r-full border border-ink text-ink"
        onClick={() => {
          const pick = teacher.hiddenFinds[Math.floor(Math.random() * teacher.hiddenFinds.length)]
          setMsg(pick)
          setOpen(true)
        }}
      >
        ?
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass fixed right-4 bottom-24 left-4 z-50 rounded-3xl p-5 md:right-auto md:bottom-10 md:left-10 md:max-w-sm"
            role="dialog"
          >
            <p className="text-sm tracking-wide">You found something hidden.</p>
            <p className="mt-3">{msg}</p>
            <button type="button" className="mt-4 text-sm text-mute" onClick={() => setOpen(false)}>
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
