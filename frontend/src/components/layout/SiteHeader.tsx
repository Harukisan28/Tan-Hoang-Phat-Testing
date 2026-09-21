import { ChevronDown, Mail, Menu, PhoneCall, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { companyProfile, navItems } from '../../data/siteData';
import type { RoutePath } from '../../types/site';
import { navigateTo, siteAsset, siteHref } from '../../utils/routing';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  currentPath: RoutePath;
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const firstLink = menuPanelRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (menuPanelRef.current?.contains(event.target as Node) || menuButtonRef.current?.contains(event.target as Node)) return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  const handleNavigate = (href: RoutePath) => {
    const shouldReturnFocus = isMenuOpen;
    setIsMenuOpen(false);
    if (shouldReturnFocus) menuButtonRef.current?.focus();
    navigateTo(href);
  };

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
                <a
                  key={item.href}
                  className={`${styles.navLink} ${currentPath === item.href ? styles.navLinkActive : ''}`}
                  href={siteHref(item.href)}
                  aria-current={currentPath === item.href ? 'page' : undefined}
                  onClick={(event) => { event.preventDefault(); handleNavigate(item.href); }}
                >
                  {item.label}
                  {item.href === '/linh-vuc-hoat-dong' && <ChevronDown aria-hidden="true" size={14} />}
                </a>
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
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            </button>
          </div>
        </div>
      </div>
      <nav ref={menuPanelRef} id="mobile-navigation" className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`} aria-label="Điều hướng di động" aria-hidden={!isMenuOpen}>
        <div className="container">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`${styles.mobileNavLink} ${currentPath === item.href ? styles.mobileNavLinkActive : ''}`}
              href={siteHref(item.href)}
              tabIndex={isMenuOpen ? 0 : -1}
              aria-current={currentPath === item.href ? 'page' : undefined}
              onClick={(event) => { event.preventDefault(); handleNavigate(item.href); }}
            >
              <span>{item.label}</span>
              <ChevronDown aria-hidden="true" size={16} className={styles.mobileArrow} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
