/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE ONLY.
 *  Everything the site displays lives here. No JSX or CSS changes needed to
 *  update text, add a skill, add a job, or (later) turn the Projects section on.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Priyank Patel',
  // Shown under the name in the hero, one short line.
  role: 'Software & ML Engineer',
  // Rotating words in the hero headline. Add/remove freely.
  taglines: [
    'ships ML into production',
    'builds event-driven backends',
    'measures before believing',
  ],
  location: 'Boston, MA',
  // Short hero paragraph (1-2 sentences).
  summary:
    'MS Computer Science at Northeastern, graduating May 2026. I build the unglamorous half of machine learning — the pipelines, APIs, and evaluation harnesses that decide whether a model survives contact with real data.',
  // File lives in /public. Set to null to hide the button.
  resumeUrl: '/Priyank_Patel_Resume.pdf',
  // Optional: '/avatar.jpg' in /public. null renders no image.
  avatarUrl: null,
}

export const about = {
  heading: 'About',
  // Each string is a paragraph.
  paragraphs: [
    "I'm finishing an MS in Computer Science at Northeastern, with three engineering roles behind me across healthcare AI, data science, and mobile development.",
    'Most recently I worked on medical-document extraction and question-answering quality at Deepthink Healthcare — OCR preprocessing with Vision Transformers, a transformer-embedding classifier for device routing at 95% F1, and reproducible QA experiments over 10,000+ responses. Before that I trained and benchmarked models on sales data at Enlighten Infosystems, and shipped iOS features at Elsner Technologies.',
    'The through-line is production readiness: schema validation, drift checks, latency budgets, and test coverage. A model that nobody can deploy, monitor, or trust is a notebook, not a system.',
  ],
  // Small stat tiles beside the text. Remove the array to hide them.
  stats: [
    { value: '3.8', label: 'GPA at Northeastern' },
    { value: '95%', label: 'F1, device routing' },
    { value: '10K+', label: 'QA responses evaluated' },
  ],
}

export const skills = {
  heading: 'Skills',
  // Groups render as separate glass cards. Add or remove groups freely.
  groups: [
    {
      name: 'Languages',
      items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C', 'SQL', 'R'],
    },
    {
      name: 'Backend',
      items: ['Spring Boot', 'FastAPI', 'Node.js', 'REST APIs', 'WebSockets', 'Agile'],
    },
    {
      name: 'AI / ML',
      items: [
        'Transformers',
        'LangChain',
        'RAG',
        'Computer Vision',
        'Classification',
        'Clustering',
      ],
    },
    {
      name: 'Data & Cloud',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'AWS', 'GCP', 'Spark'],
    },
    {
      name: 'Testing & DevOps',
      items: ['JUnit', 'Mockito', 'Docker', 'CI/CD', 'Git', 'GitHub Actions'],
    },
    {
      name: 'Foundations',
      items: [
        'Data Structures',
        'Algorithms',
        'Object-Oriented Design',
        'SDLC',
      ],
    },
  ],
}

export const certifications = {
  heading: 'Certifications',
  items: ['AWS Cloud Architecting', 'AWS Academy Machine Learning', 'Amazon Data Engineer'],
}

export const experience = {
  heading: 'Experience',
  items: [
    {
      role: 'AI Software Engineer Intern',
      org: 'Deepthink Healthcare',
      location: 'San Ramon, CA',
      // Free-form strings — 'Jan 2024', '2024', 'Present' all work.
      start: 'Sep 2025',
      end: 'Dec 2025',
      // Bullet points. Lead with the outcome.
      points: [
        'Engineered a Python OCR preprocessing pipeline using Tesseract signals and Vision Transformer methods, improving the consistency of medical-document extraction and cutting manual review effort.',
        'Evaluated 10,000+ healthcare question-answering responses through reproducible QA experiments, identifying 20 recurring failure patterns and contributing to 90% reviewed accuracy.',
        'Developed a transformer-embedding classifier for medical-device routing, achieving a 95% F1 score and integrating model outputs into reusable Python evaluation pipelines.',
        'Validated 5,000+ medical records in Label Studio against schema, completeness, and consistency rules, reducing annotation inconsistencies by 90%.',
      ],
      tags: ['Python', 'Vision Transformers', 'OCR', 'Label Studio', 'Evaluation'],
    },
    {
      role: 'ML Data Scientist',
      org: 'Enlighten Infosystems',
      location: 'Vadodara, India',
      start: 'Jan 2023',
      end: 'Sep 2023',
      points: [
        'Analyzed 3,000+ sales records across five years using Python and SQL, transforming raw data into validated, model-ready datasets.',
        'Trained and benchmarked SVM and regression models, achieving 95% classification accuracy and 92% revenue-prediction accuracy on evaluation datasets.',
        'Applied clustering to customer segmentation and communicated findings to business stakeholders, contributing to a 15% improvement in targeted acquisition.',
      ],
      tags: ['Python', 'SQL', 'Scikit-learn', 'Clustering'],
    },
    {
      role: 'Software Development Engineer',
      org: 'Elsner Technologies',
      location: 'Ahmedabad, India',
      start: 'Apr 2022',
      end: 'Aug 2022',
      points: [
        'Delivered iOS task-management features with calendar integration, improving user engagement by 30%.',
        'Optimized mobile app performance, reducing load times 40% and improving usability for large task lists.',
      ],
      tags: ['iOS', 'Mobile', 'Performance'],
    },
  ],
}

