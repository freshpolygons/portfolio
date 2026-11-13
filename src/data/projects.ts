export type Project = {
  slug: string
  title: string
  classification: string
  description: string
  technologies: string[]
  image: string
  imageAlt: string
  accent: string
  featured?: boolean
  umbrella?: boolean
  parentId?: string
  overview?: string
  role?: string[]
  highlights?: string[]
  gallery?: { src: string; alt: string; caption?: string }[]
  youtubeIds?: string[]
  externalLinks?: { label: string; url: string }[]
  relatedIds?: string[]
}

// Keep factual copy and media here. Empty fields render labeled placeholders on detail pages.
// Add a parentId to associate a child with either umbrella project.
export const projects: Project[] = [
  {
    slug: 'objectiveed',
    title: 'ObjectiveEd',
    classification: 'Professional',
    description: 'A visual novel framework and educational applications for iOS.',
    technologies: ['Unity', 'C#', 'iOS'],
    image: 'media/objectiveed.svg',
    imageAlt: 'Abstract editorial placeholder for ObjectiveEd project media',
    accent: 'blue',
    featured: true,
    overview: 'Visual novel framework and educational applications developed for iOS.',
  },
  {
    slug: 'machine-elves',
    title: 'Machine Elves',
    classification: 'Independent / R&D',
    description: 'AI orchestration, developer tooling, workflow automation, and creative technology projects.',
    technologies: ['C#', 'WPF', 'AI', 'Automation'],
    image: 'media/machine-elves.svg',
    imageAlt: 'Abstract editorial placeholder for Machine Elves project media',
    accent: 'purple',
    featured: true,
    umbrella: true,
    overview: 'A collection of related experiments and products in AI orchestration, developer tooling, workflow automation, and creative technology.',
  },
  {
    slug: 'blightstorm',
    title: 'Blightstorm',
    classification: 'Independent',
    description: 'An original action game developed in Unity.',
    technologies: ['Unity', 'C#', 'Gameplay Systems'],
    image: 'media/blightstorm.svg',
    imageAlt: 'Abstract editorial placeholder for Blightstorm project media',
    accent: 'amber',
    featured: true,
    overview: 'An original action game built with Unity and C#.',
  },
  {
    slug: 'orc-powered-games',
    title: 'Orc Powered Games',
    classification: 'Independent / Commercial',
    description: 'Independent game development and publishing across games, frameworks, tools, and digital assets.',
    technologies: ['Games', 'Frameworks', 'Tools'],
    image: 'media/orc-powered-games.svg',
    imageAlt: 'Abstract editorial placeholder for Orc Powered Games project media',
    accent: 'green',
    umbrella: true,
    overview: 'An independent game development and publishing operation encompassing multiple games, frameworks, tools, and digital asset products.',
  },
  {
    slug: 'gamecore',
    title: 'GameCore',
    classification: 'Framework',
    description: 'A reusable Unity gameplay framework supporting interconnected game systems.',
    technologies: ['Unity', 'C#', 'Framework'],
    image: 'media/gamecore.svg',
    imageAlt: 'Abstract editorial placeholder for GameCore project media',
    accent: 'teal',
    parentId: 'orc-powered-games',
    overview: 'A reusable Unity gameplay framework supporting interconnected game systems.',
  },
  {
    slug: 'siege-engine',
    title: 'Siege Engine',
    classification: 'Development Tool',
    description: 'A custom real-time application and development environment built using MonoGame.',
    technologies: ['MonoGame', 'C#', 'Real-Time'],
    image: 'media/siege-engine.svg',
    imageAlt: 'Abstract editorial placeholder for Siege Engine project media',
    accent: 'steel',
    parentId: 'orc-powered-games',
    overview: 'A custom real-time application and development environment built using MonoGame.',
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
export const getChildren = (slug: string) => projects.filter((project) => project.parentId === slug)
