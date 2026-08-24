import { useEffect, useState } from "react"
import { ActionButton } from "../components/ActionButton"

const BARS = [
  { label: "Mathematical ability", value: 100 },
  { label: "Pattern recognition", value: 100 },
  { label: "Problem solving", value: 100 },
  { label: "Identity", value: 0, unknown: true },
]

export function SystemAnalysis({ onNext }: { onNext: () => void }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col justify-center px-5">
      <div className="glass mx-auto w-full max-w-lg rounded-3xl p-6">
        <p className="eq text-[11px] tracking-[0.28em] text-cyan/80">ANALYSIS COMPLETE</p>
        <div className="mt-6 space-y-5">
          {BARS.map((b) => (
            <div key={b.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{b.label}</span>
                <span className="eq text-mute">{b.unknown ? "UNKNOWN" : `${b.value}%`}</span>
              </div>
              <div className="h-2 rounded-full bg-white/8">
                <div
                  className={`h-full rounded-full ${b.unknown ? "w-[8%] bg-rose/70" : "w-full bg-linear-to-r from-violet to-cyan"}`}
                />
              </div>
            </div>
          ))}
        </div>
        {ready && (
          <div className="mt-8">
            <p className="text-mute">We need one more piece of information.</p>
            <ActionButton className="mt-5 w-full" onClick={onNext}>
              CONTINUE
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  )
}
