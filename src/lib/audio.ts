let ctx: AudioContext | null = null

function context() {
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = new Ctor()
  }
  return ctx
}

async function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  delay = 0,
) {
  const audio = context()
  if (audio.state === "suspended") await audio.resume()
  const now = audio.currentTime + delay
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, now)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(now)
  osc.stop(now + duration + 0.02)
}

export const sfx = {
  async click(enabled: boolean) {
    if (!enabled) return
    await tone(420, 0.07, "triangle", 0.04)
  },
  async correct(enabled: boolean) {
    if (!enabled) return
    await tone(523.25, 0.12, "sine", 0.05)
    await tone(659.25, 0.16, "sine", 0.05, 0.08)
  },
  async unlock(enabled: boolean) {
    if (!enabled) return
    await tone(392, 0.14, "triangle", 0.05)
    await tone(523, 0.18, "triangle", 0.05, 0.1)
    await tone(784, 0.22, "sine", 0.045, 0.2)
  },
  async whoosh(enabled: boolean) {
    if (!enabled) return
    await tone(180, 0.22, "sawtooth", 0.02)
  },
  async chime(enabled: boolean) {
    if (!enabled) return
    await tone(523.25, 0.25, "sine", 0.05)
    await tone(659.25, 0.3, "sine", 0.045, 0.12)
    await tone(783.99, 0.4, "sine", 0.04, 0.24)
    await tone(1046.5, 0.5, "triangle", 0.03, 0.36)
  },
}
