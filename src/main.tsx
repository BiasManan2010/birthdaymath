import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import App from "./App.tsx"
import { ExperienceProvider } from "./context/Experience.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExperienceProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ExperienceProvider>
  </StrictMode>,
)
