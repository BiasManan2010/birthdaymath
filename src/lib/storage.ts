const KEYS = {
  unlocked: "birthdayUnlocked",
  puzzles: "completedPuzzles",
  games: "gamesPlayed",
  scores: "highScores",
  sound: "soundEnabled",
  motion: "reducedMotion",
} as const

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode */
  }
}

export function isBirthdayUnlocked() {
  return read(KEYS.unlocked) === "true"
}

export function setBirthdayUnlocked() {
  write(KEYS.unlocked, "true")
}

export function getCompletedPuzzles(): string[] {
  try {
    return JSON.parse(read(KEYS.puzzles) || "[]") as string[]
  } catch {
    return []
  }
}

export function completePuzzle(id: string) {
  const next = Array.from(new Set([...getCompletedPuzzles(), id]))
  write(KEYS.puzzles, JSON.stringify(next))
}

export function getGamesPlayed() {
  return Number(read(KEYS.games) || "0") || 0
}

export function bumpGamesPlayed() {
  write(KEYS.games, String(getGamesPlayed() + 1))
}

export function getHighScores(): Record<string, number> {
  try {
    return JSON.parse(read(KEYS.scores) || "{}") as Record<string, number>
  } catch {
    return {}
  }
}

export function setHighScore(game: string, score: number) {
  const scores = getHighScores()
  scores[game] = Math.max(scores[game] ?? 0, score)
  write(KEYS.scores, JSON.stringify(scores))
}

export function getSoundEnabled() {
  return read(KEYS.sound) === "true"
}

export function setSoundEnabled(value: boolean) {
  write(KEYS.sound, value ? "true" : "false")
}

export function getReducedMotion() {
  if (read(KEYS.motion) === "true") return true
  if (read(KEYS.motion) === "false") return false
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function setReducedMotionPref(value: boolean) {
  write(KEYS.motion, value ? "true" : "false")
}
