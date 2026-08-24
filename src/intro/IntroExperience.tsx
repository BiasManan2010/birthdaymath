import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { SettingsBar } from "../components/SettingsBar"
import { SymbolField } from "../components/SymbolField"
import { useExperience } from "../context/Experience"
import { fadeUp, transition } from "../lib/motion"
import { BirthdayReveal } from "./BirthdayReveal"
import { IdentityPuzzle } from "./IdentityPuzzle"
import { SystemLoader } from "./SystemLoader"
import { UnsolvedEquation } from "./UnsolvedEquation"

const SCREENS = ["loader", "equation", "identity", "reveal"] as const

export function IntroExperience({ onEnter }: { onEnter: () => void }) {
  const { reducedMotion } = useExperience()
  const [i, setI] = useState(0)
  const screen = SCREENS[i]
  const next = () => setI((v) => Math.min(v + 1, SCREENS.length - 1))
  const anim = fadeUp(reducedMotion)

  return (
    <div className="relative min-h-[100dvh]">
      <SymbolField density={8} connect={screen !== "reveal"} />
      <SettingsBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={transition(reducedMotion)}
        >
          {screen === "loader" && <SystemLoader onNext={next} />}
          {screen === "equation" && <UnsolvedEquation onNext={next} />}
          {screen === "identity" && <IdentityPuzzle onNext={next} />}
          {screen === "reveal" && <BirthdayReveal onEnter={onEnter} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
