export type RoutePath = '/' | '/linh-vuc-hoat-dong' | '/du-an' | '/lien-he';

export type ServiceSlug =
  | 'gia-cong-co-khi'
  | 'san-xuat-theo-yeu-cau'
  | 'thi-cong-lap-dat'
  | 'san-pham-inox'
  | 'vat-tu-co-khi';

export type ServiceHref = `/linh-vuc-hoat-dong#${ServiceSlug}`;
export type RouteHref = RoutePath | ServiceHref;

export type ProjectCategory =
  | 'Gia công cơ khí'
  | 'Sản xuất theo yêu cầu'
  | 'Thi công – lắp đặt'
  | 'Sản phẩm inox';

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

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  outcome: string;
  imageUrl: string;
  imageAlt: string;
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
