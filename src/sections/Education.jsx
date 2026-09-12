import { education } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Education({ id }) {
  return (
    <Section id={id} title={education.heading}>
      <div className="timeline">
        {education.items.map((item, i) => (
          <Reveal key={`${item.org}-${item.degree}`} delay={0.06 * i}>
            <div className="timeline__node">
              <GlassCard tilt={4}>
                <div className="entry__top">
                  <h3 className="entry__role">
                    {item.degree} <span className="entry__org">· {item.org}</span>
                  </h3>
                  <span className="entry__meta">
                    {item.start} — {item.end}
                    {item.location ? ` · ${item.location}` : ''}
                  </span>
                </div>
                {item.detail && (
                  <p className="muted" style={{ marginTop: '0.7rem' }}>
                    {item.detail}
                  </p>
                )}
              </GlassCard>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
