import { profile } from '../content.js'

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        &copy; {new Date().getFullYear()} {profile.name}
      </span>
      <span>Built with React, Three.js and too much glass.</span>
    </footer>
  )
}
