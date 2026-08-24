import { Outlet } from "react-router-dom"
import { EasterEggs } from "../components/EasterEggs"
import { HiddenSurprise } from "../components/HiddenSurprise"
import { MathverseNav } from "../components/MathverseNav"
import { SettingsBar } from "../components/SettingsBar"

export function MathverseShell() {
  return (
    <div className="relative min-h-[100dvh]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <SettingsBar />
      <MathverseNav />
      <EasterEggs />
      <HiddenSurprise />
      <main id="main">
        <Outlet />
      </main>
    </div>
  )
}
