import { NavLink, useLocation } from "react-router-dom"
import { teacher } from "../content/teacher"
import { TripleTitle } from "./EasterEggs"

const ITEMS = [
  { to: "/", label: "HOME", short: "HOME" },
  { to: "/lab", label: "MATH LAB", short: "LAB" },
  { to: "/play", label: "PLAY", short: "PLAY" },
  { to: "/messages", label: "MESSAGES", short: "MSG" },
  { to: "/surprise", label: "SURPRISE", short: "✦" },
]

export function MathverseNav() {
  const loc = useLocation()
  return (
    <>
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 hidden px-6 pt-5 md:block">
        <div className="pointer-events-auto glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-2">
          <TripleTitle className="eq text-sm tracking-[0.28em] text-gold">
            {teacher.universe}
          </TripleTitle>
          <nav className="flex gap-1" aria-label="Primary">
            {ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm ${isActive || (item.to === "/surprise" && loc.pathname === "/memories") ? "bg-white/10 text-paper" : "text-mute"}`
                }
              >
                {item.label === "PLAY" ? "GAMES" : item.label === "HOME" ? "Home" : item.label === "MATH LAB" ? "Math Lab" : item.label === "MESSAGES" ? "Messages" : "Surprise"}
              </NavLink>
            ))}
            <NavLink
              to="/memories"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm ${isActive ? "bg-white/10 text-paper" : "text-mute"}`
              }
            >
              Memories
            </NavLink>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Mobile"
        className="glass fixed right-3 bottom-3 left-3 z-40 flex justify-between rounded-full px-2 py-2 md:hidden"
      >
        {ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-full text-[11px] tracking-wide ${
                isActive ? "bg-white/12 text-paper" : "text-mute"
              }`
            }
          >
            {item.short}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
