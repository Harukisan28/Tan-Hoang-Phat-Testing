import type { MouseEvent, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { RouteHref } from '../../types/site';
import { siteHref } from '../../utils/routing';

interface ButtonLinkProps {
  href: RouteHref;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'light';
  size?: 'default' | 'small';
  className?: string;
  onNavigate?: (href: RouteHref) => void;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  size = 'default',
  className = '',
  onNavigate,
  ariaLabel,
}: ButtonLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <a
      className={`button-link button-link--${variant} button-link--${size} ${className}`.trim()}
      href={siteHref(href)}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.4} />
    </a>
  );
}
