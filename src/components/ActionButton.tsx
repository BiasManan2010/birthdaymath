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

export function ActionButton({ children, variant = "primary", className = "", onClick, disabled }: Props) {
  const { play, reducedMotion } = useExperience()
  const ref = useRef<HTMLButtonElement>(null)

  const palette =
    variant === "gold"
      ? "bg-linear-to-r from-gold to-rose text-ink"
      : variant === "ghost"
        ? "bg-white/6 text-paper border border-white/10"
        : "bg-linear-to-r from-violet to-cyan text-ink"

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      className={`min-h-12 min-w-12 rounded-full px-7 py-3 text-[15px] font-semibold tracking-wide ${palette} shadow-[0_10px_30px_rgba(124,108,255,0.22)] ${className}`}
      onClick={() => {
        play("click")
        onClick?.()
      }}
      onPointerMove={(e) => {
        if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width / 2) * 0.18
        const y = (e.clientY - r.top - r.height / 2) * 0.18
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
