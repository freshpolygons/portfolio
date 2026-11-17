import { createReadStream } from 'node:fs'
import { access, stat } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const distRoot = path.resolve(root, 'dist')
const serverEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
const { publicPages } = await import(serverEntry)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const normalizeVisibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, '')
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#x27;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>')
  .replace(/\s+/g, ' ')
  .trim()

const assert = (condition, message) => {
  if (!condition) throw new Error(message)
}

async function resolveRequestPath(pathname) {
  const decoded = decodeURIComponent(pathname)
  const relative = decoded.replace(/^\/+/, '')
  const candidate = path.resolve(distRoot, relative || 'index.html')
  assert(candidate === distRoot || candidate.startsWith(`${distRoot}${path.sep}`), `Unsafe request path: ${pathname}`)

  try {
    const info = await stat(candidate)
    if (info.isDirectory()) return path.join(candidate, 'index.html')
    return candidate
  } catch {
    if (!path.extname(candidate)) return path.join(candidate, 'index.html')
    return candidate
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url || '/', 'http://localhost').pathname
    const filePath = await resolveRequestPath(pathname)
    await access(filePath)
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
    response.writeHead(200, { 'Content-Type': contentType })
    if (request.method === 'HEAD') response.end()
    else createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const address = server.address()
const baseUrl = `http://127.0.0.1:${address.port}`

try {
  const verifiedAssets = new Set()
  const verifiedNavigation = new Set()
  const pageTitles = publicPages.map((page) => page.title)
  const pageDescriptions = publicPages.map((page) => page.description)
  assert(new Set(pageTitles).size === pageTitles.length, 'Public pages do not have unique titles')
  assert(new Set(pageDescriptions).size === pageDescriptions.length, 'Public pages do not have unique descriptions')

  for (const page of publicPages) {
    const response = await fetch(`${baseUrl}${page.pathname}`)
    const html = await response.text()
    const visibleText = normalizeVisibleText(html)
    assert(response.status === 200, `${page.pathname} returned ${response.status}`)
    assert(response.headers.get('content-type')?.startsWith('text/html'), `${page.pathname} did not return HTML`)
    assert(!html.includes('Switched to client rendering'), `${page.pathname} contains a server-rendering fallback diagnostic`)
    assert(html.includes(`<title>${escapeHtml(page.title)}</title>`), `${page.pathname} is missing its title`)
    assert(html.includes(`content="${escapeHtml(page.description)}"`), `${page.pathname} is missing its description`)
    assert(html.includes(`href="${escapeHtml(page.canonical)}"`), `${page.pathname} is missing its canonical URL`)
    assert(html.includes(`<h1`), `${page.pathname} is missing an H1`)
    assert(visibleText.includes(page.heading), `${page.pathname} is missing its descriptive heading`)
    if (page.pathname !== '/') {
      assert(visibleText.includes(page.summary), `${page.pathname} is missing its project summary`)
      assert(visibleText.includes('Overview'), `${page.pathname} is missing its project overview`)
      assert(visibleText.includes('Role & Responsibilities'), `${page.pathname} is missing its role content`)
      assert(visibleText.includes('Technical Highlights'), `${page.pathname} is missing its technical content`)
    }

    const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1])
    for (const reference of references) {
      if (!reference.startsWith('/')) continue
      const url = new URL(reference, baseUrl)
      if (path.extname(url.pathname)) {
        if (verifiedAssets.has(url.pathname)) continue
        const assetResponse = await fetch(url, { method: 'HEAD' })
        assert(assetResponse.status === 200, `Asset ${url.pathname} returned ${assetResponse.status}`)
        verifiedAssets.add(url.pathname)
      } else {
        const navigationKey = `${url.pathname}${url.search}`
        if (verifiedNavigation.has(navigationKey)) continue
        const navigationResponse = await fetch(url)
        assert(navigationResponse.status === 200, `Navigation ${navigationKey} returned ${navigationResponse.status}`)
        verifiedNavigation.add(navigationKey)
      }
    }

    console.log(`200 ${page.pathname} — metadata and initial HTML verified`)
  }

  const robotsResponse = await fetch(`${baseUrl}/robots.txt`)
  const robots = await robotsResponse.text()
  assert(robotsResponse.status === 200, 'robots.txt did not return 200')
  assert(robots.includes('Sitemap: https://billhayes.dev/sitemap.xml'), 'robots.txt is missing the sitemap URL')

  const cnameResponse = await fetch(`${baseUrl}/CNAME`)
  const cname = await cnameResponse.text()
  assert(cnameResponse.status === 200, 'CNAME did not return 200')
  assert(cname.trim() === 'billhayes.dev', 'CNAME does not preserve the custom domain')

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`)
  const sitemap = await sitemapResponse.text()
  assert(sitemapResponse.status === 200, 'sitemap.xml did not return 200')
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const expectedUrls = publicPages.filter((page) => page.indexable).map((page) => page.canonical)
  assert(JSON.stringify(sitemapUrls) === JSON.stringify(expectedUrls), 'sitemap.xml URLs do not match public pages')

  for (const sitemapUrl of sitemapUrls) {
    const pathname = new URL(sitemapUrl).pathname
    const response = await fetch(`${baseUrl}${pathname}`)
    assert(response.status === 200, `Sitemap URL ${sitemapUrl} returned ${response.status}`)
  }

  console.log(`Verified ${publicPages.length} HTML pages, ${verifiedAssets.size} assets, ${verifiedNavigation.size} internal links, robots.txt, CNAME, and ${sitemapUrls.length} sitemap URLs.`)
} finally {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
}
