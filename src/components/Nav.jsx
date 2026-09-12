import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../content.js'
import useScrollSpy from '../hooks/useScrollSpy.js'

/** Floating glass nav. Links come from the section registry, not hard-coded. */
export default function Nav({ items }) {
  const ids = useMemo(() => items.map((i) => i.id), [items])
  const active = useScrollSpy(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <>
      <motion.nav
        className="nav glass"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <a className="nav__brand" href="#hero">
          {initials}
          <span>.</span>
        </a>

        <ul className="nav__links">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className="nav__link"
                href={`#${item.id}`}
                aria-current={active === item.id}
              >
                {active === item.id && (
                  <motion.span
                    className="nav__indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span />
        </button>
      </motion.nav>

      <div
        className={`nav__sheet glass ${open ? 'nav__sheet--open' : ''}`}
        onClick={() => setOpen(false)}
      >
        {items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
