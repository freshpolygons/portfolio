import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const distRoot = path.join(root, 'dist')
const template = await readFile(path.join(distRoot, 'index.html'), 'utf8')
const serverEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
const { publicPages, render } = await import(serverEntry)

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function structuredData(page) {
  if (page.pathname === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Bill Hayes',
      url: page.canonical,
      jobTitle: 'Creative Technologist',
      sameAs: ['https://www.linkedin.com/in/freshpolygons/'],
      knowsAbout: ['Unity', 'C#', 'interactive software', 'game development', 'developer tools', 'AI workflow automation'],
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: page.heading,
    description: page.description,
    url: page.canonical,
    image: page.image,
    creator: {
      '@type': 'Person',
      name: 'Bill Hayes',
      url: 'https://billhayes.dev/',
    },
  }
}

function applyMetadata(html, page) {
  const robots = page.indexable ? 'index, follow' : 'noindex, nofollow'
  const socialImage = page.image ? `<meta property="og:image" content="${escapeHtml(page.image)}" />\n    <meta name="twitter:image" content="${escapeHtml(page.image)}" />` : ''
  const jsonLd = JSON.stringify(structuredData(page)).replaceAll('<', '\\u003c')
  const extraHead = `    <meta name="robots" content="${robots}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:type" content="${page.type}" />
    <meta property="og:url" content="${escapeHtml(page.canonical)}" />
    ${socialImage}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.description)}" />
    <script type="application/ld+json">${jsonLd}</script>
`

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(page.canonical)}" />`)
    .replace('</head>', `${extraHead}  </head>`)
}

for (const page of publicPages) {
  const appHtml = render(page.pathname)
  const pageHtml = applyMetadata(template, page)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outputPath = page.pathname === '/'
    ? path.join(distRoot, 'index.html')
    : path.join(distRoot, page.pathname.slice(1), 'index.html')

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, pageHtml)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPages.filter((page) => page.indexable).map((page) => `  <url><loc>${escapeHtml(page.canonical)}</loc></url>`).join('\n')}
</urlset>
`

await writeFile(path.join(distRoot, 'sitemap.xml'), sitemap)
console.log(`Prerendered ${publicPages.length} public pages and sitemap.xml`)
