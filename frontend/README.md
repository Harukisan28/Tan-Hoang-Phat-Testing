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

## Product catalog from Google Sheets

The product catalog can read from a public, view-only Google Sheet. To set it up:

1. Create a sheet with a header row containing these five column names: `name`, `category`, `image`, `details`, `popular`.
2. Add products below the header. Use a Google Sheets checkbox for `popular`; checked products are featured in **Sản phẩm nổi bật** and also remain in their category in **Sản phẩm tiêu biểu**.
3. In Google Sheets, share the sheet as **Anyone with the link — Viewer**. The website only reads product data; it cannot edit the sheet.
4. Put a direct, public HTTPS image URL in each `image` cell. The URL must load the actual image without sign-in; a Google Drive preview/share page is not a direct image URL.
5. Copy the spreadsheet ID from its URL (the part between `/d/` and `/edit`). For the first sheet tab, use `0` for the tab ID; for another tab, copy its `gid` from the sheet URL.
6. For local development, copy `.env.example` to `.env.local` and set `VITE_PRODUCT_SHEET_ID` and `VITE_PRODUCT_SHEET_GID`.
7. GitHub Pages uses this sheet (ID `1TJ3ni1bJfRdWwMUopChnjMLibzWqCrp4WZMN9nwwHRU`, tab `0`) by default. If you later use a different sheet, set **Actions repository variables** named `VITE_PRODUCT_SHEET_ID` and `VITE_PRODUCT_SHEET_GID` to override it. A new deploy is needed only when changing the sheet configuration, not when adding or editing product rows.

The page checks the sheet on load, about once per minute, and when a hidden tab becomes visible again. Google may take a few minutes to reflect sheet edits in its read-only visualization data source. The site keeps showing the last valid catalog if a refresh fails, and uses the built-in Bàn inox and Ghế inox records until the sheet is configured or returns valid rows. Product URLs are generated from their names; renaming a product changes its detail URL.

## Routes

- `/`
- `/linh-vuc-hoat-dong`
- `/san-pham/:slug` (generated from the product name)
- `/lien-he`

The site is informational only. It intentionally contains no purchase, cart, checkout, account, or pricing flows.
