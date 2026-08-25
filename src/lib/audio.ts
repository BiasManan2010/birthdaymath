let ctx: AudioContext | null = null

function context() {
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = new Ctor()
  }
  return ctx
}

async function ready() {
  const audio = context()
  if (audio.state === "suspended") await audio.resume()
  return audio
}

async function tone(
  freq: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  delay = 0,
) {
  const audio = await ready()
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

async function melody(
  notes: { f: number; d: number; g?: number; gap?: number }[],
  type: OscillatorType,
) {
  const audio = await ready()
  let t = 0
  for (const n of notes) {
    const now = audio.currentTime + t
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(n.f, now)
    const vol = n.g ?? 0.045
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(vol, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + n.d)
    osc.connect(gain)
    gain.connect(audio.destination)
    osc.start(now)
    osc.stop(now + n.d + 0.02)
    t += n.d + (n.gap ?? 0.04)
  }
}

const C4 = 261.63
const D4 = 293.66
const E4 = 329.63
const F4 = 349.23
const G4 = 392.0
const A4 = 440.0
const C5 = 523.25
const D5 = 587.33

export const sfx = {
  async click(enabled: boolean) {
    if (!enabled) return
    await tone(640, 0.05, "triangle", 0.03)
  },
  async correct(enabled: boolean) {
    if (!enabled) return
    await tone(523.25, 0.12, "sine", 0.05)
    await tone(659.25, 0.16, "sine", 0.05, 0.08)
  },
  async wrong(enabled: boolean) {
    if (!enabled) return
    await tone(196, 0.14, "square", 0.025)
    await tone(155, 0.18, "square", 0.02, 0.08)
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
  async wish(enabled: boolean) {
    if (!enabled) return
    await melody(
      [
        { f: C4, d: 0.18 },
        { f: C4, d: 0.12 },
        { f: D4, d: 0.28 },
        { f: C4, d: 0.28 },
        { f: F4, d: 0.28 },
        { f: E4, d: 0.5, gap: 0.12 },
        { f: C4, d: 0.18 },
        { f: C4, d: 0.12 },
        { f: D4, d: 0.28 },
        { f: C4, d: 0.28 },
        { f: G4, d: 0.28 },
        { f: F4, d: 0.5, gap: 0.12 },
        { f: C4, d: 0.18 },
        { f: C4, d: 0.12 },
        { f: C5, d: 0.28 },
        { f: A4, d: 0.28 },
        { f: F4, d: 0.28 },
        { f: E4, d: 0.28 },
        { f: D4, d: 0.45, gap: 0.1 },
        { f: D5, d: 0.18 },
        { f: D5, d: 0.12 },
        { f: C5, d: 0.28 },
        { f: A4, d: 0.28 },
        { f: G4, d: 0.28 },
        { f: F4, d: 0.7, g: 0.05 },
      ],
      "triangle",
    )
  },
}
