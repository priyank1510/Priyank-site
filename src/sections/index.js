/**
 * Section id -> component. The order of the page comes from `sections` in
 * content.js, not from this file.
 *
 * To add a whole new kind of section later (e.g. "Writing"):
 *   1. create src/sections/Writing.jsx
 *   2. register it here as `writing: Writing`
 *   3. add { id: 'writing', label: 'Writing', enabled: true, inNav: true }
 *      to `sections` in content.js, wherever you want it to appear
 */
import Hero from './Hero.jsx'
import About from './About.jsx'
import Skills from './Skills.jsx'
import Experience from './Experience.jsx'
import Projects from './Projects.jsx'
import Education from './Education.jsx'
import Certifications from './Certifications.jsx'
import Contact from './Contact.jsx'

export const sectionComponents = {
  hero: Hero,
  about: About,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  education: Education,
  certifications: Certifications,
  contact: Contact,
}
