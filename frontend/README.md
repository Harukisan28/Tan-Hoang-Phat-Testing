# Tân Hoàng Phát

Vietnamese introduction website for Công ty TNHH Tân Hoàng Phát.

## Stack

- React + TypeScript
- Vite
- Vanilla CSS with CSS Modules
- Lucide React icons

## Run locally

Node.js 20.19+ is required by the current Vite setup.

```bash
npm install
npm run dev
```

Validation and production build:

```bash
npm run check
npm run build
```

## Host on GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push the repository to GitHub with the frontend in the `frontend/` directory.
2. Use `main` as the deployment branch, or update the branch in the workflow file.
3. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the source.
4. Push to `main` or run the workflow manually from the **Actions** tab.
5. Open the deployment URL shown by the workflow. For a repository named `my-site`, it will usually be `https://<username>.github.io/my-site/`.

The Vite configuration detects the GitHub repository name during Actions builds, and the app prefixes its assets and internal links for repository hosting. The deployment also creates a `404.html` fallback so direct route URLs continue to work.

## Routes

- `/`
- `/gioi-thieu`
- `/linh-vuc-hoat-dong`
- `/du-an`
- `/lien-he`

The site is informational only. It intentionally contains no purchase, cart, checkout, account, or pricing flows.
