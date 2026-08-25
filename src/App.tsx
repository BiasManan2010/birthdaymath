import { IntroExperience } from "./intro/IntroExperience"
import { SettingsBar } from "./components/SettingsBar"
import { SymbolField } from "./components/SymbolField"
import { EasterEggs } from "./components/EasterEggs"
import { useExperience } from "./context/Experience"
import { WishPage } from "./mathverse/WishPage"

export default function App() {
  const { unlocked } = useExperience()

  if (!unlocked) {
    return <IntroExperience />
  }

  return (
    <div className="relative min-h-[100dvh]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-ink focus:bg-cream focus:px-4 focus:py-2"
      >
        Skip to letter
      </a>
      <SymbolField density={6} connect />
      <SettingsBar />
      <EasterEggs />
      <main id="main" className="relative z-10">
        <WishPage />
      </main>
    </div>
  )
}
