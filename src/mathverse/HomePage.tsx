import { Link } from "react-router-dom"
import { ActionButton } from "../components/ActionButton"
import { TripleTitle } from "../components/EasterEggs"
import { teacher } from "../content/teacher"
import { useExperience } from "../context/Experience"

export function HomePage() {
  const { completedPuzzles } = useExperience()
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-5 pb-28 pt-24 text-center">
      <p className="eq text-xs tracking-[0.4em] text-gold">{teacher.universe}</p>
      <TripleTitle className="serif mt-4 text-5xl text-paper sm:text-7xl">{teacher.title}</TripleTitle>
      <p className="mt-5 text-xl text-mute">{teacher.tagline}</p>
      <p className="mt-3 text-mute">{teacher.supporting}</p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/lab">
          <ActionButton>EXPLORE THE MATHVERSE</ActionButton>
        </Link>
        <Link to="/surprise">
          <ActionButton variant="ghost">READ YOUR MESSAGE</ActionButton>
        </Link>
      </div>
      <Link to="/memories" className="mt-6 text-sm text-gold underline-offset-4 hover:underline">
        Open the memory constellation
      </Link>
      <p className="eq mt-10 text-sm text-mute">
        Secret Mission: Completed ✓
        {completedPuzzles.length ? ` · ${completedPuzzles.length} traces remain` : ""}
      </p>
    </div>
  )
}
