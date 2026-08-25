import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { sfx } from "../lib/audio"
import {
  bumpGamesPlayed,
  completePuzzle,
  getCompletedPuzzles,
  getGamesPlayed,
  getHighScores,
  getReducedMotion,
  getSoundEnabled,
  isBirthdayUnlocked,
  setBirthdayUnlocked,
  setHighScore,
  setReducedMotionPref,
  setSoundEnabled,
} from "../lib/storage"

type ExperienceValue = {
  unlocked: boolean
  unlock: () => void
  soundEnabled: boolean
  setSound: (v: boolean) => void
  reducedMotion: boolean
  setReducedMotion: (v: boolean) => void
  highScores: Record<string, number>
  recordScore: (game: string, score: number) => void
  gamesPlayed: number
  markGamePlayed: () => void
  completedPuzzles: string[]
  markPuzzle: (id: string) => void
  play: (kind: keyof typeof sfx) => void
}

const ExperienceContext = createContext<ExperienceValue | null>(null)

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(isBirthdayUnlocked)
  const [soundEnabled, setSoundState] = useState(getSoundEnabled)
  const [reducedMotion, setMotionState] = useState(getReducedMotion)
  const [highScores, setScores] = useState(getHighScores)
  const [gamesPlayed, setGames] = useState(getGamesPlayed)
  const [completedPuzzles, setPuzzles] = useState(getCompletedPuzzles)

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reducedMotion)
    document.body.classList.toggle("warm", unlocked)
    document.title = unlocked ? "Happy Birthday — Dr. Renu Nagpal" : "Four numbers · one name"
  }, [reducedMotion, unlocked])

  const unlock = useCallback(() => {
    setBirthdayUnlocked()
    setUnlocked(true)
  }, [])

  const setSound = useCallback((v: boolean) => {
    setSoundEnabled(v)
    setSoundState(v)
  }, [])

  const setReducedMotion = useCallback((v: boolean) => {
    setReducedMotionPref(v)
    setMotionState(v)
  }, [])

  const recordScore = useCallback((game: string, score: number) => {
    setHighScore(game, score)
    setScores(getHighScores())
  }, [])

  const markGamePlayed = useCallback(() => {
    bumpGamesPlayed()
    setGames(getGamesPlayed())
  }, [])

  const markPuzzle = useCallback((id: string) => {
    completePuzzle(id)
    setPuzzles(getCompletedPuzzles())
  }, [])

  const play = useCallback(
    (kind: keyof typeof sfx) => {
      void sfx[kind](soundEnabled)
    },
    [soundEnabled],
  )

  const value = useMemo(
    () => ({
      unlocked,
      unlock,
      soundEnabled,
      setSound,
      reducedMotion,
      setReducedMotion,
      highScores,
      recordScore,
      gamesPlayed,
      markGamePlayed,
      completedPuzzles,
      markPuzzle,
      play,
    }),
    [
      unlocked,
      unlock,
      soundEnabled,
      setSound,
      reducedMotion,
      setReducedMotion,
      highScores,
      recordScore,
      gamesPlayed,
      markGamePlayed,
      completedPuzzles,
      markPuzzle,
      play,
    ],
  )

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience() {
  const ctx = useContext(ExperienceContext)
  if (!ctx) throw new Error("Experience missing")
  return ctx
}
