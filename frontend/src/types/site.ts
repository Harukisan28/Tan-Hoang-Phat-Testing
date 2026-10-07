export type InoxProductSlug = 'ban-inox' | 'ghe-inox';
export type InoxProductPath = `/san-pham/${InoxProductSlug}`;
export type RoutePath = '/' | '/linh-vuc-hoat-dong' | '/lien-he' | InoxProductPath;

export type ServiceSlug =
  | 'gia-cong-co-khi'
  | 'san-xuat-theo-yeu-cau'
  | 'thi-cong-lap-dat'
  | 'san-pham-inox'
  | 'vat-tu-co-khi';

export type ServiceHref = `/linh-vuc-hoat-dong#${ServiceSlug}`;
export type RouteHref = RoutePath | ServiceHref;


export interface CompanyProfile {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

export interface NavItem {
  label: string;
  href: RoutePath;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceArea {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  summary: string;
  bullets: string[];
  imageUrl: string;
  imageAlt: string;
}


export interface InoxProduct {
  slug: InoxProductSlug;
  path: InoxProductPath;
  title: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  useCases: string[];
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
}

export interface MaterialReference {
  title: string;
  url: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}
