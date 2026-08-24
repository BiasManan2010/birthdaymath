import { useEffect, useMemo, useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { GraphCanvas } from "../components/GraphCanvas"
import { useExperience } from "../context/Experience"

type GameId = "hub" | "mental" | "mistake" | "escape" | "memory" | "graph"

export function GamesPage() {
  const [game, setGame] = useState<GameId>("hub")
  if (game === "hub") {
    return (
      <div className="mx-auto max-w-lg px-5 pt-24 pb-28">
        <h1 className="eq text-xs tracking-[0.35em] text-cyan">PLAY</h1>
        <p className="mt-2 mb-6 text-2xl">Small games. Big dopamine.</p>
        {(
          [
            ["mental", "Mental Math Rush"],
            ["mistake", "Find the Mistake"],
            ["escape", "Equation Escape"],
            ["memory", "Number Memory"],
            ["graph", "Which Graph?"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setGame(id)}
            className="glass mb-3 flex min-h-14 w-full items-center rounded-2xl px-4 text-left"
          >
            {label}
          </button>
        ))}
      </div>
    )
  }
  return (
    <div className="mx-auto max-w-lg px-5 pt-24 pb-28">
      <button type="button" className="mb-4 text-sm text-mute" onClick={() => setGame("hub")}>
        ← Games
      </button>
      {game === "mental" && <MentalMath />}
      {game === "mistake" && <MistakeGame />}
      {game === "escape" && <EquationEscape />}
      {game === "memory" && <NumberMemory />}
      {game === "graph" && <WhichGraph />}
    </div>
  )
}

function MentalMath() {
  const { recordScore, markGamePlayed, play, highScores } = useExperience()
  const [time, setTime] = useState(30)
  const [score, setScore] = useState(0)
  const [q, setQ] = useState(() => makeQ(0))
  const [val, setVal] = useState("")
  const [live, setLive] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!live || done) return
    if (time <= 0) {
      setDone(true)
      recordScore("mental", score)
      markGamePlayed()
      return
    }
    const t = window.setTimeout(() => setTime((x) => x - 1), 1000)
    return () => window.clearTimeout(t)
  }, [live, time, done, score, recordScore, markGamePlayed])

  function submit() {
    if (Number(val) === q.a) {
      play("correct")
      setScore((s) => s + 1)
      setQ(makeQ(score + 1))
      setVal("")
    } else setVal("")
  }

  return (
    <div className="text-center">
      <p className="eq text-cyan">{live ? `${time}s` : "30-second rush"}</p>
      <p className="mt-2 serif text-4xl">{live && !done ? q.q : "Mental Math Rush"}</p>
      {live && !done && (
        <>
          <input
            className="eq glass mt-6 h-14 w-40 rounded-2xl text-center text-2xl"
            value={val}
            inputMode="numeric"
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            aria-label="Answer"
          />
          <div className="mt-4">
            <ActionButton onClick={submit}>LOCK IN</ActionButton>
          </div>
        </>
      )}
      {!live && (
        <ActionButton className="mt-8" onClick={() => setLive(true)}>
          START
        </ActionButton>
      )}
      {done && <p className="mt-6 text-2xl">Score constellation: {score}</p>}
      <p className="mt-4 text-mute">Best {highScores.mental ?? 0}</p>
    </div>
  )
}

function makeQ(level: number) {
  if (level < 3) {
    const a = 10 + Math.floor(Math.random() * 20)
    const b = 2 + Math.floor(Math.random() * 8)
    return { q: `${a} × ${b}`, a: a * b }
  }
  if (level < 6) {
    const squares = [9, 16, 25, 36, 49, 64, 81, 100, 121, 144]
    const n = squares[Math.floor(Math.random() * squares.length)]
    return { q: `√${n}`, a: Math.sqrt(n) }
  }
  if (level < 9) {
    const n = 50 + Math.floor(Math.random() * 150)
    const p = [10, 15, 20, 25][Math.floor(Math.random() * 4)]
    return { q: `${p}% of ${n}`, a: (p / 100) * n }
  }
  const a = 12 + Math.floor(Math.random() * 48)
  const b = [2, 3, 4, 6, 8][Math.floor(Math.random() * 5)]
  return { q: `${a * b} ÷ ${b}`, a }
}

