# Punyaraj Sonawane — Data Analyst Portfolio

Interactive portfolio built with React, Framer Motion and Three.js. It is a **static site with no build step**: every file in this folder is served as-is, so you can edit and redeploy in seconds.

## Project structure

```
.
├── index.html                  Page shell, SEO meta tags, script order
├── favicon.svg
├── robots.txt
├── netlify.toml                Netlify config (headers, caching)
├── vercel.json                 Vercel config (headers, caching)
└── assets/
    ├── css/styles.css          All styles, light and dark themes
    ├── js/app.js               All components and content
    ├── resume/                 Your résumé PDF (download button)
    └── vendor/                 React, ReactDOM, Framer Motion, htm, Three.js
```

The libraries live in `assets/vendor/`, so the site does not depend on any outside CDN. Only the Geist font loads from Google Fonts, with a system-font fallback.

## Run it on your computer

Open a terminal in this folder and run either:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000. (Opening `index.html` by double-clicking also mostly works, but a local server is closer to the real hosting.)

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Punyaraj7/portfolio.git
git push -u origin main
```

Create the empty `portfolio` repository on GitHub first (no README, no .gitignore), then run the commands above.

## Deploy on Netlify

1. Go to https://app.netlify.com and choose **Add new site → Import an existing project**.
2. Connect GitHub and pick the `portfolio` repository.
3. Leave **Build command** empty and set **Publish directory** to `.` (netlify.toml already does this).
4. Click **Deploy**. Every `git push` to `main` redeploys automatically.

## Deploy on Vercel

1. Go to https://vercel.com/new and import the `portfolio` repository.
2. **Framework preset:** Other. Leave build and output settings empty.
3. Click **Deploy**. Every `git push` to `main` redeploys automatically.

## How to update content

Almost all text lives near the top of `assets/js/app.js`:

| What to change | Look for |
|---|---|
| Typing lines in the hero | `var TYPED` |
| Projects and case studies | `var PROJECTS` |
| Skills matrix | `var SKILLS` |
| Experience | `var EXPERIENCE` |
| Education | `var EDUCATION` |
| Certifications | `var CERTIFICATIONS` |
| Email, GitHub, LinkedIn | `var EMAIL`, `var GITHUB`, `var LINKEDIN` |
| Power BI showcase pages | `function Dashboard` |

To replace the résumé, put the new PDF in `assets/resume/` with the same file name, or update `RESUME_URL` in `app.js`.

After editing:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Netlify and Vercel pick up the change within a minute.

## Notes

- Colours are CSS variables at the top of `styles.css`. The light theme uses `:root`, the dark theme uses `:root[data-theme="dark"]`.
- Animations respect the visitor's "reduce motion" setting.
- The 3D background pauses when it is off-screen and uses fewer particles on phones.
- Press **Ctrl + K** (or **⌘ K** on Mac) on the site to open the command menu.
