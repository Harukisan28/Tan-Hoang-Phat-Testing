import type { CompanyProfile, InoxProduct, MaterialReference, NavItem, ServiceArea, ValueItem } from '../types/site';

export const companyProfile: CompanyProfile = {
  name: 'Tân Hoàng Phát',
  legalName: 'CÔNG TY TNHH TÂN HOÀNG PHÁT',
  tagline: 'Giải pháp cơ khí chất lượng – đồng hành cùng phát triển',
  description:
    'Công ty TNHH Tân Hoàng Phát là đơn vị chuyên thiết kế, gia công và lắp đặt các sản phẩm cơ khí, inox theo yêu cầu. Với đội ngũ kỹ thuật giàu kinh nghiệm và hệ thống máy móc hiện đại, chúng tôi cam kết mang đến những giải pháp tối ưu, sản phẩm chất lượng, bền bỉ và hiệu quả.',
  phone: '0357138686',
  email: 'Dt.tanhoangphat@gmail.com',
  website: 'www.tanhoangphat.com.vn',
  address: 'Xưởng sản xuất: KCN..., Tỉnh/TP...',
};

export const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const values: ValueItem[] = [
  {
    title: 'Chất lượng',
    description: 'Cam kết sản phẩm đạt tiêu chuẩn kỹ thuật cao, bền bỉ và an toàn.',
    icon: 'shield',
  },
  {
    title: 'Uy tín',
    description: 'Đặt chữ tín lên hàng đầu, luôn đảm bảo tiến độ và đúng cam kết.',
    icon: 'gear',
  },
  {
    title: 'Chuyên nghiệp',
    description: 'Đội ngũ kỹ thuật giàu kinh nghiệm, máy móc hiện đại, quy trình tối ưu.',
    icon: 'users',
  },
  {
    title: 'Đồng hành',
    description: 'Lắng nghe – tư vấn – hỗ trợ khách hàng trong suốt quá trình hợp tác.',
    icon: 'handshake',
  },
];

const imageParams = '?auto=compress&cs=tinysrgb&w=1600';

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'gia-cong-co-khi',
    title: 'Gia công cơ khí',
    shortTitle: 'Cơ khí chính xác',
    summary: 'Cắt, chấn, hàn, tiện, phay và bào theo yêu cầu kỹ thuật.',
    bullets: ['Gia công chi tiết theo bản vẽ', 'Kiểm soát kích thước và hoàn thiện', 'Tư vấn vật liệu phù hợp'],
    imageUrl: `https://images.pexels.com/photos/7254419/pexels-photo-7254419.jpeg${imageParams}`,
    imageAlt: 'Máy laser gia công kim loại trong xưởng, ảnh của Opt Lasers from Poland trên Pexels',
  },
  {
    slug: 'san-xuat-theo-yeu-cau',
    title: 'Sản xuất theo yêu cầu',
    shortTitle: 'Theo yêu cầu',
    summary: 'Gia công theo bản vẽ, đáp ứng đa dạng nhu cầu của từng công trình.',
    bullets: ['Tiếp nhận bản vẽ và yêu cầu', 'Sản xuất linh hoạt theo lô', 'Bàn giao đúng tiến độ'],
    imageUrl: `https://images.pexels.com/photos/5532845/pexels-photo-5532845.jpeg${imageParams}`,
    imageAlt: 'Không gian sản xuất công nghiệp với thiết bị inox, ảnh của cottonbro studio trên Pexels',
  },
  {
    slug: 'thi-cong-lap-dat',
    title: 'Thi công – lắp đặt',
    shortTitle: 'Thi công lắp đặt',
    summary: 'Hệ thống băng tải, kệ, giá, kết cấu thép và các hạng mục cơ khí.',
    bullets: ['Khảo sát hiện trạng', 'Thi công đồng bộ tại công trình', 'Nghiệm thu và bàn giao'],
    imageUrl: `https://images.pexels.com/photos/33095875/pexels-photo-33095875.jpeg${imageParams}`,
    imageAlt: 'Nhà xưởng công nghiệp hiện đại giữa không gian xanh, ảnh của Andy Lee trên Pexels',
  },
  {
    slug: 'san-pham-inox',
    title: 'Sản phẩm inox',
    shortTitle: 'Inox công nghiệp',
    summary: 'Tủ, bàn, kệ, xe đẩy inox và thiết bị công nghiệp bền đẹp.',
    bullets: ['Thiết kế phù hợp không gian', 'Bề mặt dễ vệ sinh', 'Ưu tiên độ bền sử dụng'],
    imageUrl: `https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg${imageParams}`,
    imageAlt: 'Xưởng sản xuất thiết bị inox sạch sẽ, ảnh của Daniel Dan trên Pexels',
  },
  {
    slug: 'vat-tu-co-khi',
    title: 'Cung cấp vật tư cơ khí',
    shortTitle: 'Vật tư cơ khí',
    summary: 'Vật tư cơ khí, phụ kiện và chi tiết phục vụ sản xuất chất lượng cao.',
    bullets: ['Lựa chọn chủng loại phù hợp', 'Nguồn vật tư rõ ràng', 'Hỗ trợ theo nhu cầu thực tế'],
    imageUrl: `https://images.pexels.com/photos/12951626/pexels-photo-12951626.jpeg${imageParams}`,
    imageAlt: 'Các chi tiết cơ khí chính xác được sắp xếp trên bàn, ảnh của Alex Urezkov trên Pexels',
  },
];

