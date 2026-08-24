import type { Transition } from "framer-motion"

export function transition(reduced: boolean, extra?: Transition): Transition {
  if (reduced) return { duration: 0 }
  return { type: "spring", stiffness: 280, damping: 28, ...extra }
}

export function fadeUp(reduced: boolean) {
  return {
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: reduced ? { opacity: 0 } : { opacity: 0, y: -12 },
  }
}
