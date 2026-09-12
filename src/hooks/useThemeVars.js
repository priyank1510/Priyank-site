import { useEffect } from 'react'

/** Pushes the palette from content.js into CSS custom properties. */
export default function useThemeVars(theme) {
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent-a', theme.accentA)
    root.style.setProperty('--accent-b', theme.accentB)
    root.style.setProperty('--accent-c', theme.accentC)
    root.style.setProperty('--bg', theme.background)
  }, [theme])
}