export const inoxProducts: InoxProduct[] = [
  {
    slug: 'ban-inox',
    path: '/san-pham/ban-inox',
    title: 'Bàn inox',
    category: 'Sản phẩm inox',
    shortDescription: 'Bàn có bề mặt inox nhẵn, phù hợp những khu vực cần vệ sinh thường xuyên.',
    description: 'Bàn inox là lựa chọn phổ biến cho khu vực cần mặt bàn dễ lau chùi sau khi sử dụng. Thiết kế thực tế có thể được cân nhắc theo không gian, thao tác công việc và quy trình vệ sinh; thông số cụ thể cần được xác nhận theo yêu cầu từng đơn hàng.',
    highlights: [
      'Bề mặt inox không xốp, thuận tiện lau chùi theo quy trình phù hợp.',
      'Kiểu dáng, kết cấu và kích thước cần chọn theo mục đích sử dụng thực tế.',
      'Mức độ phù hợp với môi trường phụ thuộc vào chủng loại inox, gia công và cách bảo quản.',
    ],
    useCases: ['Bếp ăn và căn tin', 'Khu sơ chế, chế biến thực phẩm', 'Không gian dịch vụ cần lau chùi thường xuyên'],
    imageUrl: `https://images.unsplash.com/photo-1755604708691-cd9b930a56b9?auto=format&fit=crop&w=1600&q=85`,
    imageAlt: 'Bàn inox trong không gian ăn uống, ảnh của Johnny Ho trên Unsplash',
    imageCredit: 'Ảnh tham khảo: Johnny Ho / Unsplash',
    popular: true,
    showMaterialReferences: true,
  },
  {
    slug: 'ghe-inox',
    path: '/san-pham/ghe-inox',
    title: 'Ghế inox',
    category: 'Sản phẩm inox',
    shortDescription: 'Ghế khung inox gọn nhẹ, dễ lau chùi và phù hợp nhiều không gian sử dụng.',
    description: 'Ghế inox có thể được lựa chọn cho khu vực cần bề mặt dễ làm sạch và sử dụng thường xuyên. Hình dáng, cấu tạo mặt ngồi và kết cấu cụ thể tùy theo phương án sản phẩm; vui lòng trao đổi để xác định cấu hình phù hợp với không gian và nhu cầu.',
    highlights: [
      'Bề mặt inox không xốp, có thể lau chùi và khử trùng theo hướng dẫn phù hợp.',
      'Thiết kế nên ưu tiên các vị trí dễ tiếp cận khi vệ sinh.',
      'Cấu hình vật liệu và kết cấu cần xác nhận theo mẫu và yêu cầu thực tế.',
    ],
    useCases: ['Căn tin và khu vực ăn uống', 'Khu vực chờ, sảnh và không gian dịch vụ', 'Không gian cần vệ sinh định kỳ'],
    imageUrl: `https://images.unsplash.com/photo-1701948866896-6bef1cdc958e?auto=format&fit=crop&w=1600&q=85`,
    imageAlt: 'Ghế khung kim loại sáng màu, ảnh của ZENG YILI trên Unsplash',
    imageCredit: 'Ảnh tham khảo: ZENG YILI / Unsplash',
    popular: true,
    showMaterialReferences: true,
  },
];

export const materialReferences: MaterialReference[] = [
  {
    title: 'World Stainless — Stainless Steel in Hygienic Applications',
    url: 'https://worldstainless.org/wp-content/uploads/2025/02/Stainless_Steel_in_Hygienic_Applications_English.pdf',
  },
  {
    title: 'CDC — Best Practices for Environmental Cleaning',
    url: 'https://www.cdc.gov/healthcare-associated-infections/media/pdfs/environmental-cleaning-rls-508.pdf',
  },
  {
    title: 'Texas DSHS — Clean-up of Bodily Fluids',
    url: 'https://www.dshs.texas.gov/sites/default/files/foodestablishments/pdf/GuidanceDocs/Clean-up-of-Bodily-Fluids.pdf',
  },
];

