import type { CompanyProfile, NavItem, Project, ServiceArea, ValueItem } from '../types/site';

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
  { label: 'Lĩnh vực hoạt động', href: '/linh-vuc-hoat-dong' },
  { label: 'Dự án', href: '/du-an' },
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
    bullets: ['Lựa chọn chủng loại phù hợp', 'Nguồn vật tư rõ ràng', 'Hỗ trợ theo nhu cầu dự án'],
    imageUrl: `https://images.pexels.com/photos/12951626/pexels-photo-12951626.jpeg${imageParams}`,
    imageAlt: 'Các chi tiết cơ khí chính xác được sắp xếp trên bàn, ảnh của Alex Urezkov trên Pexels',
  },
];

export const projects: Project[] = [
  {
    slug: 'he-thong-inox-theo-yeu-cau',
    title: 'Hệ thống inox theo yêu cầu',
    category: 'Sản xuất theo yêu cầu',
    summary: 'Từ bản vẽ đến sản phẩm hoàn thiện, tối ưu cho không gian sản xuất và vệ sinh công nghiệp.',
    outcome: 'Tập trung vào độ bền, tính đồng bộ và khả năng vận hành lâu dài.',
    imageUrl: `https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg${imageParams}`,
    imageAlt: 'Thiết bị inox trong xưởng sản xuất, ảnh của Daniel Dan trên Pexels',
  },
  {
    slug: 'gia-cong-chi-tiet-co-khi',
    title: 'Gia công chi tiết cơ khí',
    category: 'Gia công cơ khí',
    summary: 'Gia công các chi tiết kim loại với quy trình kiểm soát rõ ràng theo yêu cầu kỹ thuật.',
    outcome: 'Bề mặt hoàn thiện tốt, kích thước ổn định và sẵn sàng lắp ráp.',
    imageUrl: `https://images.pexels.com/photos/7254419/pexels-photo-7254419.jpeg${imageParams}`,
    imageAlt: 'Tia lửa trong quá trình cắt kim loại bằng laser, ảnh của Opt Lasers from Poland trên Pexels',
  },
  {
    slug: 'khong-gian-san-xuat-cong-nghiep',
    title: 'Thi công không gian sản xuất',
    category: 'Thi công – lắp đặt',
    summary: 'Kết hợp hạng mục cơ khí, kệ và hệ thống phụ trợ để tạo nên không gian làm việc hiệu quả.',
    outcome: 'Thiết kế linh hoạt, thi công gọn gàng và bám sát điều kiện thực tế.',
    imageUrl: `https://images.pexels.com/photos/5532845/pexels-photo-5532845.jpeg${imageParams}`,
    imageAlt: 'Dây chuyền và thiết bị trong nhà xưởng, ảnh của cottonbro studio trên Pexels',
  },
  {
    slug: 'vat-tu-cho-day-chuyen',
    title: 'Vật tư cho dây chuyền',
    category: 'Sản phẩm inox',
    summary: 'Cung cấp các chi tiết và phụ kiện cơ khí hỗ trợ dây chuyền vận hành ổn định.',
    outcome: 'Đồng bộ vật tư, tiết kiệm thời gian phối hợp và bảo trì.',
    imageUrl: `https://images.pexels.com/photos/12951626/pexels-photo-12951626.jpeg${imageParams}`,
    imageAlt: 'Các chi tiết cơ khí chính xác trên bàn làm việc, ảnh của Alex Urezkov trên Pexels',
  },
];
