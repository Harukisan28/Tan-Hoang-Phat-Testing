import { useEffect, useState } from 'react';
import { SiteFooter } from '../layout/SiteFooter';
import { SiteHeader } from '../layout/SiteHeader';
import { ScrollToTop } from '../layout/ScrollToTop';
import { AreasPage } from '../../pages/AreasPage';
import { ContactPage } from '../../pages/ContactPage';
import { HomePage } from '../../pages/HomePage';
import { ProjectsPage } from '../../pages/ProjectsPage';
import type { RouteHref, RoutePath } from '../../types/site';
import { getCurrentPath, navigateTo, siteHref } from '../../utils/routing';

function NotFoundPage({ onNavigate }: { onNavigate: (href: RoutePath) => void }) {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Không tìm thấy trang</p>
        <h1 className="page-title">Nội dung bạn tìm kiếm chưa sẵn sàng.</h1>
        <p className="lead">Hãy quay lại trang chủ để khám phá năng lực và các lĩnh vực hoạt động của Tân Hoàng Phát.</p>
        <div className="button-row not-found-actions">
          <a className="button-link" href={siteHref('/')} onClick={(event) => { event.preventDefault(); onNavigate('/'); }}>Về trang chủ</a>
        </div>
      </div>
    </section>
  );
}

export function AppRouter() {
  const [path, setPath] = useState<RoutePath | null>(() => getCurrentPath());

  useEffect(() => {
    const handlePopState = () => setPath(getCurrentPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (href: RouteHref) => {
    const currentHref = `${getCurrentPath() ?? ''}${window.location.hash}`;
    if (href === currentHref) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigateTo(href);
  };

  const renderPage = () => {
    switch (path) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/linh-vuc-hoat-dong':
        return <AreasPage onNavigate={handleNavigate} />;
      case '/du-an':
        return <ProjectsPage onNavigate={handleNavigate} />;
      case '/lien-he':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="site-shell">
      <ScrollToTop path={path ?? 'not-found'} />
      <SiteHeader currentPath={path ?? '/'} />
      <main>{renderPage()}</main>
      <SiteFooter />
    </div>
  );
}
