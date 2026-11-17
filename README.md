# Personal developer portfolio

React + TypeScript + Vite portfolio for interactive systems, tools, and games.

## Local development

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

Run `npm run verify` to build the site, serve the generated files through a local static server, and verify every public page, asset, internal link, canonical URL, sitemap entry, and discovery file.

## GitHub Pages

The included GitHub Actions workflow builds `dist` and deploys it to GitHub Pages whenever `main` is updated. In the repository settings, set **Pages -> Source** to **GitHub Actions**. The build preserves the `billhayes.dev` custom domain through `public/CNAME`.

The production build pre-renders the homepage and every case study to static HTML. Project URLs use crawlable paths such as `/work/ifiction-toolkit/`, and old `/#/work/project-name` URLs redirect to the matching static route in the browser.

Review the generated site before pushing changes to the public repository.

## Editing content

- Change the name, resume path, and contact URLs in `src/data/profile.ts`. Use a `mailto:` URL for email.
- Edit project copy and technologies in `src/data/projects.ts`. Put local media in `public/media` and reference it relative to that directory, such as `media/example.webp`.
- Give every project its own `pageHeading`, `seoTitle`, and `seoDescription`; these fields are emitted into its initial HTML and metadata.
- Add screenshots to `gallery`, YouTube video IDs to `youtubeIds`, and public links to `externalLinks` for any project. Blank fields display labeled placeholders.
- Set `parentId` on child projects to group them under `machine-elves` or `orc-powered-games`.

`sitemap.xml` is generated from the same public-page metadata during every build. `public/robots.txt` points search crawlers to the production sitemap. The supplied `.mockups/landing_mockup.png` is a design reference and is not used as site content.
