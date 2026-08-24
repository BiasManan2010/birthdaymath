export function dist(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(bx - ax, by - ay)
}

export function triangleMetrics(
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
) {
  const ab = dist(a.x, a.y, b.x, b.y)
  const bc = dist(b.x, b.y, c.x, c.y)
  const ca = dist(c.x, c.y, a.x, a.y)
  const angle = (opposite: number, x: number, y: number) => {
    const cos = (x * x + y * y - opposite * opposite) / (2 * x * y)
    return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI
  }
  const area = Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2)
  return {
    ab,
    bc,
    ca,
    angleA: angle(bc, ab, ca),
    angleB: angle(ca, ab, bc),
    angleC: angle(ab, bc, ca),
    area,
    perimeter: ab + bc + ca,
  }
}

function isSafeExpr(src: string) {
  const cleaned = src
    .toLowerCase()
    .replaceAll("π", "pi")
    .replaceAll(/sin|cos|tan|sqrt|abs|log|pi/g, "")
  return /^[0-9+\-*/^().,\sxa-ce]+$/.test(cleaned)
}

export function compileExpr(raw: string) {
  const src = raw.trim().replace(/^y\s*=\s*/i, "")
  if (!src || !isSafeExpr(src)) return null
  if (src.includes("function") || src.includes("=>") || src.includes(";")) return null
  const e = src
    .toLowerCase()
    .replaceAll("π", "pi")
    .replaceAll("sin", "Math.sin")
    .replaceAll("cos", "Math.cos")
    .replaceAll("tan", "Math.tan")
    .replaceAll("sqrt", "Math.sqrt")
    .replaceAll("abs", "Math.abs")
    .replaceAll("log", "Math.log")
    .replaceAll("pi", "Math.PI")
    .replaceAll(/\be\b/g, "Math.E")
    .replaceAll("^", "**")
  try {
    const fn = new Function("x", "a", "b", "c", `"use strict"; return (${e});`)
    fn(0.1, 1, 0, 0)
    return (x: number, a: number, b: number, c: number) => {
      try {
        const y = Number(fn(x, a, b, c))
        return Number.isFinite(y) ? y : NaN
      } catch {
        return NaN
      }
    }
  } catch {
    return null
  }
}

export function letterFromNumber(n: number) {
  if (n < 1 || n > 26) return null
  return String.fromCharCode(64 + n)
}
