import { companyProfile, serviceAreas } from '../data/siteData';
import { groupProductsByCategory } from '../data/productCatalog';
import type { InoxProduct, RouteHref } from '../types/site';
import { RuleHeading } from '../components/sections/RuleHeading';
import { ValuesGrid } from '../components/about/ValuesGrid';
import { InoxProductCard } from '../components/cards/InoxProductCard';
import { ServiceCard } from '../components/cards/ServiceCard';
import { IdentityHero } from '../components/home/IdentityHero';
import { ProofStrip } from '../components/home/ProofStrip';
import styles from './HomePage.module.css';

const MAX_POPULAR_PRODUCTS = 5;
const MAX_PRODUCT_CATEGORIES = 5;
const PRODUCTS_PER_CATEGORY = 1;

interface HomePageProps {
  products: InoxProduct[];
  onNavigate: (href: RouteHref) => void;
}

export function HomePage({ products, onNavigate }: HomePageProps) {
  const popularProducts = products.filter((product) => product.popular).slice(0, MAX_POPULAR_PRODUCTS);
  const productCategories = groupProductsByCategory(products)
    .slice(0, MAX_PRODUCT_CATEGORIES)
    .map(({ category, products: categoryProducts }) => ({
      category,
      products: categoryProducts.slice(0, PRODUCTS_PER_CATEGORY),
    }));
  const categoryPreviewProducts = productCategories.flatMap(({ products: categoryProducts }) => categoryProducts);

  return (
    <>
      <IdentityHero onNavigate={onNavigate} />

      <section className={`${styles.servicesSection} section`} aria-labelledby="services-title">
        <div className="container">
          <RuleHeading id="services-title" title="LĨNH VỰC HOẠT ĐỘNG" />
          <p className={styles.serviceIntro}>
            Từ gia công chi tiết đến thi công hoàn thiện, mỗi lĩnh vực là một cách Tân Hoàng Phát biến yêu cầu kỹ thuật thành sản phẩm có giá trị sử dụng lâu dài.
          </p>
          <div className={styles.serviceRail}>
            {serviceAreas.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section className={`${styles.popularSection} section`} aria-labelledby="popular-products-title">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <p className="eyebrow">Được quan tâm</p>
                <h2 id="popular-products-title" className="section-heading">Sản phẩm nổi bật</h2>
                <p className="lead">Những sản phẩm được Tân Hoàng Phát giới thiệu nổi bật.</p>
              </div>
            </div>
            <div className={styles.productGrid}>
              {popularProducts.map((product) => <InoxProductCard key={product.slug} product={product} onNavigate={onNavigate} />)}
            </div>
          </div>
        </section>
      )}

      <section className={`${styles.productsSection} section`} aria-labelledby="products-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <p className="eyebrow">Danh mục sản phẩm</p>
              <h2 id="products-title" className="section-heading">Sản phẩm tiêu biểu</h2>
              <p className="lead">Khám phá đầy đủ các sản phẩm được sắp xếp theo danh mục.</p>
            </div>
          </div>
          {categoryPreviewProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {categoryPreviewProducts.map((product) => <InoxProductCard key={product.slug} product={product} onNavigate={onNavigate} />)}
            </div>
          ) : (
            <p className={styles.emptyProducts}>Danh mục sản phẩm đang được cập nhật.</p>
          )}
        </div>
      </section>

      <section className={styles.valuesSection} aria-labelledby="core-values-title">
        <div className="container">
          <h2 id="core-values-title">GIÁ TRỊ CỐT LÕI</h2>
          <ValuesGrid dark />
        </div>
      </section>

      <ProofStrip />
      <p className={styles.screenReaderNote}>{companyProfile.name} — {companyProfile.tagline}</p>
    </>
  );
}
