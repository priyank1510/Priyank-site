import { about } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function About({ id }) {
  return (
    <Section id={id} title={about.heading}>
      <div className="grid about">
        <Reveal>
          <GlassCard interactive={false} tilt={0}>
            <div className="about__copy">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="muted">
                  {p}
                </p>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        {about.stats?.length > 0 && (
          <div className="grid about__stats">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.08 * i}>
                <GlassCard>
                  <div className="stat__value">{stat.value}</div>
                  <div className="stat__label">{stat.label}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
