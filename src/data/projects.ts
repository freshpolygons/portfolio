export type Project = {
  slug: string
  title: string
  classification: string
  description: string
  technologies: string[]
  image: string
  cardImage?: string
  imageAlt: string
  imageCaption?: string
  accent: string
  featured?: boolean
  umbrella?: boolean
  parentId?: string
  overview?: string
  role?: string[]
  highlights?: string[]
  gallery?: { src: string; alt: string; caption?: string }[]
  youtubeIds?: string[]
  externalLinks?: { label: string; url: string; icon?: string }[]
  relatedIds?: string[]
}

// Keep factual copy and media here. Empty fields render labeled placeholders on detail pages.
// Add a parentId to associate a child with either umbrella project.
export const projects: Project[] = [
  {
    slug: 'gamecore',
    title: 'GameCore',
    classification: 'Framework',
    description: 'A reusable Unity gameplay framework supporting interconnected game systems.',
    technologies: ['Unity', 'C#', 'Framework'],
    image: 'media/gamecore/gamecore_architecture.png',
    imageAlt: 'GameCore architecture diagram',
    imageCaption: 'GameCore architecture overview',
    accent: 'teal',
    featured: true,
    parentId: 'orc-powered-games',
    overview: 'A reusable Unity gameplay framework supporting interconnected game systems.',
    gallery: [
      {
        src: 'media/gamecore/gamecore_architecture.png',
        alt: 'GameCore architecture diagram',
        caption: 'GameCore architecture overview',
      },
      {
        src: 'media/gamecore/gamecore_showcase.png',
        alt: 'GameCore framework showcase',
        caption: 'GameCore framework showcase',
      },
    ],
  },
  {
    slug: 'ifiction-toolkit',
    title: 'iFiction Toolkit',
    classification: 'Professional',
    description: 'A visual novel framework and educational applications for iOS.',
    technologies: ['Unity', 'C#', 'iOS'],
    image: 'media/ifiction-toolkit/hero-image.png',
    cardImage: 'media/ifiction-toolkit/card-image.png',
    imageAlt: 'iFiction Toolkit hero image',
    imageCaption: 'iFiction Toolkit',
    accent: 'blue',
    featured: true,
    overview: 'Visual novel framework and educational applications developed for iOS.',
    gallery: [
      {
        src: 'media/ifiction-toolkit/screenshot_01.png',
        alt: 'iFiction Toolkit screenshot 01',
        caption: 'iFiction Toolkit screenshot',
      },
      {
        src: 'media/ifiction-toolkit/screenshot_03.png',
        alt: 'iFiction Toolkit screenshot 03',
        caption: 'iFiction Toolkit screenshot',
      },
      {
        src: 'media/ifiction-toolkit/screenshot_05.png',
        alt: 'iFiction Toolkit screenshot 05',
        caption: 'iFiction Toolkit screenshot',
      },
      {
        src: 'media/ifiction-toolkit/screenshot_06.png',
        alt: 'iFiction Toolkit screenshot 06',
        caption: 'iFiction Toolkit screenshot',
      },
    ],
  },
  {
    slug: 'blv-first-steps',
    title: 'BLV First Steps',
    classification: 'Professional',
    description: 'BLV First Steps project details to be added.',
    technologies: [],
    image: 'media/blv-first-steps/blv_hero.png',
    imageAlt: 'BLV First Steps hero image',
    imageCaption: 'BLV First Steps',
    accent: 'blue',
    overview: 'Project overview to be added.',
    gallery: [
      {
        src: 'media/blv-first-steps/screenshot_01.png',
        alt: 'BLV First Steps screenshot 01',
        caption: 'BLV First Steps screenshot',
      },
      {
        src: 'media/blv-first-steps/screenshot_02.png',
        alt: 'BLV First Steps screenshot 02',
        caption: 'BLV First Steps screenshot',
      },
      {
        src: 'media/blv-first-steps/screenshot_03.png',
        alt: 'BLV First Steps screenshot 03',
        caption: 'BLV First Steps screenshot',
      },
      {
        src: 'media/blv-first-steps/screenshot_04.png',
        alt: 'BLV First Steps screenshot 04',
        caption: 'BLV First Steps screenshot',
      },
    ],
  },
  {
    slug: 'raytheon-vr',
    title: 'Raytheon VR',
    classification: 'Professional',
    description: 'A virtual reality project for Raytheon.',
    technologies: ['Virtual Reality'],
    image: 'media/gamecore.svg',
    cardImage: 'media/raytheon-vr/raytheon-vr-card.png',
    imageAlt: 'Placeholder media for Raytheon VR',
    accent: 'steel',
    overview: 'Project overview to be added.',
    gallery: [
      {
        src: 'media/raytheon-vr/screenshot_01.jpg',
        alt: 'Raytheon VR screenshot 01',
        caption: 'Raytheon VR screenshot',
      },
      {
        src: 'media/raytheon-vr/screenshot_02.jpg',
        alt: 'Raytheon VR screenshot 02',
        caption: 'Raytheon VR screenshot',
      },
      {
        src: 'media/raytheon-vr/screenshot_03.jpg',
        alt: 'Raytheon VR screenshot 03',
        caption: 'Raytheon VR screenshot',
      },
      {
        src: 'media/raytheon-vr/screenshot_04.jpg',
        alt: 'Raytheon VR screenshot 04',
        caption: 'Raytheon VR screenshot',
      },
    ],
    youtubeIds: ['V17C75t4IX8'],
  },
  {
    slug: 'material-forge',
    title: 'Material Forge',
    classification: 'Project',
    description: 'Material Forge project details to be added.',
    technologies: [],
    image: 'media/material-forge/hero-image.png',
    cardImage: 'media/material-forge/card-image.png',
    imageAlt: 'Material Forge hero image',
    imageCaption: 'Material Forge',
    accent: 'teal',
    overview: 'Project overview to be added.',
    gallery: [
      {
        src: 'media/material-forge/screenshot_01.png',
        alt: 'Material Forge screenshot 01',
        caption: 'Material Forge screenshot',
      },
      {
        src: 'media/material-forge/screenshot_02.png',
        alt: 'Material Forge screenshot 02',
        caption: 'Material Forge screenshot',
      },
      {
        src: 'media/material-forge/screenshot_03.png',
        alt: 'Material Forge screenshot 03',
        caption: 'Material Forge screenshot',
      },
      {
        src: 'media/material-forge/screenshot_04.png',
        alt: 'Material Forge screenshot 04',
        caption: 'Material Forge screenshot',
      },
    ],
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
    image: 'media/blightstorm/Store_capsule.png',
    cardImage: 'media/blightstorm/blightstorm_card_image.png',
    imageAlt: 'Blightstorm game screenshot',
    imageCaption: 'Blightstorm gameplay screenshot',
    accent: 'amber',
    featured: true,
    overview: 'An original action game built with Unity and C#.',
    gallery: [
      {
        src: 'media/blightstorm/scrrenshot_06.png',
        alt: 'Blightstorm screenshot 06',
        caption: 'Blightstorm gameplay screenshot',
      },
      {
        src: 'media/blightstorm/scrrenshot_07.png',
        alt: 'Blightstorm screenshot 07',
        caption: 'Blightstorm gameplay screenshot',
      },
      {
        src: 'media/blightstorm/scrrenshot_08.png',
        alt: 'Blightstorm screenshot 08',
        caption: 'Blightstorm gameplay screenshot',
      },
      {
        src: 'media/blightstorm/scrrenshot_09.png',
        alt: 'Blightstorm screenshot 09',
        caption: 'Blightstorm gameplay screenshot',
      },
    ],
    youtubeIds: ['Hx9EIMSXlSE'],
    externalLinks: [
      {
        label: 'Blightstorm on Steam',
        url: 'https://store.steampowered.com/app/3342950/Blightstorm/',
        icon: 'media/icons/steam.svg',
      },
    ],
  },
  {
    slug: 'orc-powered-games',
    title: 'Orc Powered Games',
    classification: 'Independent / Commercial',
    description: 'Independent game development and publishing across games, frameworks, tools, and digital assets.',
    technologies: ['Games', 'Frameworks', 'Tools'],
    image: 'media/orc-powered-games/orc-powered-hero.png',
    cardImage: 'media/orc-powered-games/orc-powered-card.png',
    imageAlt: 'Orc Powered Games hero image',
    imageCaption: 'Orc Powered Games',
    accent: 'green',
    umbrella: true,
    overview: 'An independent game development and publishing operation encompassing multiple games, frameworks, tools, and digital asset products.',
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
export const getChildren = (slug: string) => projects.filter((project) => project.parentId === slug)
