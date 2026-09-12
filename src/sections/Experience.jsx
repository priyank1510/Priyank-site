import { experience } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Experience({ id }) {
  return (
    <Section id={id} title={experience.heading}>
      <div className="timeline">
        {experience.items.map((item, i) => (
          <Reveal key={`${item.org}-${item.role}`} delay={0.06 * i}>
            <div className="timeline__node">
              <GlassCard tilt={4}>
                <div className="entry__top">
                  <h3 className="entry__role">
                    {item.role} <span className="entry__org">· {item.org}</span>
                  </h3>
                  <span className="entry__meta">
                    {item.start} — {item.end}
                    {item.location ? ` · ${item.location}` : ''}
                  </span>
                </div>

                {item.points?.length > 0 && (
                  <ul className="entry__points">
                    {item.points.map((point, k) => (
                      <li key={k}>{point}</li>
                    ))}
                  </ul>
                )}

                {item.tags?.length > 0 && (
                  <div className="entry__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
