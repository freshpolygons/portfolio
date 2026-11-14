# Personal developer portfolio

React + TypeScript + Vite portfolio for interactive systems, tools, and games.

## Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

## GitHub Pages

The included GitHub Actions workflow builds `dist` and deploys it to GitHub Pages whenever `main` is updated. In the repository settings, set **Pages → Source** to **GitHub Actions**. The Vite base is relative, so the same build works at a repository path without changing source files.

Review the site before enabling Pages or pushing a public repository. This workspace has no remote configured by default.

## Editing content

- Change the name, résumé path, and contact URLs in `src/data/profile.ts`. Use a `mailto:` URL for email.
- Edit project copy and technologies in `src/data/projects.ts`. Put local media in `public/media` and reference it relative to that directory, such as `media/example.webp`.
- Add screenshots to `gallery`, YouTube video IDs to `youtubeIds`, and public links to `externalLinks` for any project. Blank fields display labeled placeholders.
- Set `parentId` on child projects to group them under `machine-elves` or `orc-powered-games`. GameCore and Siege Engine are initially grouped under Orc Powered Games; revise that association if needed.

Project URLs use hash routing (`/#/work/project-name`) so detail pages remain reachable on GitHub Pages repository paths without server rewrite rules. The supplied `.mockups/landing_mockup.png` is a design reference and is not used as site content.
