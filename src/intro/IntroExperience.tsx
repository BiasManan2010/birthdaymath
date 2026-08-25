import { SettingsBar } from "../components/SettingsBar"
import { SymbolField } from "../components/SymbolField"
import { RenuSpell } from "./RenuSpell"
import { useExperience } from "../context/Experience"

export function IntroExperience() {
  const { unlock } = useExperience()
  return (
    <div className="relative min-h-[100dvh]">
      <SymbolField density={7} connect />
      <SettingsBar />
      <RenuSpell onNext={unlock} />
    </div>
  )
}
