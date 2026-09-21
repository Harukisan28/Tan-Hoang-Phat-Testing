# Accessibility audit — Tân Hoàng Phát

- URL: `http://localhost:5173/`
- Audit engine: axe-core 4.11.1
- Viewport: 390 × 844
- Date: 2026-09-08
- Scope: accessibility review of the active Vite preview

## Summary

The page has solid semantic and interaction foundations: the document has a valid Vietnamese language attribute, one main landmark, a level-one heading, descriptive links and buttons, image alternative text, valid ARIA attributes, and no nested interactive controls. Manual checks also confirmed that the mobile menu opens, closes with Escape, and returns focus to its trigger.

Axe reported serious WCAG AA color-contrast violations. These are visual accessibility issues and should be addressed before production launch.

## Confirmed violations

### 1. Orange brand text on white or orange surfaces

The current orange token `#ef7d2d` produces insufficient contrast in several contexts:

- White text on the orange hero badge: contrast approximately `2.74:1`; affects the `05` count and `Lĩnh vực hoạt động` label.
- Orange intro fact numbers `01` and `02` on white: approximately `2.74:1`.
- Orange service card labels on white: approximately `2.74:1`; affects all five service labels.

Use a darker accessible orange for small text, or reserve the bright orange token for decorative rules, large text, and non-text accents.

### 2. Low-contrast text in the dark values section

The following combinations fail contrast thresholds against `#0b1d2d`:

- Green eyebrow `#0e7a4b`: approximately `3.17:1`.
- Dark-section lead text `#63717a`: approximately `3.39:1`.

The dark-section text tokens should use a lighter green and lighter muted text value.

### 3. Values cards use light text on a pale surface

The values panel uses a pale background around `#dbe5df` while keeping text styles intended for a dark card:

- White value headings: approximately `1.28:1`.
- Light body text `#f3f7f5`: approximately `1.19:1`.
- Orange item numbers: approximately `2.13:1`.

The card text should use dark navy/green text on the pale surface, or the card background should become dark enough to support the existing light text.

## Passing checks

- Valid `lang` attribute and valid language value.
- Non-empty document title.
- Level-one heading present.
- Heading order passed.
- Image `alt` attributes passed, including attribution on stock images.
- Button names and link names passed.
- ARIA attribute validity passed.
- No duplicate ARIA IDs detected.
- Landmarks and bypass navigation checks passed.
- No nested interactive elements detected.

## Recommended remediation

1. Add separate accessible tokens for small orange text and dark-section supporting text.
2. Update service labels and intro fact numbers to use the accessible orange token.
3. Update `.lead--dark` and dark-section eyebrow styling.
4. Rework the `ValuesGrid` text/background pairing.
5. Re-run axe at desktop and mobile widths after the changes.

This review did not modify the implementation.
