import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { teacher } from "../content/teacher"

const POS = [
  { x: 8, y: 6 },
  { x: 52, y: 4 },
  { x: 22, y: 32 },
  { x: 58, y: 38 },
  { x: 12, y: 64 },
]

export function MessagesPage() {
  const [open, setOpen] = useState<string | null>(null)
  const card = teacher.messages.find((m) => m.id === open)

  return (
    <div className="relative mx-auto min-h-[100dvh] max-w-3xl px-4 pt-24 pb-28">
      <h1 className="eq text-xs tracking-[0.35em]">MESSAGE WALL</h1>
      <p className="mt-2 mb-6 text-mute">Tap a card.</p>
      <div className="relative h-[70vh]">
        {teacher.messages.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setOpen(m.id)}
            className="glass absolute min-h-16 w-[44%] rounded-none p-3 text-left text-sm md:w-48"
            style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
          >
            <span className="eq text-[10px] tracking-widest">{m.kind.toUpperCase()}</span>
            <p className="mt-1 line-clamp-3">{m.text}</p>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {card && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-cream/85 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.article
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              className="glass max-w-md rounded-none bg-cream p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="eq text-xs tracking-widest">{card.kind.toUpperCase()}</p>
              <p className="serif mt-4 text-2xl">{card.text}</p>
              <p className="mt-4 text-mute">— {card.author}</p>
              <button type="button" className="mt-6 text-sm text-mute" onClick={() => setOpen(null)}>
                Close
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
