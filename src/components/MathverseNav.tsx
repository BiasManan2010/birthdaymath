import { NavLink, useLocation } from "react-router-dom"
import { teacher } from "../content/teacher"
import { TripleTitle } from "./EasterEggs"

const ITEMS = [
  { to: "/", label: "Home", short: "HOME" },
  { to: "/lab", label: "Math Lab", short: "LAB" },
  { to: "/play", label: "Games", short: "PLAY" },
  { to: "/messages", label: "Messages", short: "MSG" },
  { to: "/surprise", label: "Letter", short: "✦" },
]

export function MathverseNav() {
  const loc = useLocation()
  return (
    <>
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 hidden px-6 pt-5 md:block">
        <div className="pointer-events-auto glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-2">
          <TripleTitle className="eq text-sm tracking-[0.28em]">{teacher.universe}</TripleTitle>
          <nav className="flex gap-1" aria-label="Primary">
            {ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full border px-3 py-2 text-sm ${
                    isActive || (item.to === "/surprise" && loc.pathname === "/memories")
                      ? "border-ink"
                      : "border-transparent text-mute"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/memories"
              className={({ isActive }) =>
                `rounded-full border px-3 py-2 text-sm ${isActive ? "border-ink" : "border-transparent text-mute"}`
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
                isActive ? "border border-ink" : "text-mute"
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
