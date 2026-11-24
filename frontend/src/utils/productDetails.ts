export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetails {
  /** Lines without a "Nhãn: giá trị" shape, shown as a short intro. */
  intro: string[];
  /** "Nhãn: giá trị" lines rendered as a spec table. */
  specs: ProductSpec[];
  /** Note lines such as "Chú ý" or "Lưu ý", rendered after the specs with emphasis. */
  notes: ProductSpec[];
}

const noteLabels = new Set(['chú ý', 'lưu ý', 'ghi chú', 'chú thích']);

const splitLines = (value: string): string[] => value
  .split(/\r?\n/)
  .map((line) => line.replace(/\s+/g, ' ').trim())
  .filter(Boolean);

/**
 * Reads the sheet `details` cell. A cell may hold several lines shaped
 * "Nhãn: giá trị"; those become specs, while anything else stays as prose.
 */
export function parseProductDetails(details: string): ProductDetails {
  const intro: string[] = [];
  const specs: ProductSpec[] = [];
  const notes: ProductSpec[] = [];

  for (const line of splitLines(details)) {
    const match = /^([^:]{2,40}?)\s*:\s*(.*)$/u.exec(line);
    const label = match?.[1]?.trim() ?? '';
    const value = match?.[2]?.trim() ?? '';

    if (label && value) {
      if (noteLabels.has(label.toLocaleLowerCase('vi'))) notes.push({ label, value });
      else specs.push({ label, value });
      continue;
    }

    // "Mã :" with an empty value carries no information, so it is dropped.
    if (label) continue;

    intro.push(line);
  }

  return { intro, specs, notes };
}

/** One-line summary for cards and page headers when the cell holds specs only. */
export function summarizeProductDetails(details: string, maxLength = 160): string {
  const { intro, specs } = parseProductDetails(details);
  const source = intro.length > 0
    ? intro.join(' ')
    : specs.map((spec) => spec.value).join(' – ');

  const text = (source || details.replace(/\s+/g, ' ').trim());
  if (text.length <= maxLength) return text;

  const cutoff = text.lastIndexOf(' ', maxLength - 1);
  return `${text.slice(0, cutoff > 80 ? cutoff : maxLength - 1).trim()}…`;
}
