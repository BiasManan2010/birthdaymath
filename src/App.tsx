import { Navigate, Route, Routes } from "react-router-dom"
import { IntroExperience } from "./intro/IntroExperience"
import { useExperience } from "./context/Experience"
import { GamesPage } from "./mathverse/GamesPage"
import { HomePage } from "./mathverse/HomePage"
import { MathLabPage } from "./mathverse/MathLabPage"
import { MathverseShell } from "./mathverse/MathverseShell"
import { MemoriesPage } from "./mathverse/MemoriesPage"
import { MessagesPage } from "./mathverse/MessagesPage"
import { SurprisePage } from "./mathverse/SurprisePage"

export default function App() {
  const { unlocked } = useExperience()

  if (!unlocked) {
    return <IntroExperience onEnter={() => undefined} />
  }

  return (
    <Routes>
      <Route element={<MathverseShell />}>
        <Route index element={<HomePage />} />
        <Route path="lab" element={<MathLabPage />} />
        <Route path="play" element={<GamesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="surprise" element={<SurprisePage />} />
        <Route path="memories" element={<MemoriesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
