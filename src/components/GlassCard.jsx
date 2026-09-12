import { useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * The one glass surface used everywhere.
 * Tracks the pointer to drive the specular sheen (--mx/--my) and an optional
 * 3D tilt, both of which are pure CSS once the values are set.
 */
export default function GlassCard({
  as = 'div',
  interactive = true,
  tilt = 8,
  className = '',
  bodyClassName = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const Tag = motion[as] ?? motion.div

  const onPointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (tilt) {
      el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * tilt}deg) rotateY(${(px - 0.5) * tilt}deg) translateY(-4px)`
    }
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (el && tilt) el.style.transform = ''
  }

  return (
    <Tag
      ref={ref}
      className={`glass ${interactive ? 'glass--interactive' : ''} ${className}`}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerLeave={interactive ? onPointerLeave : undefined}
      {...rest}
    >
      <div className={`glass__body ${bodyClassName}`}>{children}</div>
    </Tag>
  )
}
