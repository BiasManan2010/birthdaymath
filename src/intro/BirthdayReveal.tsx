import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { ActionButton } from "../components/ActionButton"
import { teacher } from "../content/teacher"
import { useExperience } from "../context/Experience"

export function BirthdayReveal({ onEnter }: { onEnter: () => void }) {
  const { play, unlock, reducedMotion } = useExperience()
  const chimed = useRef(false)

  useEffect(() => {
    document.body.classList.add("warm")
    if (chimed.current) return
    chimed.current = true
    play("chime")
  }, [play])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-[22vw] leading-none text-gold"
      >
        ∞
      </motion.p>
      <p className="serif mt-2 text-4xl text-gold sm:text-6xl">HAPPY BIRTHDAY</p>
      <p className="serif mt-3 text-3xl italic sm:text-4xl">{teacher.title}</p>
      <div className="mt-10 max-w-md space-y-4 text-lg text-mute">
        <p>{teacher.birthdayMessage}</p>
        <p>Thank you for making mathematics meaningful.</p>
        <p className="text-rose">❤️</p>
        <p className="eq text-sm tracking-[0.25em] text-gold/80">{teacher.date}</p>
      </div>
      <ActionButton
        variant="gold"
        className="mt-10 w-full max-w-xs"
        onClick={() => {
          unlock()
          onEnter()
        }}
      >
        ENTER THE MATHVERSE →
      </ActionButton>
    </div>
  )
}
