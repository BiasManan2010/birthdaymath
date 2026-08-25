import { useExperience } from "../context/Experience"

export function SettingsBar() {
  const { soundEnabled, setSound, reducedMotion, setReducedMotion, play } = useExperience()
  return (
    <div className="pointer-events-auto fixed top-3 right-3 z-50 flex gap-2">
      <button
        type="button"
        className="glass min-h-11 min-w-11 rounded-full px-3 text-xs tracking-wide text-mute"
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
        onClick={() => {
          const next = !soundEnabled
          setSound(next)
          if (next) play("chime")
        }}
      >
        {soundEnabled ? "SOUND ON" : "SOUND OFF"}
      </button>
      <button
        type="button"
        className="glass min-h-11 min-w-11 rounded-full px-3 text-xs tracking-wide text-mute"
        aria-pressed={reducedMotion}
        aria-label="Reduce motion"
        onClick={() => setReducedMotion(!reducedMotion)}
      >
        {reducedMotion ? "MOTION OFF" : "REDUCE MOTION"}
      </button>
    </div>
  )
}
