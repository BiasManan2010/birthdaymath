import { motion } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { useExperience } from "../context/Experience"

type Props = {
  children: ReactNode
  variant?: "primary" | "ghost" | "gold"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function ActionButton({ children, className = "", onClick, disabled }: Props) {
  const { play, reducedMotion } = useExperience()
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      className={`min-h-12 min-w-12 rounded-full border border-ink bg-transparent px-7 py-3 text-[15px] font-medium tracking-wide text-ink ${className}`}
      onClick={() => {
        play("click")
        onClick?.()
      }}
      onPointerMove={(e) => {
        if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width / 2) * 0.14
        const y = (e.clientY - r.top - r.height / 2) * 0.14
        ref.current.style.transform = `translate(${x}px, ${y}px)`
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = ""
      }}
    >
      {children}
    </motion.button>
  )
}
