import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { teacher } from "../content/teacher"

const NODES = [
  { x: 50, y: 18 },
  { x: 20, y: 42 },
  { x: 80, y: 42 },
  { x: 50, y: 72 },
]

export function MemoriesPage() {
  const [open, setOpen] = useState<string | null>(null)
  const mem = teacher.memories.find((m) => m.id === open)

  return (
    <div className="mx-auto max-w-xl px-4 pt-24 pb-28">
      <h1 className="eq text-xs tracking-[0.35em]">MEMORIES</h1>
      <p className="mt-2 text-mute">A constellation, not a grid.</p>
      <svg viewBox="0 0 100 100" className="mt-6 h-[60vh] w-full">
        <polyline
          fill="none"
          stroke="#141414"
          strokeWidth="0.35"
          points={NODES.map((n) => `${n.x},${n.y}`).join(" ")}
        />
        {teacher.memories.map((m, i) => (
          <g key={m.id} onClick={() => setOpen(m.id)} className="cursor-pointer">
            <circle cx={NODES[i].x} cy={NODES[i].y} r="4.2" fill="#f3eee4" stroke="#141414" strokeWidth="0.6" />
            <text x={NODES[i].x} y={NODES[i].y - 6} textAnchor="middle" fill="#141414" fontSize="3.2">
              {m.title}
            </text>
          </g>
        ))}
      </svg>
      <AnimatePresence>
        {mem && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-cream/85 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              className="glass max-w-md overflow-hidden rounded-none bg-cream"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-36 w-full items-center justify-center border-b border-ink">
                <span className="text-5xl">∞</span>
              </div>
              <div className="p-5">
                <p className="serif text-2xl">{mem.title}</p>
                <p className="mt-2 text-mute">{mem.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
