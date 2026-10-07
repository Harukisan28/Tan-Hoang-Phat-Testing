import { inoxProducts } from './siteData';
import type { InoxProduct } from '../types/site';

interface VisualizationCell {
  v?: unknown;
  f?: unknown;
}

interface VisualizationResponse {
  status?: string;
  errors?: Array<{ reason?: string; message?: string }>;
  table?: {
    cols?: Array<{ label?: string; id?: string }>;
    rows?: Array<{ c?: Array<VisualizationCell | null> }>;
  };
}

const requiredColumns = ['name', 'category', 'image', 'details', 'popular'] as const;

let activeRequest: { key: string; promise: Promise<InoxProduct[]> } | null = null;

const normalizeSlug = (value: string) => value
  .trim()
  .toLocaleLowerCase('vi')
  .replace(/đ/g, 'd')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const asText = (value: unknown) => typeof value === 'string' || typeof value === 'number'
  ? String(value).trim()
  : '';

const isPopular = (value: unknown) => {
  if (value === true || value === 1) return true;
  return ['true', '1', 'yes', 'y', 'checked', 'có', 'co'].includes(asText(value).toLocaleLowerCase('vi'));
};

const shortText = (value: string, maxLength = 160) => {
  if (value.length <= maxLength) return value;
  const cutoff = value.lastIndexOf(' ', maxLength - 1);
  return `${value.slice(0, cutoff > 80 ? cutoff : maxLength - 1).trim()}…`;
};

export function parseProductCatalogResponse(response: VisualizationResponse): InoxProduct[] {
  if (response.status && response.status !== 'ok') {
    throw new Error(response.errors?.[0]?.message || 'Google Sheets returned an error.');
  }

  const columns = response.table?.cols ?? [];
  const columnIndexes = new Map(columns.map((column, index) => [
    (column.label || column.id || '').trim().toLocaleLowerCase('vi'),
    index,
  ]));

  if (requiredColumns.some((column) => !columnIndexes.has(column))) {
    throw new Error('The sheet must include name, category, image, details, and popular columns.');
  }

  const usedSlugs = new Set<string>();
  const products: InoxProduct[] = [];

  for (const row of response.table?.rows ?? []) {
    const valueAt = (column: (typeof requiredColumns)[number]) => {
      const cell = row.c?.[columnIndexes.get(column) ?? -1];
      return cell?.v ?? cell?.f ?? '';
    };

    const title = asText(valueAt('name'));
    const category = asText(valueAt('category'));
    const imageUrl = asText(valueAt('image'));
    const description = asText(valueAt('details'));

    if (!title || !category || !description) continue;

    let parsedImageUrl: URL;
    try {
      parsedImageUrl = new URL(imageUrl);
    } catch {
      continue;
    }
    if (parsedImageUrl.protocol !== 'https:') continue;

    const baseSlug = normalizeSlug(title) || `product-${products.length + 1}`;
    let slug = baseSlug;
    let duplicateIndex = 2;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${duplicateIndex}`;
      duplicateIndex += 1;
    }
    usedSlugs.add(slug);

    products.push({
      slug,
      path: `/san-pham/${slug}`,
      title,
      category,
      shortDescription: shortText(description),
      description,
      imageUrl,
      imageAlt: `Ảnh ${title}`,
      popular: isPopular(valueAt('popular')),
    });
  }

  return products;
}

function requestProductCatalogFromSheet(sheetId: string, sheetGid: string): Promise<InoxProduct[]> {
  return new Promise((resolve, reject) => {
    const callbackName = `__tanHoangPhatProducts_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const globalWindow = window as unknown as Record<string, unknown>;
    const script = document.createElement('script');
    const requestUrl = new URL(`https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq`);

    requestUrl.searchParams.set('gid', sheetGid);
    requestUrl.searchParams.set('headers', '1');
    requestUrl.searchParams.set('tqx', `out:json;responseHandler:${callbackName}`);
    requestUrl.searchParams.set('_', String(Date.now()));

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      script.removeEventListener('error', handleError);
      script.remove();
      delete globalWindow[callbackName];
    };

    const handleError = () => {
      cleanup();
      reject(new Error('Could not load the published Google Sheet.'));
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('The Google Sheet request timed out.'));
    }, 12_000);

    globalWindow[callbackName] = (response: VisualizationResponse) => {
      cleanup();
      try {
        const products = parseProductCatalogResponse(response);
        if (products.length === 0) throw new Error('No valid product rows were found in the sheet.');
        resolve(products);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('The Google Sheet data could not be parsed.'));
      }
    };

    script.async = true;
    script.src = requestUrl.toString();
    script.addEventListener('error', handleError, { once: true });
    document.head.append(script);
  });
}

export function fetchProductCatalogFromSheet(sheetId: string, sheetGid = '0'): Promise<InoxProduct[]> {
  const key = `${sheetId}:${sheetGid}`;
  if (activeRequest?.key === key) return activeRequest.promise;

  const promise = requestProductCatalogFromSheet(sheetId, sheetGid);
  activeRequest = { key, promise };
  const clearRequest = () => {
    if (activeRequest?.promise === promise) activeRequest = null;
  };
  void promise.then(clearRequest, clearRequest);
  return promise;
}

export interface ProductCategory {
  category: string;
  products: InoxProduct[];
}

export function groupProductsByCategory(products: InoxProduct[]): ProductCategory[] {
  const groupedProducts = new Map<string, InoxProduct[]>();

  for (const product of products) {
    const category = product.category.trim() || 'Khác';
    const categoryProducts = groupedProducts.get(category) ?? [];
    categoryProducts.push(product);
    groupedProducts.set(category, categoryProducts);
  }

  return Array.from(groupedProducts, ([category, categoryProducts]) => ({ category, products: categoryProducts }))
    .sort((first, second) => first.category.localeCompare(second.category, 'vi'));
}

export const fallbackProducts = inoxProducts;
