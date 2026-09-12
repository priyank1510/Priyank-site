import { skills } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Skills({ id }) {
  return (
    <Section id={id} title={skills.heading}>
      <div className="grid skills">
        {skills.groups.map((group, i) => (
          <Reveal key={group.name} delay={0.07 * i}>
            <GlassCard className="skills__group">
              <h3>{group.name}</h3>
              <div className="skills__items">
                {group.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
