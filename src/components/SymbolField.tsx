import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useExperience } from "../context/Experience"

const GLYPHS = ["π", "∞", "√", "∑", "∫", "Δ", "θ", "x", "y"]

type Node = {
  id: number
  g: string
  x: number
  y: number
  vx: number
  vy: number
}

export function SymbolField({ density = 16, connect = true }: { density?: number; connect?: boolean }) {
  const { reducedMotion } = useExperience()
  const [nodes, setNodes] = useState<Node[]>(() =>
    Array.from({ length: density }, (_, i) => ({
      id: i,
      g: GLYPHS[i % GLYPHS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.03,
    })),
  )
  const [letter, setLetter] = useState<string | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => {
          let x = n.x + n.vx
          let y = n.y + n.vy
          let vx = n.vx
          let vy = n.vy
          if (x < 2 || x > 98) vx *= -1
          if (y < 4 || y > 96) vy *= -1
          return { ...n, x: Math.min(98, Math.max(2, x)), y: Math.min(96, Math.max(4, y)), vx, vy }
        }),
      )
    }, 40)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion || !connect) return
    const id = window.setInterval(() => {
      setLetter("R")
      window.setTimeout(() => setLetter(null), 1600)
    }, 14000)
    return () => window.clearInterval(id)
  }, [reducedMotion, connect])

  const links = useMemo(() => {
    const out: [Node, Node][] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        if (dx * dx + dy * dy < 180) out.push([nodes[i], nodes[j]])
      }
    }
    return out.slice(0, 18)
  }, [nodes])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full">
        {connect &&
          links.map(([a, b]) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="rgba(139,124,255,0.18)"
              strokeWidth="1"
            />
          ))}
      </svg>
      {nodes.map((n) => (
        <span
          key={n.id}
          className="absolute text-lg text-violet/35 eq"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
        >
          {n.g}
        </span>
      ))}
      <AnimatePresence>
        {letter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 grid place-items-center text-[28vw] font-semibold text-violet"
          >
            {letter}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
