import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, contact } from '../content.js'

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ id }) {
  const taglines = profile.taglines?.length ? profile.taglines : [profile.role]
  const [i, setI] = useState(0)

  useEffect(() => {
    if (taglines.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % taglines.length), 2800)
    return () => clearInterval(t)
  }, [taglines.length])

  return (
    <section id={id} className="hero">
      <motion.span
        className="hero__status pill"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.1 }}
      >
        <i className="hero__dot" />
        Available · {profile.location}
      </motion.span>

      <motion.h1
        className="hero__name"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
      >
        {profile.name}
      </motion.h1>

      <motion.div
        className="hero__role"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.32 }}
      >
        <span>{profile.role} who</span>
        <span className="hero__rotator">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={i}
              initial={{ opacity: 0, y: '0.5em' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-0.5em' }}
              transition={{ duration: 0.45, ease }}
              style={{ display: 'inline-block' }}
            >
              {taglines[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.div>

      <motion.p
        className="hero__summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.44 }}
      >
        {profile.summary}
      </motion.p>

      <motion.div
        className="hero__actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.56 }}
      >
        <a className="btn btn--primary" href="#contact">
          Get in touch
        </a>
        {contact.email && (
          <a className="btn" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        )}
        {profile.resumeUrl && (
          <a className="btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            Résumé
          </a>
        )}
      </motion.div>

      <motion.div
        className="hero__scroll mono-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <i />
        Scroll
      </motion.div>
    </section>
  )
}