export const education = {
  heading: 'Education',
  items: [
    {
      degree: 'Master of Science, Computer Science',
      org: 'Northeastern University',
      location: 'Boston, MA',
      start: 'Jan 2024',
      end: 'May 2026',
      detail: 'GPA 3.8 / 4.0',
    },
    {
      degree: 'Bachelor of Technology, Computer Science and Engineering',
      org: 'Gujarat Technological University',
      location: 'India',
      start: 'Jun 2019',
      end: 'May 2023',
      detail: 'GPA 4.0 / 4.0',
    },
  ],
}

/**
 * PROJECTS — intentionally off for now.
 *
 * To turn it on later:
 *   1. set `enabled: true` below
 *   2. add objects to `items`
 * Nav link, section, scroll-spy, and animations all wire themselves up.
 * Nothing else to touch. See the shape in `projectShape` below.
 */
export const projects = {
  heading: 'Projects',
  enabled: false,
  items: [],
}

/** Reference only — copy one of these into `projects.items` when you're ready. */
export const projectShape = {
  title: 'Project name',
  blurb: 'One or two sentences on what it does and why it exists.',
  tags: ['FastAPI', 'Docker'],
  // Any of these may be null / omitted.
  links: { live: 'https://…', repo: 'https://…' },
  image: '/projects/thing.png', // file in /public
  year: '2026',
  featured: true, // featured cards span two columns
}

export const contact = {
  heading: 'Contact',
  headline: "Let's build something that ships.",
  blurb:
    'Graduating May 2026 and open to full-time software and ML engineering roles. Always happy to talk about evaluation, retrieval, or backend systems.',
  email: 'patel.priyankk@northeastern.edu',
  // Remove any you don't use. `label` shows on the card.
  socials: [
    { label: 'GitHub', url: 'https://github.com/priyank1510' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/priyankk' },
    { label: 'Résumé', url: '/Priyank_Patel_Resume.pdf' },
  ],
}

/**
 * SECTION REGISTRY — controls order, nav labels, and visibility.
 * `id` must match a key in `sectionComponents` (src/sections/index.js).
 * Reorder this array to reorder the page. Set enabled:false to hide anything.
 */
export const sections = [
  { id: 'hero', label: 'Home', enabled: true, inNav: false },
  { id: 'about', label: 'About', enabled: true, inNav: true },
  { id: 'skills', label: 'Skills', enabled: true, inNav: true },
  { id: 'experience', label: 'Experience', enabled: true, inNav: true },
  { id: 'projects', label: 'Projects', enabled: projects.enabled, inNav: true },
  { id: 'education', label: 'Education', enabled: true, inNav: true },
  { id: 'certifications', label: 'Certifications', enabled: true, inNav: false },
  { id: 'contact', label: 'Contact', enabled: true, inNav: true },
]

/** Visual theme. Colors feed both the CSS glass layer and the 3D scene. */
export const theme = {
  // Accent gradient used by headings, glows, and the 3D light rig.
  accentA: '#7c5cff', // violet
  accentB: '#22d3ee', // cyan
  accentC: '#f472b6', // pink
  background: '#05060c',
  // 3D background: 'crystals' | 'particles' | 'none'
  scene: 'crystals',
  // Drop to a still gradient on low-power devices automatically.
  adaptivePerformance: true,
}
