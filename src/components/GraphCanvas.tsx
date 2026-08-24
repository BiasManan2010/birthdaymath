import { useEffect, useRef } from "react"

type Mode = "fn" | "circle" | "spiral" | "chaos"

export function GraphCanvas({
  mode = "fn",
  fn,
  color = "#141414",
  animate = true,
  className = "",
}: {
  mode?: Mode
  fn?: (x: number) => number
  color?: string
  animate?: boolean
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf = 0
    let t = 0

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = "rgba(20,20,20,0.18)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, h / 2)
      ctx.lineTo(w, h / 2)
      ctx.moveTo(w / 2, 0)
      ctx.lineTo(w / 2, h)
      ctx.stroke()

      const progress = animate ? Math.min(1, t / 90) : 1
      ctx.strokeStyle = color
      ctx.lineWidth = 1.25
      ctx.beginPath()

      if (mode === "circle") {
        const r = Math.min(w, h) * 0.28
        const steps = 180
        for (let i = 0; i <= steps * progress; i++) {
          const a = (i / steps) * Math.PI * 2
          const x = w / 2 + r * Math.cos(a)
          const y = h / 2 + r * Math.sin(a)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
      } else if (mode === "spiral") {
        const steps = 420
        for (let i = 0; i <= steps * progress; i++) {
          const a = i * 0.12
          const r = 2 + i * 0.22
          const x = w / 2 + r * Math.cos(a)
          const y = h / 2 + r * Math.sin(a)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
      } else if (mode === "chaos") {
        let x = 0.1
        let y = 0.1
        ctx.fillStyle = color
        const n = Math.floor(4000 * progress)
        for (let i = 0; i < n; i++) {
          const nx = Math.sin(1.4 * y) + 1.6 * Math.cos(1.4 * x)
          const ny = Math.sin(1.1 * x) + 1.2 * Math.cos(1.1 * y)
          x = nx
          y = ny
          ctx.fillRect(w / 2 + x * 55, h / 2 + y * 55, 1, 1)
        }
      } else if (fn) {
        const xMin = -6
        const xMax = 6
        const yScale = h / 10
        const steps = w
        let started = false
        for (let i = 0; i <= steps * progress; i++) {
          const x = xMin + ((xMax - xMin) * i) / steps
          const y = fn(x)
          if (!Number.isFinite(y)) {
            started = false
            continue
          }
          const px = ((x - xMin) / (xMax - xMin)) * w
          const py = h / 2 - y * yScale
          if (!started) {
            ctx.moveTo(px, py)
            started = true
          } else ctx.lineTo(px, py)
        }
      }
      ctx.stroke()
      t += 1
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [animate, color, fn, mode])

  return <canvas ref={ref} className={`h-full w-full ${className}`} />
}
