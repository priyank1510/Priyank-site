import { certifications } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Certifications({ id }) {
  return (
    <Section id={id} title={certifications.heading}>
      <div className="grid certs">
        {certifications.items.map((item, i) => (
          <Reveal key={item} delay={0.07 * i}>
            <GlassCard>
              <span className="mono-label">Certified</span>
              <h3 className="certs__name">{item}</h3>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
