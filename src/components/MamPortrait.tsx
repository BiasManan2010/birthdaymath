export function MamPortrait({
  size = "lg",
  className = "",
}: {
  size?: "sm" | "lg"
  className?: string
}) {
  const box = size === "lg" ? "h-52 w-52 sm:h-64 sm:w-64" : "h-28 w-28"
  const src = `${import.meta.env.BASE_URL}mam.png`
  return (
    <figure className={`mx-auto ${className}`}>
      <div className={`${box} overflow-hidden rounded-full border border-ink`}>
        <img
          src={src}
          alt="Dr. Renu Nagpal"
          width={360}
          height={640}
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 22%" }}
        />
      </div>
    </figure>
  )
}
