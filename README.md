# One of my vibe coded creation for killing time.

# Glass portfolio

A 3D glassmorphism personal site: React + Vite, a `react-three-fiber` scene behind
frosted glass panels, scroll-driven camera, momentum scrolling, and a content
layer you edit without touching any components.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built output
```

## Where the content lives

Everything you'd want to change is in **`src/content.js`** — name, role, hero
copy, about, skills, experience, education, contact, socials, colours, and the
section registry. No JSX edits needed for normal updates.

## Adding the Projects section later

It is already built (`src/sections/Projects.jsx`) and wired in, just switched
off. When you're ready, in `src/content.js`:

```js
export const projects = {
  heading: 'Projects',
  enabled: true,                    // 1. flip this
  items: [                          // 2. add entries
    {
      title: 'Thing I built',
      blurb: 'One or two sentences on what it does.',
      tags: ['React', 'Three.js'],
      links: { live: 'https://…', repo: 'https://…' },
      image: '/projects/thing.png', // optional, file goes in public/
      year: '2026',
      featured: true,               // featured cards span two columns
    },
  ],
}
```

The nav link, section numbering, scroll-spy, and reveal animations pick it up
automatically. Until items exist, the section shows a tidy "coming soon" panel.

## Adding a brand-new kind of section

1. Create `src/sections/Writing.jsx` (copy `Skills.jsx` as a starting point).
2. Register it in `src/sections/index.js`: `writing: Writing`.
3. Add to `sections` in `src/content.js`, wherever you want it in the order:
   `{ id: 'writing', label: 'Writing', enabled: true, inNav: true }`.

`Certifications` was added exactly this way and is a working example to copy.
It uses `inNav: false`, which renders the section but keeps the nav short.

Reordering that array reorders the page. `enabled: false` hides anything.

## The 3D layer

`src/three/Background.jsx` is a fixed, pointer-events-free canvas behind the
page. It is deliberately faint — it sits under body copy, so it reads as
atmosphere rather than an object.

Controls in `theme` (bottom of `content.js`):

- `scene`: `'crystals'` | `'particles'` | `'none'`
- `accentA/B/C`: drive both the CSS glass tint and the 3D light rig
- `adaptivePerformance`: drops DPI, antialiasing, and transmission when the
  frame rate sags

It degrades cleanly: the CSS aurora underneath is always painted, so if WebGL is
unavailable, the scene is set to `'none'`, or the visitor has
`prefers-reduced-motion: reduce`, the page still looks finished — it just stops
moving.

## Project layout

```
src/
  content.js            ← edit this
  App.jsx               reads the section registry, renders what's enabled
  sections/             one file per section + index.js registry
  components/           GlassCard, Section, Reveal, Nav, Cursor, …
  three/                the WebGL backdrop
  hooks/                smooth scroll, scroll-spy, pointer, reduced motion
  styles/global.css     design tokens + the glass system
public/                 static files (résumé PDF, project images, avatar)
```

## Deploying

`npm run build` produces a static `dist/` — drop it on Netlify, Vercel, Cloudflare
Pages, or GitHub Pages. For GitHub Pages under `user.github.io/repo`, set
`base: '/repo/'` in `vite.config.js` first.
