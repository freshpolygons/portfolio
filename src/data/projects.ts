export type Project = {
  slug: string
  title: string
  pageHeading: string
  seoTitle: string
  seoDescription: string
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
    pageHeading: 'GameCore: Modular Unity Gameplay Framework',
    seoTitle: 'GameCore Unity Gameplay Framework | Bill Hayes',
    seoDescription: 'A modular Unity and C# gameplay framework for reusable AI, combat, stats, inventory, action, locomotion, and presentation systems.',
    classification: 'Framework',
    description: 'A modular Unity and C# framework for reusable, interconnected gameplay systems.',
    technologies: ['Unity', 'C#', 'Framework'],
    image: 'media/gamecore/gamecore_architecture.png',
    imageAlt: 'GameCore architecture diagram',
    imageCaption: 'GameCore architecture overview',
    accent: 'teal',
    featured: true,
    parentId: 'orc-powered-games',
    overview: 'GameCore is a reusable gameplay foundation built around actors, capability domains, and swappable implementations. It gives players, enemies, allies, and NPCs a consistent structure while keeping Unity gameplay systems loosely coupled through contracts and events.',
    role: [
      'Designed the actor-domain-implementation architecture and domain registry.',
      'Connected AI, combat, stats, inventory, actions, locomotion, and presentation through clear contracts and events.',
      'Built the framework in Unity and C# for reuse across multiple gameplay roles.',
    ],
    highlights: [
      'Actor-first composition for players, enemies, allies, and NPCs.',
      'Event-driven communication between independent gameplay domains.',
      'Swappable implementations and extensible registries for new capabilities.',
    ],
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
    pageHeading: 'iFiction Toolkit: Unity Tools for Interactive Fiction',
    seoTitle: 'iFiction Toolkit Unity Authoring Tools | Bill Hayes',
    seoDescription: 'Unity and C# authoring tools for interactive fiction and educational visual-novel applications delivered on iOS.',
    classification: 'Professional',
    description: 'Unity and C# authoring tools for interactive fiction and educational visual-novel applications on iOS.',
    technologies: ['Unity', 'C#', 'iOS'],
    image: 'media/ifiction-toolkit/hero-image.png',
    cardImage: 'media/ifiction-toolkit/card-image.png',
    imageAlt: 'iFiction Toolkit hero image',
    imageCaption: 'iFiction Toolkit',
    accent: 'blue',
    featured: true,
    overview: 'iFiction Toolkit combines a reusable visual-novel runtime with Unity authoring tools for organizing characters, dialogue, story content, and interactive scenes. It supported educational interactive-fiction applications delivered on iOS.',
    role: [
      'Built the Unity and C# framework and authoring workflow for interactive-fiction content.',
      'Implemented runtime presentation for dialogue, characters, story navigation, pause, and story-log interfaces.',
      'Supported the production of educational visual-novel applications for iOS.',
    ],
    highlights: [
      'Reusable visual-novel runtime and content-authoring workflow.',
      'Character, dialogue, scene, and story-state presentation systems.',
      'Reader-oriented navigation and story-log interfaces.',
    ],
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
    pageHeading: 'BLV First Steps: Interactive Training Application',
    seoTitle: 'BLV First Steps Interactive Training Software | Bill Hayes',
    seoDescription: 'A Unity and C# training application organized around chapters, lessons, skills, a training room, and guided interactive activities.',
    classification: 'Professional',
    description: 'A Unity and C# training application organized around chapters, lessons, skills, and guided activities.',
    technologies: ['Unity', 'C#', 'Interactive Training'],
    image: 'media/blv-first-steps/blv_hero.png',
    imageAlt: 'BLV First Steps hero image',
    imageCaption: 'BLV First Steps',
    accent: 'blue',
    overview: 'BLV First Steps presents structured training content through chapters, a training room, settings, lessons, and skill-based activities. Its Unity project data organizes chapters, lessons, and reusable skills so content can be assembled into guided learning sequences.',
    role: [
      'Built the Unity application structure for chapters, lessons, skills, and training-room activities.',
      'Organized reusable content data for guided learning sequences.',
      'Implemented the main navigation, settings, and training interfaces shown in the application.',
    ],
    highlights: [
      'Data-driven chapter, lesson, and skill organization.',
      'Dedicated training-room and settings flows.',
      'Reusable Unity content assets for interactive activities.',
    ],
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
    pageHeading: 'Raytheon VR: Interactive Virtual Reality Experiences',
    seoTitle: 'Raytheon Virtual Reality Experiences | Bill Hayes',
    seoDescription: 'Interactive VR demonstrations for Raytheon, including controller-driven training and product-visualization scenarios for HTC Vive.',
    classification: 'Professional',
    description: 'Interactive VR demonstrations for Raytheon spanning training and product visualization.',
    technologies: ['Virtual Reality', 'HTC Vive', 'Interactive Training'],
    image: 'media/gamecore.svg',
    cardImage: 'media/raytheon-vr/raytheon-vr-card.png',
    imageAlt: 'Placeholder media for Raytheon VR',
    accent: 'steel',
    overview: 'Raytheon VR brings multiple interactive scenarios into room-scale virtual reality. Existing footage shows a controller-driven ATM security lesson and a vehicle configuration experience with paint, wheel, and environment controls.',
    role: [
      'Developed interactive virtual-reality demonstrations for Raytheon.',
      'Built in-world interfaces and motion-controller interactions for guided scenarios.',
      'Created training and product-visualization experiences for live headset demonstrations.',
    ],
    highlights: [
      'Room-scale HTC Vive interaction and tracked controllers.',
      'ATM tampering and security training scenario.',
      'Vehicle paint, wheel, and environment visualization controls.',
    ],
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
    pageHeading: 'Material Forge: PBR Material Production Tool',
    seoTitle: 'Material Forge PBR Developer Tool | Bill Hayes',
    seoDescription: 'A desktop production tool for preparing textures, validating PBR maps, previewing materials, and exporting Unity URP and itch.io packs.',
    classification: 'Developer Tool',
    description: 'A production tool for preparing, validating, previewing, and exporting PBR material packs.',
    technologies: ['Developer Tools', 'PBR Materials', 'Unity URP', 'Real-ESRGAN'],
    image: 'media/material-forge/hero-image.png',
    cardImage: 'media/material-forge/card-image.png',
    imageAlt: 'Material Forge hero image',
    imageCaption: 'Material Forge',
    accent: 'teal',
    overview: 'Material Forge turns texture collections into validated PBR material packs. Its workflow prepares source images with Real-ESRGAN, previews albedo, normal, height, ambient-occlusion, roughness, and metallic maps, inspects results on a 3D mesh, and builds Unity URP or itch.io outputs.',
    role: [
      'Built the prepare, validate, preview, and output workflow for material-pack production.',
      'Integrated Real-ESRGAN source preparation and configurable export targets.',
      'Created map inspection, 3D material preview, progress, logging, and pack-default controls.',
    ],
    highlights: [
      'Real-ESRGAN-assisted source preparation.',
      'Validation and preview for core PBR texture maps.',
      'Unity URP and itch.io export workflows with pack-level defaults.',
    ],
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
    pageHeading: 'Machine Elves: AI Workflow and Desktop Tooling',
    seoTitle: 'Machine Elves AI Workflow Automation | Bill Hayes',
    seoDescription: 'C# and WPF desktop tools for AI workflow orchestration, developer automation, project operations, and creative technology experiments.',
    classification: 'Independent / R&D',
    description: 'C# and WPF desktop tools for AI orchestration, developer automation, and creative workflows.',
    technologies: ['C#', 'WPF', 'AI', 'Automation'],
    image: 'media/machine-elves.svg',
    imageAlt: 'Abstract editorial placeholder for Machine Elves project media',
    accent: 'purple',
    featured: true,
    umbrella: true,
    overview: 'Machine Elves is a collection of C# and WPF desktop applications for AI workflow orchestration, developer tooling, automation, project operations, and creative technology experiments.',
    role: [
      'Designed and built desktop workbenches in C# and WPF.',
      'Connected AI-assisted workflows to developer and project operations.',
      'Created automation for repeatable software and creative-production tasks.',
    ],
    highlights: [
      'AI workflow orchestration across multiple tools and projects.',
      'C# and WPF desktop interfaces for operational workflows.',
      'Developer tooling and repeatable workflow automation.',
    ],
  },
  {
    slug: 'blightstorm',
    title: 'Blightstorm',
    pageHeading: 'Blightstorm: Unity Bullet-Hell Action Game',
    seoTitle: 'Blightstorm Unity Action Game | Bill Hayes',
    seoDescription: 'An original Unity and C# bullet-hell action game featuring dense projectile patterns, combat encounters, and a dark fantasy presentation.',
    classification: 'Independent',
    description: 'An original Unity and C# bullet-hell action game with dense projectile combat.',
    technologies: ['Unity', 'C#', 'Gameplay Systems'],
    image: 'media/blightstorm/Store_capsule.png',
    cardImage: 'media/blightstorm/blightstorm_card_image.png',
    imageAlt: 'Blightstorm game screenshot',
    imageCaption: 'Blightstorm gameplay screenshot',
    accent: 'amber',
    featured: true,
    overview: 'Blightstorm is an original bullet-hell action game built with Unity and C#. Players navigate dense projectile patterns and combat encounters presented through a dark fantasy visual style.',
    role: [
      'Developed the original game and its gameplay systems in Unity and C#.',
      'Built combat encounters around dense projectile patterns and player movement.',
      'Prepared the Steam presentation, gameplay screenshots, and trailer.',
    ],
    highlights: [
      'Projectile-heavy action combat built in Unity.',
      'C# gameplay systems for enemies, attacks, and player interaction.',
      'Published Steam presence with a Bullet Fest trailer.',
    ],
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
    pageHeading: 'Orc Powered Games: Games, Frameworks, and Developer Tools',
    seoTitle: 'Orc Powered Games | Unity Games and Tools | Bill Hayes',
    seoDescription: 'Independent Unity and C# game development spanning original games, reusable gameplay frameworks, developer tools, and digital asset products.',
    classification: 'Independent / Commercial',
    description: 'Independent Unity game development across original games, frameworks, tools, and digital assets.',
    technologies: ['Unity', 'C#', 'Games', 'Developer Tools'],
    image: 'media/orc-powered-games/orc-powered-hero.png',
    cardImage: 'media/orc-powered-games/orc-powered-card.png',
    imageAlt: 'Orc Powered Games hero image',
    imageCaption: 'Orc Powered Games',
    accent: 'green',
    umbrella: true,
    overview: 'Orc Powered Games is an independent development and publishing operation encompassing original games, reusable Unity and C# frameworks, developer tools, and digital asset products.',
    role: [
      'Developed original games and shared Unity gameplay technology.',
      'Built reusable frameworks and production tools that support multiple projects.',
      'Managed product development across games, tools, and digital assets.',
    ],
    highlights: [
      'Unity and C# foundations shared across independent projects.',
      'GameCore modular gameplay framework.',
      'Combined game, tool, framework, and asset-product development.',
    ],
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
export const getChildren = (slug: string) => projects.filter((project) => project.parentId === slug)
