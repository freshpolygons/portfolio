import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { getChildren, getProject, projects, type Project } from './data/projects'
import { profile } from './data/profile'
import { getPageMetadata } from './seo'

const HeroCloud = lazy(() => import('./HeroCloud'))
const sectionLink = (section: string) => `/?section=${section}`
const mediaUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

function RouteMetadata() {
  const location = useLocation()

  useEffect(() => {
    const page = getPageMetadata(location.pathname)
    document.title = page.title

    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.content = content
    }

    setMeta('name', 'description', page.description)
    setMeta('name', 'robots', page.indexable ? 'index, follow' : 'noindex, nofollow')
    setMeta('property', 'og:title', page.title)
    setMeta('property', 'og:description', page.description)
    setMeta('property', 'og:type', page.type)
    setMeta('property', 'og:url', page.canonical)
    if (page.image) setMeta('property', 'og:image', page.image)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = page.canonical
  }, [location.pathname])

  return null
}

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? <span aria-hidden="true" className="arrow-diagonal">↗</span> : <span aria-hidden="true" className="arrow-horizontal">→</span>
}

function HeroCloudVisual() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="hero-cloud" aria-hidden="true" />
  return <Suspense fallback={<div className="hero-cloud" aria-hidden="true" />}><HeroCloud /></Suspense>
}

