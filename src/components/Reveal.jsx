import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion.js'

/** Fade + rise on first scroll into view. */
export default function Reveal({ children, delay = 0, y = 26, ...rest }) {
  const reduced = useReducedMotion()

  if (reduced) return <div {...rest}>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
