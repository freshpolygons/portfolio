import { getProject, projects } from './data/projects'

export const SITE_URL = 'https://billhayes.dev'

export const HOME_TITLE = 'Bill Hayes | Creative Technologist'
export const HOME_DESCRIPTION = 'Bill Hayes is a Creative Technologist building interactive software, Unity and C# game systems, developer tools, desktop applications, and AI workflow automation.'
export const HOME_HEADING = 'Designing and building interactive systems, tools, and games.'

export type PageMetadata = {
  pathname: string
  title: string
  description: string
  canonical: string
  heading: string
  summary: string
  image?: string
  indexable: boolean
  type: 'website' | 'article'
}

const projectPath = (slug: string) => `/work/${slug}/`
const absoluteUrl = (pathname: string) => `${SITE_URL}${pathname === '/' ? '/' : pathname}`

export function getPageMetadata(pathname: string): PageMetadata {
  const projectMatch = pathname.match(/^\/work\/([^/]+)\/?$/)
  if (projectMatch) {
    const project = getProject(decodeURIComponent(projectMatch[1]))
    if (project) {
      const pagePath = projectPath(project.slug)
      return {
        pathname: pagePath,
        title: project.seoTitle,
        description: project.seoDescription,
        canonical: absoluteUrl(pagePath),
        heading: project.pageHeading,
        summary: project.description,
        image: absoluteUrl(`/${project.cardImage || project.image}`),
        indexable: true,
        type: 'article',
      }
    }
  }

  if (pathname === '/') {
    return {
      pathname: '/',
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical: `${SITE_URL}/`,
      heading: HOME_HEADING,
      summary: HOME_DESCRIPTION,
      image: `${SITE_URL}/media/me-portrait.png`,
      indexable: true,
      type: 'website',
    }
  }

  return {
    pathname,
    title: `Page Not Found | Bill Hayes`,
    description: HOME_DESCRIPTION,
    canonical: absoluteUrl(pathname),
    heading: 'Page not found',
    summary: HOME_DESCRIPTION,
    indexable: false,
    type: 'website',
  }
}

export const publicPages = [
  getPageMetadata('/'),
  ...projects.map((project) => getPageMetadata(projectPath(project.slug))),
]
