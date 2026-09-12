import { useMemo } from 'react'
import { sections } from '../content.js'
import Reveal from './Reveal.jsx'

/** Section shell: anchor id, numbered heading, and the scroll reveal. */
export default function Section({ id, title, children, className = '' }) {
  const index = useMemo(() => {
    const visible = sections.filter((s) => s.enabled && s.inNav)
    const i = visible.findIndex((s) => s.id === id)
    return i < 0 ? null : String(i + 1).padStart(2, '0')
  }, [id])

  return (
    <section id={id} className={`section ${className}`}>
      <Reveal>
        <header className="section__head">
          {index && <span className="section__index">{index}</span>}
          <h2 className="section__title">{title}</h2>
          <span className="section__rule" />
        </header>
      </Reveal>
      {children}
    </section>
  )
}
