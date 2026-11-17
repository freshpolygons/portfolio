import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

const legacyProjectAliases: Record<string, string> = {
  objectiveed: 'ifiction-toolkit',
  'asd-ifiction': 'ifiction-toolkit',
}

const legacyProjectMatch = window.location.hash.match(/^#\/work\/([^/?#]+)/)
if (legacyProjectMatch) {
  const legacySlug = decodeURIComponent(legacyProjectMatch[1])
  const slug = legacyProjectAliases[legacySlug] || legacySlug
  window.location.replace(`/work/${encodeURIComponent(slug)}/`)
} else {
  const root = document.getElementById('root')!
  const application = (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )

  if (root.hasChildNodes()) hydrateRoot(root, application)
  else createRoot(root).render(application)
}
