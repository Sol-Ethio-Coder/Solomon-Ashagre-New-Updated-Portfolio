# Solomon Ashagre — Portfolio (v2)

React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + Framer Motion. Six switchable themes (Graphite, Paper, Midnight, Ocean, Ember, Sage) plus System, bento layout, case-study project rows.

## Run
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview
```

## Edit content
Everything (profile, projects, skills, experience, certifications, services) lives in `src/data/portfolioData.ts`.
Featured case studies are chosen by id in `src/components/Work.tsx` (`CASE_IDS`). Earlier projects live in `MORE_PROJECTS` (same file as the data) and appear in the "More projects" gallery; add a `image` path to any of them to show a screenshot on its card.
Project screenshots: put files in `public/images/` and point each project's `image` to `/images/<file>`.
Themes: colors are CSS variables per `data-theme` in `src/index.css`; the theme list and picker logic are in `src/theme.ts` and `src/components/ThemePicker.tsx`. To add a theme, add a `:root[data-theme="name"]` block, an entry in `THEMES`, and the id in the inline script in `index.html`.

## Contact form
The form posts to a Google Apps Script web app (`public/google-sheets-apps-script.js`). For each valid message it
saves a row in your Google Sheet, emails you (reply-to is set to the visitor, so you can just hit Reply), and emails
the visitor an automatic confirmation. It has a spam trap, a 2-minute per-address limit, and a daily cap on confirmations.
Setup: paste the script into Extensions > Apps Script, run `authorizeEmail` once, run `testSubmission`, then
Deploy > Manage deployments > New version. Set `VITE_GOOGLE_SHEETS_WEB_APP_URL` (or `FALLBACK_GOOGLE_SHEETS_URL` in
`src/utils/googleSheets.ts`) to the web app URL ending in `/exec`.

## CV
`public/Sol-Ethio-Coder-CV.pdf` is the file every Download CV button serves. Replace it with a new PDF of the same name to update it (the download is saved as `Solomon-Ashagre-CV.pdf`; change `src/data/resume.ts` to rename).

## Push to GitHub and deploy on Netlify
```bash
git add -A
git commit -m "Portfolio v2"
git push origin main
```
Netlify settings (already in `netlify.toml`): build command `npm run build`, publish directory `dist`, Node 22.
In Netlify: Add new site, Import an existing project, GitHub, choose the repo, Deploy.
Optional environment variable: `VITE_GOOGLE_SHEETS_WEB_APP_URL` (your Apps Script web app URL).
