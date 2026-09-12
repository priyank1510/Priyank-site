import { projects } from '../content.js'
import Section from '../components/Section.jsx'
import GlassCard from '../components/GlassCard.jsx'
import Reveal from '../components/Reveal.jsx'

/**
 * Ready but dormant: the registry in content.js keeps this section out of the
 * page until `projects.enabled` is true. Add items to `projects.items` and the
 * cards, nav link, numbering and reveals all come along for free.
 */
export default function Projects({ id }) {
  const items = projects.items ?? []

  return (
    <Section id={id} title={projects.heading}>
      {items.length === 0 ? (
        <Reveal>
          <GlassCard interactive={false} tilt={0}>
            <div className="projects__empty">
              <p className="mono-label">Coming soon</p>
              <p style={{ marginTop: '0.6rem' }}>
                Selected work is being written up.
              </p>
            </div>
          </GlassCard>
        </Reveal>
      ) : (
        <div className="grid projects">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <ProjectCard item={item} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}

function ProjectCard({ item }) {
  const { live, repo } = item.links ?? {}

  return (
    <GlassCard className={item.featured ? 'project--featured' : ''}>
      {item.image && (
        <img className="project__media" src={item.image} alt="" loading="lazy" />
      )}

      <div className="entry__top">
        <h3 className="entry__role">{item.title}</h3>
        {item.year && <span className="entry__meta">{item.year}</span>}
      </div>

      {item.blurb && (
        <p className="muted" style={{ marginTop: '0.6rem' }}>
          {item.blurb}
        </p>
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

      {(live || repo) && (
        <div className="project__links">
          {live && (
            <a className="btn" href={live} target="_blank" rel="noreferrer">
              Live ↗
            </a>
          )}
          {repo && (
            <a className="btn" href={repo} target="_blank" rel="noreferrer">
              Code ↗
            </a>
          )}
        </div>
      )}
    </GlassCard>
  )
}
