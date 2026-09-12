import { contact } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Contact({ id }) {
  return (
    <Section id={id} title={contact.heading}>
      <Reveal>
        <GlassCard tilt={3}>
          <div className="contact__card">
            <div>
              <h3 className="contact__headline">{contact.headline}</h3>
              <p className="muted" style={{ marginTop: '0.8rem', maxWidth: '44ch' }}>
                {contact.blurb}
              </p>
              {contact.email && (
                <a className="contact__email" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              )}
            </div>

            {contact.socials?.length > 0 && (
              <div className="contact__socials">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    className="social"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{s.label}</span>
                    <span>↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  )
}
