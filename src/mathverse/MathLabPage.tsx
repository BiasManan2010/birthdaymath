import { useMemo, useState } from "react"
import { GraphCanvas } from "../components/GraphCanvas"
import { compileExpr, triangleMetrics } from "../lib/math"

const PRESETS: { id: string; label: string; expr?: string; mode?: "fn" | "circle" | "spiral" | "chaos" }[] = [
  { id: "parabola", label: "PARABOLA", expr: "a*x^2 + b*x + c" },
  { id: "line", label: "LINE", expr: "a*x + b" },
  { id: "sine", label: "SINE", expr: "a*sin(x) + c" },
  { id: "cosine", label: "COSINE", expr: "a*cos(x) + c" },
  { id: "circle", label: "CIRCLE", mode: "circle" },
  { id: "spiral", label: "SPIRAL", mode: "spiral" },
  { id: "custom", label: "CUSTOM", expr: "x^2" },
]

type Tab = "equation" | "geometry" | "universe"

export function MathLabPage() {
  const [tab, setTab] = useState<Tab>("equation")
  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-28 md:pt-28">
      <h1 className="eq text-xs tracking-[0.35em]">MATH LAB</h1>
      <p className="mt-2 text-2xl">A playground for curious minds.</p>
      <div className="mt-5 flex gap-2 overflow-x-auto">
        {(
          [
            ["equation", "EQUATION"],
            ["geometry", "GEOMETRY"],
            ["universe", "UNIVERSE"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-h-11 rounded-full px-4 text-sm ${tab === id ? "border border-ink" : "glass text-mute"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "equation" && <EquationPlayground />}
      {tab === "geometry" && <GeometryLab />}
      {tab === "universe" && <GraphUniverse />}
    </div>
  )
}

function EquationPlayground() {
  const [expr, setExpr] = useState("a*x^2 + b*x + c")
  const [mode, setMode] = useState<"fn" | "circle" | "spiral" | "chaos">("fn")
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const compiled = useMemo(() => compileExpr(expr), [expr])
  const fn = useMemo(() => {
    if (!compiled) return (x: number) => x * x
    return (x: number) => compiled(x, a, b, c)
  }, [compiled, a, b, c])

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="glass min-h-11 rounded-full px-3 text-xs"
            onClick={() => {
              setMode(p.mode ?? "fn")
              if (p.expr) setExpr(p.expr)
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
      <label className="mt-4 block text-sm text-mute" htmlFor="eq">
        Equation
      </label>
      <input
        id="eq"
        value={expr}
        onChange={(e) => {
          setExpr(e.target.value)
          setMode("fn")
        }}
        className="eq glass mt-2 h-12 w-full rounded-none px-4"
      />
      <div className="mt-4 grid gap-3">
        {[
          ["a", a, setA],
          ["b", b, setB],
          ["c", c, setC],
        ].map(([name, val, set]) => (
          <label key={String(name)} className="flex items-center gap-3 text-sm">
            <span className="eq w-6">{String(name)}</span>
            <input
              type="range"
              min={-3}
              max={3}
              step={0.1}
              value={Number(val)}
              onChange={(e) => (set as (n: number) => void)(Number(e.target.value))}
              className="h-11 flex-1"
            />
            <span className="eq w-10">{Number(val).toFixed(1)}</span>
          </label>
        ))}
      </div>
      <div className="glass mt-5 h-72 overflow-hidden rounded-none">
        <GraphCanvas mode={mode} fn={fn} />
      </div>
    </div>
  )
}

function GeometryLab() {
  const [pts, setPts] = useState({
    A: { x: 160, y: 40 },
    B: { x: 40, y: 220 },
    C: { x: 280, y: 220 },
  })
  const [drag, setDrag] = useState<keyof typeof pts | null>(null)
  const m = triangleMetrics(pts.A, pts.B, pts.C)

  function move(clientX: number, clientY: number, svg: SVGSVGElement) {
    if (!drag) return
    const r = svg.getBoundingClientRect()
    const x = ((clientX - r.left) / r.width) * 320
    const y = ((clientY - r.top) / r.height) * 260
    setPts((p) => ({ ...p, [drag]: { x: Math.max(12, Math.min(308, x)), y: Math.max(12, Math.min(248, y)) } }))
  }

  return (
    <div className="mt-6">
      <svg
        viewBox="0 0 320 260"
        className="glass w-full rounded-none"
        onPointerMove={(e) => move(e.clientX, e.clientY, e.currentTarget)}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
      >
        <polygon
          points={`${pts.A.x},${pts.A.y} ${pts.B.x},${pts.B.y} ${pts.C.x},${pts.C.y}`}
          fill="none"
          stroke="#141414"
          strokeWidth="1.25"
        />
        {(["A", "B", "C"] as const).map((k) => (
          <g key={k}>
            <circle
              cx={pts[k].x}
              cy={pts[k].y}
              r="12"
              fill="#f3eee4"
              stroke="#141414"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId)
                setDrag(k)
              }}
            />
            <text x={pts[k].x} y={pts[k].y - 18} textAnchor="middle" fill="#141414" fontSize="14">
              {k}
            </text>
          </g>
        ))}
      </svg>
      <div className="eq mt-4 grid grid-cols-2 gap-2 text-sm text-mute">
        <p>AB {m.ab.toFixed(1)}</p>
        <p>BC {m.bc.toFixed(1)}</p>
        <p>CA {m.ca.toFixed(1)}</p>
        <p>Area {m.area.toFixed(1)}</p>
        <p>∠A {m.angleA.toFixed(0)}°</p>
        <p>∠B {m.angleB.toFixed(0)}°</p>
        <p>∠C {m.angleC.toFixed(0)}°</p>
        <p>Perimeter {m.perimeter.toFixed(1)}</p>
      </div>
      <button
        type="button"
        className="mt-4 min-h-12 rounded-full border border-ink px-5"
        onClick={() =>
          setPts({
            A: { x: 40 + Math.random() * 240, y: 20 + Math.random() * 80 },
            B: { x: 20 + Math.random() * 120, y: 140 + Math.random() * 90 },
            C: { x: 160 + Math.random() * 140, y: 140 + Math.random() * 90 },
          })
        }
      >
        TRY SOMETHING CRAZY
      </button>
    </div>
  )
}

function GraphUniverse() {
  const [preset, setPreset] = useState<"parabola" | "sine" | "cosine" | "circle" | "spiral" | "chaos">("sine")
  const fn = useMemo(() => {
    if (preset === "parabola") return (x: number) => 0.25 * x * x - 2
    if (preset === "sine") return (x: number) => 2 * Math.sin(x)
    if (preset === "cosine") return (x: number) => 2 * Math.cos(x)
    return (x: number) => x
  }, [preset])
  const mode = preset === "circle" || preset === "spiral" || preset === "chaos" ? preset : "fn"

  return (
    <div className="mt-6">
      <div className="mb-3 flex flex-wrap gap-2">
        {["PARABOLA", "SINE", "COSINE", "CIRCLE", "SPIRAL", "CHAOS"].map((p) => (
          <button
            key={p}
            type="button"
            className="glass min-h-11 rounded-full px-3 text-xs"
            onClick={() => setPreset(p.toLowerCase() as typeof preset)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="h-[55vh] overflow-hidden rounded-none border border-ink">
        <GraphCanvas key={preset} mode={mode} fn={fn} color="#141414" />
      </div>
    </div>
  )
}
