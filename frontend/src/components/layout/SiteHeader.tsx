import { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Mail, Menu, PhoneCall, X } from 'lucide-react';
import { companyProfile, navItems } from '../../data/siteData';
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
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopProductsRef = useRef<HTMLDivElement>(null);
  const desktopProductsTriggerRef = useRef<HTMLButtonElement>(null);
  const skipProductsOpenOnFocusRef = useRef(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const firstLink = menuPanelRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsMobileProductsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (menuPanelRef.current?.contains(event.target as Node) || menuButtonRef.current?.contains(event.target as Node)) return;
      setIsMenuOpen(false);
      setIsMobileProductsOpen(false);
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
        desktopProductsTriggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!desktopProductsRef.current?.contains(event.target as Node)) {
        setIsDesktopProductsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isDesktopProductsOpen]);

  const handleNavigate = (href: RouteHref) => {
    const shouldReturnFocus = isMenuOpen;
    setIsMenuOpen(false);
    setIsDesktopProductsOpen(false);
    setIsMobileProductsOpen(false);
    if (shouldReturnFocus) menuButtonRef.current?.focus();
    navigateTo(href);
  };

  const renderProductLinks = (className: string, tabIndex?: number) => products.map((product) => {
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
                      onMouseEnter={() => setIsDesktopProductsOpen(true)}
                      onMouseLeave={(event) => {
                        if (!event.currentTarget.contains(document.activeElement)) setIsDesktopProductsOpen(false);
                      }}
                      onFocusCapture={() => {
                        if (skipProductsOpenOnFocusRef.current) {
                          skipProductsOpenOnFocusRef.current = false;
                          return;
                        }
                        setIsDesktopProductsOpen(true);
                      }}
                      onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsDesktopProductsOpen(false);
                      }}
                    >
                      <button
                        ref={desktopProductsTriggerRef}
                        className={`${styles.navLink} ${styles.productsTrigger} ${isDesktopProductsOpen || currentPath.startsWith('/san-pham/') ? styles.productsTriggerOpen : ''}`}
                        type="button"
                        aria-expanded={isDesktopProductsOpen}
                        aria-controls="featured-products-dropdown"
                        onClick={() => setIsDesktopProductsOpen(true)}
                      >
                        Sản phẩm tiêu biểu
                        <ChevronDown aria-hidden="true" size={14} className={isDesktopProductsOpen ? styles.productChevronOpen : ''} />
                      </button>
                      <div id="featured-products-dropdown" className={styles.productsDropdown} role="group" aria-label="Sản phẩm tiêu biểu" hidden={!isDesktopProductsOpen}>
                        {renderProductLinks(styles.productDropdownLink)}
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
                if (isMenuOpen) setIsMobileProductsOpen(false);
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
                    onClick={() => setIsMobileProductsOpen((open) => !open)}
                  >
                    <span>Sản phẩm tiêu biểu</span>
                    <ChevronDown aria-hidden="true" size={16} className={isMobileProductsOpen ? styles.mobileProductsChevronOpen : ''} />
                  </button>
                  <div id="mobile-featured-products-dropdown" className={styles.mobileProductsDropdown} hidden={!isMobileProductsOpen}>
                    {renderProductLinks(styles.mobileProductLink, isMenuOpen && isMobileProductsOpen ? 0 : -1)}
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
