import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronRight, Mail, Menu, PhoneCall, X } from 'lucide-react';
import { companyProfile, navItems } from '../../data/siteData';
import { groupProductsByCategory } from '../../data/productCatalog';
import type { InoxProduct, RouteHref, RoutePath } from '../../types/site';
import { navigateTo, siteAsset, siteHref } from '../../utils/routing';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  currentPath: RoutePath;
  products: InoxProduct[];
}

export function SiteHeader({ currentPath, products }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [activeDesktopCategory, setActiveDesktopCategory] = useState<string | null>(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopProductsRef = useRef<HTMLDivElement>(null);
  const desktopProductsTriggerRef = useRef<HTMLButtonElement>(null);
  const skipProductsOpenOnFocusRef = useRef(false);
  const productCategories = useMemo(() => groupProductsByCategory(products), [products]);
  const desktopCategory = productCategories.find(({ category }) => category === activeDesktopCategory) ?? null;

  useEffect(() => {
    if (!isMenuOpen) return;

    const firstLink = menuPanelRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsMobileProductsOpen(false);
        setActiveMobileCategory(null);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (menuPanelRef.current?.contains(event.target as Node) || menuButtonRef.current?.contains(event.target as Node)) return;
      setIsMenuOpen(false);
      setIsMobileProductsOpen(false);
      setActiveMobileCategory(null);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isDesktopProductsOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        skipProductsOpenOnFocusRef.current = document.activeElement !== desktopProductsTriggerRef.current;
        setIsDesktopProductsOpen(false);
        setActiveDesktopCategory(null);
        desktopProductsTriggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!desktopProductsRef.current?.contains(event.target as Node)) {
        setIsDesktopProductsOpen(false);
        setActiveDesktopCategory(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isDesktopProductsOpen]);

  const openDesktopProducts = () => {
    setIsDesktopProductsOpen(true);
  };

  const handleNavigate = (href: RouteHref) => {
    const shouldReturnFocus = isMenuOpen;
    setIsMenuOpen(false);
    setIsDesktopProductsOpen(false);
    setIsMobileProductsOpen(false);
    setActiveDesktopCategory(null);
    setActiveMobileCategory(null);
    if (shouldReturnFocus) menuButtonRef.current?.focus();
    navigateTo(href);
  };

  const renderProductLinks = (className: string, categoryProducts: InoxProduct[], tabIndex?: number) => categoryProducts.map((product) => {
    const href = product.path;
    return (
      <a
        key={product.slug}
        className={className}
        href={siteHref(href)}
        tabIndex={tabIndex}
        onClick={(event) => {
          event.preventDefault();
          handleNavigate(href);
        }}
      >
        {product.title}
        <ArrowUpRight aria-hidden="true" size={15} />
      </a>
    );
  });

  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        <div className="container">
          <div className={styles.utilityContent}>
            <span>Giải pháp cơ khí chất lượng – đồng hành cùng phát triển</span>
            <div className={styles.utilityLinks}>
              <a href={`tel:${companyProfile.phone}`}><PhoneCall aria-hidden="true" size={14} /> {companyProfile.phone}</a>
              <a href={`mailto:${companyProfile.email}`}><Mail aria-hidden="true" size={14} /> {companyProfile.email}</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainBar}>
        <div className="container">
          <div className={styles.mainBarInner}>
            <a className={styles.logoLink} href={siteHref('/')} aria-label="Tân Hoàng Phát - Trang chủ" onClick={(event) => { event.preventDefault(); handleNavigate('/'); }}>
              <img src={siteAsset('/assets/tan-hoang-phat-logo.jpeg')} alt="Logo Tân Hoàng Phát" />
            </a>
            <nav className={styles.desktopNav} aria-label="Điều hướng chính">
              {navItems.map((item) => (
                <Fragment key={item.href}>
                  {item.href === '/lien-he' && (
                    <div
                      ref={desktopProductsRef}
                      className={styles.productsItem}
                      onMouseEnter={openDesktopProducts}
                      onMouseLeave={(event) => {
                        if (!event.currentTarget.contains(document.activeElement)) {
                          setIsDesktopProductsOpen(false);
                          setActiveDesktopCategory(null);
                        }
                      }}
                      onFocusCapture={() => {
                        if (skipProductsOpenOnFocusRef.current) {
                          skipProductsOpenOnFocusRef.current = false;
                          return;
                        }
                        openDesktopProducts();
                      }}
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                          setIsDesktopProductsOpen(false);
                          setActiveDesktopCategory(null);
                        }
                      }}
                    >
                      <button
                        ref={desktopProductsTriggerRef}
                        className={`${styles.navLink} ${styles.productsTrigger} ${isDesktopProductsOpen || currentPath.startsWith('/san-pham/') ? styles.productsTriggerOpen : ''}`}
                        type="button"
                        aria-expanded={isDesktopProductsOpen}
                        aria-controls="featured-products-dropdown"
                        onClick={() => {
                          if (isDesktopProductsOpen) {
                            setIsDesktopProductsOpen(false);
                            setActiveDesktopCategory(null);
                          } else {
                            openDesktopProducts();
                          }
                        }}
                      >
                        Sản phẩm gia dụng
                        <ChevronDown aria-hidden="true" size={14} className={isDesktopProductsOpen ? styles.productChevronOpen : ''} />
                      </button>
                      <div id="featured-products-dropdown" className={styles.productsDropdown} role="group" aria-label="Danh mục sản phẩm gia dụng" hidden={!isDesktopProductsOpen}>
                        <div className={styles.productCategoryList} aria-label="Danh mục sản phẩm">
                          {productCategories.map((category) => (
                            <button
                              key={category.category}
                              className={`${styles.productCategoryButton} ${desktopCategory?.category === category.category ? styles.productCategoryButtonActive : ''}`}
                              type="button"
                              aria-expanded={desktopCategory?.category === category.category}
                              aria-controls="featured-category-products-panel"
                              onMouseEnter={() => setActiveDesktopCategory(category.category)}
                              onFocus={() => setActiveDesktopCategory(category.category)}
                              onClick={() => setActiveDesktopCategory(category.category)}
                            >
                              <span>{category.category}</span>
                              <ChevronRight aria-hidden="true" size={15} />
                            </button>
                          ))}
                        </div>
                        <div id="featured-category-products-panel" className={styles.productsCategoryPanel} role="group" aria-label={desktopCategory ? `Sản phẩm: ${desktopCategory.category}` : 'Sản phẩm trong danh mục'}>
                          {desktopCategory ? (
                            <>
                              <p className={styles.productsCategoryHeading}>{desktopCategory.category}</p>
                              <div className={styles.productsSubmenu}>
                                {renderProductLinks(styles.productDropdownLink, desktopCategory.products)}
                              </div>
                            </>
                          ) : <p className={styles.productsCategoryEmpty}>Di chuột hoặc chọn danh mục để xem sản phẩm.</p>}
                        </div>
                      </div>
                    </div>
                  )}
                  <a
                    className={`${styles.navLink} ${currentPath === item.href ? styles.navLinkActive : ''}`}
                    href={siteHref(item.href)}
                    aria-current={currentPath === item.href ? 'page' : undefined}
                    onClick={(event) => { event.preventDefault(); handleNavigate(item.href); }}
                  >
                    {item.label}
                  </a>
                </Fragment>
              ))}
            </nav>
            <a className={styles.desktopCta} href={siteHref('/lien-he')} onClick={(event) => { event.preventDefault(); handleNavigate('/lien-he'); }}>
              Nhận tư vấn
            </a>
            <button
              ref={menuButtonRef}
              className={styles.menuButton}
              type="button"
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                if (isMenuOpen) {
                  setIsMobileProductsOpen(false);
                  setActiveMobileCategory(null);
                }
                setIsMenuOpen((open) => !open);
              }}
            >
              {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            </button>
          </div>
        </div>
      </div>
      <nav ref={menuPanelRef} id="mobile-navigation" className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`} aria-label="Điều hướng di động" aria-hidden={!isMenuOpen}>
        <div className="container">
          {navItems.map((item) => (
            <Fragment key={item.href}>
              {item.href === '/lien-he' && (
                <div className={styles.mobileProductsItem}>
                  <button
                    className={`${styles.mobileProductsTrigger} ${isMobileProductsOpen ? styles.mobileProductsTriggerOpen : ''}`}
                    type="button"
                    tabIndex={isMenuOpen ? 0 : -1}
                    aria-expanded={isMobileProductsOpen}
                    aria-controls="mobile-featured-products-dropdown"
                    onClick={() => {
                      setIsMobileProductsOpen((open) => !open);
                      setActiveMobileCategory(null);
                    }}
                  >
                    <span>Sản phẩm gia dụng</span>
                    <ChevronDown aria-hidden="true" size={16} className={isMobileProductsOpen ? styles.mobileProductsChevronOpen : ''} />
                  </button>
                  <div id="mobile-featured-products-dropdown" className={styles.mobileProductsDropdown} hidden={!isMobileProductsOpen}>
                    {productCategories.map((category) => {
                      const categoryId = `mobile-category-products-${productCategories.indexOf(category)}`;
                      const isCategoryOpen = activeMobileCategory === category.category;
                      return (
                        <div className={styles.mobileCategory} key={category.category}>
                          <button
                            className={`${styles.mobileCategoryButton} ${isCategoryOpen ? styles.mobileCategoryButtonActive : ''}`}
                            type="button"
                            tabIndex={isMenuOpen && isMobileProductsOpen ? 0 : -1}
                            aria-expanded={isCategoryOpen}
                            aria-controls={categoryId}
                            onClick={() => setActiveMobileCategory((active) => active === category.category ? null : category.category)}
                          >
                            <span>{category.category}</span>
                            <ChevronDown aria-hidden="true" size={15} className={isCategoryOpen ? styles.mobileProductsChevronOpen : ''} />
                          </button>
                          <div id={categoryId} className={styles.mobileCategoryProducts} hidden={!isCategoryOpen}>
                            {renderProductLinks(styles.mobileProductLink, category.products, isMenuOpen && isCategoryOpen ? 0 : -1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <a
                className={`${styles.mobileNavLink} ${currentPath === item.href ? styles.mobileNavLinkActive : ''}`}
                href={siteHref(item.href)}
                tabIndex={isMenuOpen ? 0 : -1}
                aria-current={currentPath === item.href ? 'page' : undefined}
                onClick={(event) => { event.preventDefault(); handleNavigate(item.href); }}
              >
                <span>{item.label}</span>
                <ChevronDown aria-hidden="true" size={16} className={styles.mobileArrow} />
              </a>
            </Fragment>
          ))}
        </div>
      </nav>
    </header>
  );
}
