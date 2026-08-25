import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { SettingsBar } from "../components/SettingsBar"
import { SymbolField } from "../components/SymbolField"
import { useExperience } from "../context/Experience"
import { fadeUp, transition } from "../lib/motion"
import { BirthdayReveal } from "./BirthdayReveal"
import { RenuSpell } from "./RenuSpell"

export function IntroExperience({ onEnter }: { onEnter: () => void }) {
  const { reducedMotion } = useExperience()
  const [note, setNote] = useState(false)
  const anim = fadeUp(reducedMotion)

  return (
    <div className="relative min-h-[100dvh]">
      <SymbolField density={7} connect={!note} />
      <SettingsBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={note ? "note" : "spell"}
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={transition(reducedMotion)}
        >
          {note ? <BirthdayReveal onEnter={onEnter} /> : <RenuSpell onNext={() => setNote(true)} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
