import { lazy, Suspense, useMemo } from 'react'
import { sections, theme, profile } from './content.js'
import { sectionComponents } from './sections/index.js'

// three.js is ~180 kB gzipped — keep it off the critical path so text paints
// first. The CSS aurora covers the gap, so there is nothing to fall back to.
const Background = lazy(() => import('./three/Background.jsx'))
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import useSmoothScroll from './hooks/useSmoothScroll.js'
import useThemeVars from './hooks/useThemeVars.js'
import useDocumentTitle from './hooks/useDocumentTitle.js'

export default function App() {
  useSmoothScroll()
  useThemeVars(theme)
  useDocumentTitle(`${profile.name} — ${profile.role}`)

  // A section renders only if it is enabled AND a component exists for its id.
  const active = useMemo(
    () => sections.filter((s) => s.enabled && sectionComponents[s.id]),
    []
  )

  return (
    <>
      <Suspense fallback={<div className="backdrop"><div className="backdrop__aurora" /></div>}>
        <Background />
      </Suspense>
      <ScrollProgress />
      <Cursor />
      <Nav items={active.filter((s) => s.inNav)} />
      <main id="main">
        {active.map(({ id }) => {
          const Section = sectionComponents[id]
          return <Section key={id} id={id} />
        })}
      </main>
      <Footer />
    </>
  )
}
