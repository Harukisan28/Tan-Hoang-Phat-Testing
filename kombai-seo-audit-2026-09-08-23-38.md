# SEO audit — Tân Hoàng Phát

- URL: `http://localhost:5173/`
- Audit mode: SEO review of the active Vite preview
- Date: 2026-09-08

## Summary

The page has a good basic SEO foundation and received an overall audit score of `0.714`. The document includes a meta description, a descriptive title, successful HTTP status, crawlable page content, and descriptive link text.

The two reported problem areas are primarily related to the development server and responsive navigation implementation rather than visible content errors.

## Passing checks

- Meta description exists.
- Document title exists: `Tân Hoàng Phát | Giải pháp cơ khí chất lượng`.
- HTTP status is successful (`200`).
- Page content is crawlable by the tested bot user agents.
- All checked links have descriptive text.
- Canonical and hreflang checks were not applicable in the local client-side preview.
- Performance snapshot was strong: FCP `416ms`, LCP `732ms`, FID `1ms`, INP `208ms`.

## Findings

### 1. Hidden responsive navigation anchors

The audit reported 12 uncrawlable links because the desktop/mobile navigation renders duplicate route links. The mobile copy is intentionally hidden on desktop using `display: none`, zero dimensions, or negative tab indices.

This is expected responsive behavior and does not prevent the visible desktop navigation from working. If SEO tooling must report zero hidden anchors, consider rendering one shared navigation list and changing only its layout at the breakpoint, rather than rendering separate desktop and mobile link sets.

### 2. Missing production `robots.txt`

The local Vite server returns the application HTML fallback for `/robots.txt`. The audit consequently parsed HTML as robots directives and reported 19 syntax errors.

Before deployment, add a real file at `frontend/public/robots.txt`, for example:

```text
User-agent: *
Allow: /
Sitemap: https://www.tanhoangphat.com.vn/sitemap.xml
```

Use the final production domain and sitemap location when those values are confirmed.

### 3. Route metadata opportunity

The current single-document client-side router uses one document title and description. For stronger search previews, assign route-aware titles and descriptions when the path changes, and add canonical URLs once the production domain is confirmed.

## Recommended remediation

1. Add `public/robots.txt` and a production sitemap when deployment URLs are known.
2. Decide whether the duplicate desktop/mobile navigation is acceptable for the target SEO tooling.
3. Add route-specific document metadata for the five informational pages.
4. Re-run the SEO audit against the production build, not the Vite development fallback.

This review did not modify the implementation.