function MistakeGame() {
  const { play, markGamePlayed } = useExperience()
  const problems = useMemo(
    () => [
      {
        steps: ["x + 5 = 12", "x = 12 + 5", "x = 17"],
        wrong: 1,
      },
      {
        steps: ["3(x + 2) = 12", "3x + 2 = 12", "3x = 10"],
        wrong: 1,
      },
      {
        steps: ["(x²)' = 2x", "(x³)' = 3x", "(x³)' = 3x²"],
        wrong: 1,
      },
    ],
    [],
  )
  const [i, setI] = useState(0)
  const [msg, setMsg] = useState("")
  const p = problems[i]

  return (
    <div>
      <p className="mb-4 text-mute">Tap the incorrect step.</p>
      {p.steps.map((s, idx) => (
        <button
          key={s}
          type="button"
          className="eq glass mb-2 min-h-12 w-full rounded-2xl px-4 text-left"
          onClick={() => {
            if (idx === p.wrong) {
              play("correct")
              if (i === problems.length - 1) {
                setMsg("All errors found. A teacher would be proud.")
                markGamePlayed()
              } else {
                setI(i + 1)
                setMsg("There it is.")
              }
            } else setMsg("That step is actually fine.")
          }}
        >
          {s}
        </button>
      ))}
      <p className="mt-4 text-mute">{msg}</p>
    </div>
  )
}

function EquationEscape() {
  const { play, markGamePlayed } = useExperience()
  const locks = [
    { q: "x − 4 = 9", a: 13 },
    { q: "2x + 1 = 11", a: 5 },
    { q: "√81", a: 9 },
  ]
  const [i, setI] = useState(0)
  const [val, setVal] = useState("")
  const open = i >= locks.length

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 grid h-48 w-40 grid-rows-3 overflow-hidden rounded-[28px] border border-gold/40">
        {locks.map((_, idx) => (
          <div key={idx} className={`border-b border-gold/20 ${idx < i ? "bg-gold/30" : "bg-ink"}`} />
        ))}
      </div>
      {open ? (
        <p className="text-2xl text-gold">DOOR UNLOCKED</p>
      ) : (
        <>
          <p className="eq text-2xl">{locks[i].q}</p>
          <input
            className="eq glass mt-4 h-12 w-32 rounded-2xl text-center"
            value={val}
            inputMode="numeric"
            aria-label="Lock answer"
            onChange={(e) => setVal(e.target.value)}
          />
          <div className="mt-4">
            <ActionButton
              onClick={() => {
                if (Number(val) === locks[i].a) {
                  play("unlock")
                  const n = i + 1
                  setI(n)
                  setVal("")
                  if (n === locks.length) markGamePlayed()
                }
              }}
            >
              UNLOCK
            </ActionButton>
          </div>
        </>
      )}
    </div>
  )
}

function NumberMemory() {
  const { play, markGamePlayed, recordScore } = useExperience()
  const [len, setLen] = useState(3)
  const [seq, setSeq] = useState(() => makeSeq(3))
  const [show, setShow] = useState(true)
  const [val, setVal] = useState("")

  useEffect(() => {
    setShow(true)
    const t = window.setTimeout(() => setShow(false), 900 + len * 180)
    return () => window.clearTimeout(t)
  }, [seq, len])

  return (
    <div className="text-center">
      <p className="text-mute">Hold the sequence.</p>
      <p className="eq mt-6 text-3xl tracking-[0.3em]">{show ? seq.join(" ") : "• • •"}</p>
      {!show && (
        <>
          <input
            className="eq glass mt-6 h-12 w-56 rounded-2xl text-center"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            aria-label="Sequence"
          />
          <div className="mt-4">
            <ActionButton
              onClick={() => {
                const got = val.replaceAll(/\s/g, "")
                if (got === seq.join("")) {
                  play("correct")
                  const n = len + 1
                  setLen(n)
                  setSeq(makeSeq(n))
                  setVal("")
                  recordScore("memory", n - 1)
                } else {
                  markGamePlayed()
                  setVal("try again")
                }
              }}
            >
              RECALL
            </ActionButton>
          </div>
        </>
      )}
    </div>
  )
}

function makeSeq(n: number) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10))
}

function WhichGraph() {
  const { play, markGamePlayed } = useExperience()
  const items = [
    { eq: "y = x²", correct: 0, fns: [(x: number) => x * x, (x: number) => -x * x, (x: number) => x, (x: number) => Math.sin(x)] },
    { eq: "y = sin(x)", correct: 2, fns: [(x: number) => x * x, (x: number) => Math.abs(x), (x: number) => Math.sin(x), (x: number) => Math.cos(x) * 0 + 1.5] },
  ]
  const [i, setI] = useState(0)
  const [msg, setMsg] = useState("")
  const item = items[i]
  return (
    <div>
      <p className="eq mb-4 text-xl">{item.eq}</p>
      <div className="grid grid-cols-2 gap-3">
        {item.fns.map((fn, idx) => (
          <button
            key={idx}
            type="button"
            className="glass h-28 overflow-hidden rounded-2xl"
            onClick={() => {
              if (idx === item.correct) {
                play("correct")
                if (i === items.length - 1) {
                  setMsg("Graphs bow to you.")
                  markGamePlayed()
                } else {
                  setI(i + 1)
                  setMsg("Beautiful.")
                }
              } else setMsg("Close — look at the curvature.")
            }}
          >
            <GraphCanvas fn={fn} animate={false} />
          </button>
        ))}
      </div>
      <p className="mt-4 text-mute">{msg}</p>
    </div>
  )
}
