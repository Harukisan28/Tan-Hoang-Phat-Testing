import { useEffect, useState } from 'react';
import { fetchProductCatalogFromSheet, fallbackProducts } from '../data/productCatalog';
import type { InoxProduct } from '../types/site';

export type ProductCatalogStatus = 'fallback' | 'loading' | 'ready';

export interface ProductCatalogState {
  products: InoxProduct[];
  status: ProductCatalogStatus;
  lastUpdated: Date | null;
  error: string | null;
}

const refreshIntervalMs = 60_000;
const sheetId = import.meta.env.VITE_PRODUCT_SHEET_ID?.trim() ?? '';
const sheetGid = import.meta.env.VITE_PRODUCT_SHEET_GID?.trim() || '0';

export function useProductCatalog(): ProductCatalogState {
  const [catalog, setCatalog] = useState<ProductCatalogState>(() => ({
    products: fallbackProducts,
    status: sheetId ? 'loading' : 'fallback',
    lastUpdated: null,
    error: null,
  }));

  useEffect(() => {
    if (!sheetId) return;

    let isMounted = true;
    let isLoading = false;

    const refreshCatalog = async () => {
      if (isLoading || document.visibilityState === 'hidden') return;
      isLoading = true;

      try {
        const products = await fetchProductCatalogFromSheet(sheetId, sheetGid);
        if (isMounted) {
          setCatalog({ products, status: 'ready', lastUpdated: new Date(), error: null });
        }
      } catch (error) {
        if (isMounted) {
          setCatalog((current) => ({
            ...current,
            status: current.lastUpdated ? 'ready' : 'fallback',
            error: error instanceof Error ? error.message : 'Could not refresh the product catalog.',
          }));
        }
      } finally {
        isLoading = false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') void refreshCatalog();
    };

    void refreshCatalog();
    const intervalId = window.setInterval(() => void refreshCatalog(), refreshIntervalMs);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return catalog;
}
