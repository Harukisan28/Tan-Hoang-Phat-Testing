import { useEffect, useRef, useState } from 'react';
import type { FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent, TouchEvent as ReactTouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { siteAsset } from '../../utils/routing';
import styles from './HeroBannerCarousel.module.css';

const banners = [
  {
    src: '/assets/banner-installation-services.jpg',
    alt: 'Thi công, lắp đặt hệ thống băng tải, kệ, giá, kết cấu thép và các hạng mục cơ khí.',
    width: 1915,
    height: 821,
  },
  {
    src: '/assets/banner-brand-logo-tagline.jpg',
    alt: 'Tân Hoàng Phát — Giải pháp cơ khí chất lượng, đồng hành cùng phát triển.',
    width: 1912,
    height: 823,
  },
  {
    src: '/assets/banner-custom-metal-fabrication.jpg',
    alt: 'Gia công cơ khí: cắt, chấn, hàn, tiện, phay và bào theo yêu cầu kỹ thuật.',
    width: 1672,
    height: 941,
  },
  {
    src: '/assets/banner-stainless-products.jpg',
    alt: 'Sản phẩm inox: tủ, bàn, kệ, xe đẩy inox và thiết bị công nghiệp bền đẹp.',
    width: 1915,
    height: 821,
  },
  {
    src: '/assets/banner-made-to-order-production.jpg',
    alt: 'Sản xuất theo yêu cầu, gia công theo bản vẽ và đáp ứng nhu cầu từng công trình.',
    width: 1672,
    height: 941,
  },
  {
    src: '/assets/banner-mechanical-supplies.jpg',
    alt: 'Cung cấp vật tư cơ khí, phụ kiện và chi tiết phục vụ sản xuất chất lượng cao.',
    width: 1916,
    height: 821,
  },
] as const;

const autoplayDelayMs = 6000;

export function HeroBannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => document.visibilityState === 'visible');
  const touchStartX = useRef<number | null>(null);
  const activeBanner = banners[activeIndex];
  const isAutoAdvancing = !isHovered && !isFocused && isDocumentVisible && !prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState === 'visible');

    mediaQuery.addEventListener('change', updateMotionPreference);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isAutoAdvancing) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, autoplayDelayMs);
    return () => window.clearInterval(intervalId);
  }, [isAutoAdvancing]);

  const goToPrevious = () => setActiveIndex((current) => (current - 1 + banners.length) % banners.length);
  const goToNext = () => setActiveIndex((current) => (current + 1) % banners.length);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setIsFocused(false);
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLImageElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]?.clientX - touchStartX.current;
    if (typeof distance === 'number' && Math.abs(distance) > 45) {
      if (distance < 0) goToNext();
      else goToPrevious();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className={styles.carousel}
      role="region"
      aria-label="Ảnh giới thiệu Tân Hoàng Phát"
      aria-roledescription="trình chiếu"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.slideFrame}>
        <img
          key={activeBanner.src}
          className={styles.banner}
          src={siteAsset(activeBanner.src)}
          alt={activeBanner.alt}
          width={activeBanner.width}
          height={activeBanner.height}
          fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
          decoding="async"
          onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      <div className={styles.carouselControls}>
        <button className={styles.controlButton} type="button" aria-label="Ảnh trước" title="Ảnh trước" onClick={goToPrevious}>
          <ChevronLeft aria-hidden="true" size={14} />
        </button>
        <button className={styles.controlButton} type="button" aria-label="Ảnh tiếp theo" title="Ảnh tiếp theo" onClick={goToNext}>
          <ChevronRight aria-hidden="true" size={14} />
        </button>
        <div className={styles.slideIndicators} role="group" aria-label="Chọn ảnh giới thiệu">
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''}`}
              type="button"
              aria-label={`Ảnh ${index + 1} trên ${banners.length}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      <span className="sr-only" aria-live={isAutoAdvancing ? 'off' : 'polite'} aria-atomic="true">
        Ảnh {activeIndex + 1} trên {banners.length}: {activeBanner.alt}
      </span>
    </section>
  );
}
