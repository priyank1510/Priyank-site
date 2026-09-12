import { useEffect, useRef } from 'react'

/** Trailing glow ring; hidden on touch devices via CSS. */
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const goal = { ...pos }
    let frame

    const onMove = (e) => {
      goal.x = e.clientX
      goal.y = e.clientY
      const hot = !!e.target.closest?.('a, button, .glass--interactive')
      el.classList.toggle('cursor--hot', hot)
    }

    const loop = () => {
      pos.x += (goal.x - pos.x) * 0.18
      pos.y += (goal.y - pos.y) * 0.18
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="cursor" ref={ref} aria-hidden="true" />
}
