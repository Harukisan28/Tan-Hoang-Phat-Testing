import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import { searchProducts } from '../../data/productCatalog';
import type { InoxProduct, RouteHref } from '../../types/site';
import { siteHref } from '../../utils/routing';
import styles from './ProductSearch.module.css';

interface ProductSearchProps {
  id: string;
  products: InoxProduct[];
  onNavigate: (href: RouteHref) => void;
  isEnabled?: boolean;
}

const maxSuggestions = 5;

export function ProductSearch({ id, products, onNavigate, isEnabled = true }: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputId = `${id}-input`;
  const listboxId = `${id}-suggestions`;
  const options = useMemo(() => searchProducts(products, query).slice(0, maxSuggestions), [products, query]);

  useEffect(() => {
    if (isEnabled) return;
    setIsOpen(false);
    setActiveIndex(-1);
  }, [isEnabled]);

  useEffect(() => {
    if (!isOpen || !isEnabled) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const openProduct = (product: InoxProduct) => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(-1);
    onNavigate(product.path);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product = options[activeIndex] ?? options[0];
    if (product) openProduct(product);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => options.length === 0 ? -1 : (current + 1) % options.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => options.length === 0 ? -1 : current <= 0 ? options.length - 1 : current - 1);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const statusMessage = !query.trim()
    ? ''
    : options.length > 0
      ? `Có ${options.length} gợi ý sản phẩm.`
      : 'Không tìm thấy sản phẩm phù hợp.';

  return (
    <div ref={rootRef} className={styles.searchRoot} aria-hidden={!isEnabled}>
      <form className={styles.searchForm} role="search" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={inputId}>Tìm kiếm sản phẩm</label>
        <Search className={styles.searchIcon} aria-hidden="true" size={17} />
        <input
          id={inputId}
          className={styles.searchInput}
          type="search"
          role="combobox"
          tabIndex={isEnabled ? 0 : -1}
          aria-autocomplete="list"
          aria-expanded={isOpen && Boolean(query.trim())}
          aria-controls={isOpen && query.trim() ? listboxId : undefined}
          aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
          autoComplete="off"
          placeholder="Tìm kiếm"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => { if (query.trim()) setIsOpen(true); }}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button
            className={styles.clearButton}
            type="button"
            tabIndex={isEnabled ? 0 : -1}
            aria-label="Xóa nội dung tìm kiếm"
            onClick={() => {
              setQuery('');
              setActiveIndex(-1);
              setIsOpen(false);
            }}
          >
            <X aria-hidden="true" size={15} />
          </button>
        )}
      </form>
      {isOpen && query.trim() && (
        <div className={styles.suggestions}>
          {options.length > 0 ? (
            <div id={listboxId} role="listbox" aria-label="Sản phẩm phù hợp">
              {options.map((product, index) => (
                <a
                  key={product.slug}
                  id={`${id}-option-${index}`}
                  className={`${styles.suggestion} ${activeIndex === index ? styles.suggestionActive : ''}`}
                  href={siteHref(product.path)}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={(event) => {
                    event.preventDefault();
                    openProduct(product);
                  }}
                >
                  <span className={styles.suggestionTitle}>{product.title}</span>
                  <span className={styles.suggestionCategory}>{product.category}</span>
                </a>
              ))}
            </div>
          ) : (
            <p id={listboxId} className={styles.noResults} role="status">Không tìm thấy sản phẩm phù hợp.</p>
          )}
        </div>
      )}
      <span className="sr-only" role="status" aria-live="polite">{statusMessage}</span>
    </div>
  );
}
