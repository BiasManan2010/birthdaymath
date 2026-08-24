import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { teacher } from "../content/teacher"

const NODES = [
  { x: 50, y: 12 },
  { x: 18, y: 32 },
  { x: 82, y: 32 },
  { x: 18, y: 68 },
  { x: 82, y: 68 },
  { x: 50, y: 88 },
]

export function MemoriesPage() {
  const [open, setOpen] = useState<string | null>(null)
  const mem = teacher.memories.find((m) => m.id === open)

  return (
    <div className="mx-auto max-w-xl px-4 pt-24 pb-28">
      <h1 className="eq text-xs tracking-[0.35em] text-cyan">MEMORIES</h1>
      <p className="mt-2 text-mute">A constellation, not a grid.</p>
      <svg viewBox="0 0 100 100" className="mt-6 h-[60vh] w-full">
        <polyline
          fill="none"
          stroke="rgba(139,124,255,0.35)"
          strokeWidth="0.4"
          points={NODES.map((n) => `${n.x},${n.y}`).join(" ")}
        />
        {teacher.memories.map((m, i) => (
          <g key={m.id} onClick={() => setOpen(m.id)} className="cursor-pointer">
            <circle cx={NODES[i].x} cy={NODES[i].y} r="4.5" fill={`hsl(${m.hue} 70% 60%)`} />
            <text x={NODES[i].x} y={NODES[i].y - 6} textAnchor="middle" fill="#AAB2C0" fontSize="3.2">
              {m.title}
            </text>
          </g>
        ))}
      </svg>
      <AnimatePresence>
        {mem && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-ink/75 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              className="glass max-w-md overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-44 w-full"
                style={{
                  background: `radial-gradient(circle at 30% 20%, hsl(${mem.hue} 80% 70%), transparent 45%), radial-gradient(circle at 80% 80%, hsl(${mem.hue} 50% 30%), #101522)`,
                }}
              />
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
