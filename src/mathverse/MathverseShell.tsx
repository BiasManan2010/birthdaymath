import { Outlet } from "react-router-dom"
import { EasterEggs } from "../components/EasterEggs"
import { HiddenSurprise } from "../components/HiddenSurprise"
import { MathverseNav } from "../components/MathverseNav"
import { SettingsBar } from "../components/SettingsBar"

export function MathverseShell() {
  return (
    <div className="relative min-h-[100dvh]">
      <SettingsBar />
      <MathverseNav />
      <EasterEggs />
      <HiddenSurprise />
      <Outlet />
    </div>
  )
}
