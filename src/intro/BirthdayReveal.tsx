import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ActionButton } from "../components/ActionButton"
import { student, teacher } from "../content/teacher"
import { useExperience } from "../context/Experience"

const BEATS = [
  {
    k: "title",
    node: (
      <>
        <p className="serif text-5xl leading-tight sm:text-7xl">Happy Birthday</p>
        <p className="serif mt-4 text-3xl italic sm:text-4xl">{teacher.title}</p>
      </>
    ),
  },
  {
    k: "heart",
    node: (
      <>
        <p className="eq tracking-[0.4em]">R · E · N · U</p>
        <p className="serif mt-8 text-2xl leading-snug sm:text-3xl">
          Four letters.
          <br />
          One teacher.
          <br />
          Infinite patience.
        </p>
      </>
    ),
  },
  {
    k: "note",
    node: (
      <p className="serif max-w-md text-2xl leading-relaxed sm:text-3xl">
        {teacher.birthdayMessage}
        <br />
        <span className="mt-4 block text-xl text-mute">
          Thank you for making a difficult subject feel possible — and for staying until it clicked.
        </span>
      </p>
    ),
  },
  {
    k: "sign",
    node: (
      <>
        <p className="serif text-xl italic">With respect,</p>
        <p className="serif mt-2 text-3xl">{student.name}</p>
        <p className="eq mt-3 text-sm tracking-wide text-mute">
          {student.section} · {student.roll}
          <br />
          {student.programme}
        </p>
        <p className="eq mt-6 text-xs tracking-[0.28em]">{teacher.date}</p>
      </>
    ),
  },
] as const

export function BirthdayReveal({ onEnter }: { onEnter: () => void }) {
  const { play, unlock, reducedMotion } = useExperience()
  const chimed = useRef(false)
  const [beat, setBeat] = useState(0)

  useEffect(() => {
    document.body.classList.add("warm")
    if (chimed.current) return
    chimed.current = true
    play("chime")
  }, [play])

  const last = beat >= BEATS.length - 1

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 text-[18vw] leading-none sm:text-[7rem]"
      >
        ∞
      </motion.p>
      <div className="glass w-full max-w-lg rounded-none bg-cream/70 px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={BEATS[beat].k}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {BEATS[beat].node}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="eq mt-5 text-[11px] tracking-[0.3em] text-mute">
        {beat + 1} / {BEATS.length}
      </p>
      {!last ? (
        <ActionButton className="mt-8 w-full max-w-xs" onClick={() => setBeat((b) => b + 1)}>
          CONTINUE →
        </ActionButton>
      ) : (
        <ActionButton
          className="mt-8 w-full max-w-xs"
          onClick={() => {
            unlock()
            onEnter()
          }}
        >
          ENTER THE MATHVERSE →
        </ActionButton>
      )}
    </div>
  )
}