function Header() {
  const location = useLocation()
  const selectedSection = new URLSearchParams(location.search).get('section') || 'work'
  const selected = selectedSection === 'more-work' ? 'work' : selectedSection
  return (
    <header className="site-header shell">
      <Link to="/" className="brand" aria-label="Portfolio home">
        <span className="brand-name">{profile.name}</span>
      </Link>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-role">Creative Technologist</span>
      <nav className="top-nav" aria-label="Main navigation">
        {['work', 'about', 'contact'].map((section) => (
          <Link key={section} to={sectionLink(section)} className={location.pathname === '/' && selected === section ? 'active' : ''} aria-current={location.pathname === '/' && selected === section ? 'page' : undefined}>
            {section[0].toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </nav>
    </header>
  )
}

function SkillIcon({ kind }: { kind: string }) {
  if (kind === 'Unity') return <img className="skill-icon-image" src={mediaUrl('media/icons/unity-icon.png')} alt="" aria-hidden="true" />
  if (kind === 'C#') return <span className="skill-csharp" aria-hidden="true">C</span>
  if (kind === 'Real-Time 3D') return <svg viewBox="0 0 36 36" aria-hidden="true"><path d="m18 3 14 8v14l-14 8L4 25V11L18 3Zm0 30V18M4 11l14 7 14-7" /></svg>
  if (kind === 'AI Workflows') return <svg viewBox="0 0 36 36" aria-hidden="true" className="green-icon"><path d="M18 2c1.9 10.2 5.8 14.1 16 16-10.2 1.9-14.1 5.8-16 16C16.1 23.8 12.2 19.9 2 18c10.2-1.9 14.1-5.8 16-16Z" /></svg>
  if (kind === 'Tools') return <svg viewBox="0 0 36 36" aria-hidden="true"><path d="m18 2 15 8-15 8L3 10l15-8ZM3 17l15 8 15-8M3 24l15 8 15-8" /></svg>
  return <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="29" r="3" /><circle cx="30" cy="29" r="3" /><path d="M16.5 8 7.5 26m13-18 8 18M9 29h18" /></svg>
}

function SkillsStrip() {
  const skills = ['Unity', 'C#', 'Real-Time 3D', 'AI Workflows', 'Tools', 'Creative Systems']
  return <div className="skills-rail"><div className="skills-inner shell" aria-label="Core capabilities">{skills.map((skill) => <div className="skill" key={skill}><SkillIcon kind={skill} /><span>{skill}</span></div>)}</div></div>
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className={`project-card project-${project.accent}`} to={`/work/${project.slug}/`} aria-label={`View ${project.title} project details`}>
      <img src={mediaUrl(project.cardImage || project.image)} alt={project.imageAlt} loading={project.featured ? 'eager' : 'lazy'} />
      <span className="project-card-shade" aria-hidden="true" />
      <span className="card-classification">{project.classification}</span>
      <span className="project-card-content">
        <span className="card-title">{project.title}</span>
        <span className="card-description">{project.description}</span>
        <span className="card-bottom"><span className="tags">{project.technologies.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</span><ArrowIcon diagonal /></span>
      </span>
    </Link>
  )
}

function Home() {
  const location = useLocation()
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((left, right) => (left.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (right.featuredOrder ?? Number.MAX_SAFE_INTEGER))
  const otherProjects = projects.filter((project) => !project.featured)
  useEffect(() => {
    const target = new URLSearchParams(location.search).get('section')
    if (target) {
      const timer = window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0 })
  }, [location.key, location.search])

  return <>
    <section className="hero shell" aria-labelledby="hero-title">
      <HeroCloudVisual />
      <img className="hero-portrait" src={`${import.meta.env.BASE_URL}media/me-portrait.png`} alt={`Portrait of ${profile.name}`} />
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">Game Developer <span>/</span> Software Engineer <span>/</span> Tool Builder</p>
        <h1 id="hero-title">Designing and building interactive systems, <em>tools,</em> and <em>games.</em></h1>
        <p className="hero-summary">I build interactive software, Unity and C# gameplay systems, developer tools, desktop applications, and AI workflow automation.</p>
        <div className="hero-actions"><Link to={sectionLink('work')} className="button button-primary">View Work <ArrowIcon /></Link><Link to={sectionLink('about')} className="button button-outline">About Me</Link></div>
      </div>
    </section>
    <SkillsStrip />
    <main>
      <section className="work-section shell" id="work" aria-labelledby="work-heading">
        <div className="section-heading work-heading"><h2 id="work-heading">Featured Work</h2><p>A selection of professional work, tools, and original projects across interactive experiences.</p><Link to={sectionLink('more-work')} className="text-link">View All Work <ArrowIcon /></Link></div>
        <div className="project-grid featured-grid">{featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
        <div className="more-work" id="more-work"><div className="section-heading"><div><p className="eyebrow green-text">Selected Projects</p><h2>More Work</h2></div><p>Frameworks, development environments, and a wider independent game ecosystem.</p></div><div className="project-grid">{otherProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-heading"><div className="shell about-grid"><div><p className="eyebrow green-text">01 / About</p><h2 id="about-heading">Building at the intersection of <span>code and experience.</span></h2></div><div className="about-copy"><p>I'm a developer with 15 years of professional experience.</p><p>My work spans iOS and mobile development, developer tools and custom editors, desktop applications, and AI orchestration and workflow automation.</p>{profile.resumeUrl ? <a className="resume-placeholder" href={profile.resumeUrl} download><span>Download résumé (PDF)</span><span><ArrowIcon diagonal /></span></a> : <div className="resume-placeholder"><span>Résumé PDF</span><span>Download résumé (PDF) <ArrowIcon diagonal /></span></div>}</div></div></section>
      <section className="contact-section shell" id="contact" aria-labelledby="contact-heading"><p className="eyebrow green-text">02 / Contact</p><div className="contact-grid"><div><h2 id="contact-heading">Let's connect.</h2><p>Interested in discussing engineering, game development, or creative technology?</p></div><div className="contact-links" aria-label="Professional links">{profile.contact.map((item) => <a key={item.label} href={item.url} target={item.url.startsWith('mailto:') ? undefined : '_blank'} rel={item.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}><span>{item.label}</span><span><ArrowIcon diagonal /></span></a>)}</div></div></section>
    </main>
  </>
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <p className="content-placeholder">{children}</p>
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug || '')
  useEffect(() => { window.scrollTo({ top: 0 }) }, [slug])
  if (!project) return <main className="not-found shell"><p className="eyebrow green-text">Project not found</p><h1>This page isn't here yet.</h1><Link to={sectionLink('work')} className="button button-outline">Back to Work <ArrowIcon /></Link></main>

  const children = getChildren(project.slug)
  const parent = project.parentId ? getProject(project.parentId) : undefined
  const related = [parent, ...children, ...(project.relatedIds || []).map(getProject)].filter((item): item is Project => Boolean(item && item.slug !== project.slug))
  return <main className="detail-page shell">
    <Link className="back-link" to={sectionLink('work')}>← Back to Work</Link>
    <div className="detail-intro"><p className="eyebrow green-text">{project.classification}</p><h1>{project.pageHeading}</h1><p>{project.description}</p><div className="tags detail-tags">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
    <figure className={`detail-hero-media project-${project.accent}`}><img src={mediaUrl(project.image)} alt={project.imageAlt} /><figcaption>{project.imageCaption || 'Illustrative placeholder · project screenshot to be added'}</figcaption></figure>
    <div className="detail-body"><div className="detail-content"><section><h3>Overview</h3><p>{project.overview || project.description}</p></section><section><h3>Role &amp; Responsibilities</h3>{project.role?.length ? <ul>{project.role.map((item) => <li key={item}>{item}</li>)}</ul> : <Placeholder>Role and responsibilities to be added.</Placeholder>}</section><section><h3>Technical Highlights</h3>{project.highlights?.length ? <ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul> : <Placeholder>Technical implementation details to be added.</Placeholder>}</section></div></div>
    <section className="detail-section"><div className="section-heading"><h2>Gallery</h2><p>Images and interface details from the project.</p></div>{project.gallery?.length ? <div className="gallery-grid">{project.gallery.map((image) => <figure key={image.src}><img src={mediaUrl(image.src)} alt={image.alt} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}</div> : <div className="media-placeholder">Project screenshots coming soon.</div>}</section>
    <section className="detail-section"><div className="section-heading"><h2>Video</h2><p>Demonstrations and walkthroughs.</p></div>{project.youtubeIds?.length ? <div className="video-grid">{project.youtubeIds.map((id) => <iframe key={id} title={`${project.title} video demonstration`} src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />)}</div> : <div className="media-placeholder">Video demonstration coming soon.</div>}</section>
    <section className="detail-section"><div className="section-heading"><h2>Explore Further</h2><p>Related work and external resources.</p></div>{related.length > 0 && <div className="related-grid">{related.map((item) => <ProjectCard key={item.slug} project={item} />)}</div>}{project.umbrella && children.length === 0 && <Placeholder>Individual projects from this collection will appear here as they are added.</Placeholder>}{project.externalLinks?.length ? <div className="external-links">{project.externalLinks.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.icon && <img src={mediaUrl(link.icon)} alt="" aria-hidden="true" />}{link.label} <ArrowIcon diagonal /></a>)}</div> : <Placeholder>External project links to be added.</Placeholder>}</section>
  </main>
}

function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner"><div><span>{profile.name}</span></div><p>Interactive systems, tools, and games.</p><Link to="/">Back to top ↑</Link></div></footer>
}

export default function App() {
  return <><RouteMetadata /><Header /><Routes><Route path="/" element={<Home />} /><Route path="/work/:slug" element={<ProjectDetail />} /><Route path="*" element={<ProjectDetail />} /></Routes><Footer /></>
}
