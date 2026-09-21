import type { RouteHref, RoutePath, ServiceSlug } from '../types/site';

const serviceSlugs: readonly ServiceSlug[] = [
  'gia-cong-co-khi',
  'san-xuat-theo-yeu-cau',
  'thi-cong-lap-dat',
  'san-pham-inox',
  'vat-tu-co-khi',
];

export const isRoutePath = (value: string): value is RoutePath =>
  value === '/' ||
  value === '/linh-vuc-hoat-dong' ||
  value === '/du-an' ||
  value === '/lien-he';

export const isServiceSlug = (value: string): value is ServiceSlug =>
  serviceSlugs.includes(value as ServiceSlug);

const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
const basePath = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '');

export const siteHref = (href: RouteHref): string => `${baseUrl}${href.replace(/^\/+/, '')}`;

export const siteAsset = (path: string): string => `${baseUrl}${path.replace(/^\/+/, '')}`;

export const serviceHref = (slug: ServiceSlug): `/linh-vuc-hoat-dong#${ServiceSlug}` =>
  `/linh-vuc-hoat-dong#${slug}`;

export const getCurrentPath = (): RoutePath | null => {
  const pathname = basePath && (window.location.pathname === basePath || window.location.pathname.startsWith(`${basePath}/`))
    ? window.location.pathname.slice(basePath.length)
    : window.location.pathname;
  const path = pathname.replace(/\/$/, '') || '/';
  return isRoutePath(path) ? path : null;
};

export const getCurrentServiceSlug = (): ServiceSlug | null => {
  const hash = window.location.hash.replace(/^#/, '');
  return isServiceSlug(hash) ? hash : null;
};

export const navigateTo = (href: RouteHref) => {
  window.history.pushState({}, '', siteHref(href));
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (href.includes('#')) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
};
