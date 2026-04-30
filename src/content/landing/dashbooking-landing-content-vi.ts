import { aiReceptionistDemos } from '@/content/ai-receptionist-demos';
import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentVi: LandingContent = {
  locale: 'vi',
  localeLabel: 'Tiếng Việt',
  metadata: {
    title: 'Dash Booking cho tiệm nail và beauty',
    description:
      'Dash Booking nhận booking từ Google, gom lịch hẹn về một chỗ, và chỉ tính phí khi hệ thống mang khách đặt hẹn về.',
  },
  header: {
    nav: [
      { label: 'AI Receptionist', href: '#ai-demo' },
      { label: 'Bảng giá', href: '#pricing' },
    ],
    cta: 'Đăng ký miễn phí',
    homeAriaLabel: 'Về trang chủ Dash Booking',
    navAriaLabel: 'Các phần trên trang',
    localeSwitcherAriaLabel: 'Đổi ngôn ngữ',
  },
  hero: {
    eyebrow: 'Trả theo booking',
    headline: 'Không có khách, không thu tiền',
    supportLine: 'Không hiệu quả, không thu phí',
    subtitle: 'No Contract - Cancel Anytime',
    bullets: ['Google Booking + link đặt lịch', 'Lịch theo thợ, theo ngày', 'AI Receptionist là add-on riêng'],
    bulletsAriaLabel: 'Điểm chính của Dash Booking',
    primaryCta: 'Đăng ký miễn phí',
    secondaryCta: 'Nghe AI Receptionist',
    lowRiskNote: 'Walk-in và lịch nhập tay không bị tính phí.',
    graphicLabel: 'Hình điện thoại hiển thị trang salon Dash Booking và tính năng đặt lịch',
    priceBadge: '$0/tháng để bắt đầu',
  },
  trust: {
    eyebrow: 'Google Partner',
    title: 'Dash Booking là đối tác trực tiếp của Google cho đặt hẹn.',
    logoAlt: 'Google logo',
    partnerCtaLabel: 'Xem tất cả đối tác đặt hẹn của Google',
    partnerCtaHref: googlePartnersUrl,
    stats: [
      { value: '160M+', label: 'lượt đặt hẹn' },
      { value: '150+', label: 'thành phố' },
      { value: '16', label: 'quốc gia' },
      { value: '7+', label: 'ngôn ngữ' },
    ],
    statsAriaLabel: 'Các số liệu của Dash Booking',
  },
  customerCities: {
    eyebrow: 'Canada',
    title: 'Xem các tiệm Dash Booking tại Canada.',
    cityCta: 'Xem tiệm ở {city}',
    moreLabel: 'Xem thêm thành phố',
    lessLabel: 'Thu gọn thành phố',
  },
  ai: {
    eyebrow: 'AI Receptionist',
    title: 'Nghe thử AI Receptionist nhận cuộc gọi.',
    cards: [
      {
        id: aiReceptionistDemos[0].id,
        title: 'Khách muốn đặt lịch mới',
        description: 'Hỏi dịch vụ, giờ trống, rồi tạo lịch.',
      },
      {
        id: aiReceptionistDemos[1].id,
        title: 'Khách muốn dời hoặc hủy lịch',
        description: 'Xác nhận thông tin rồi cập nhật lịch.',
      },
      {
        id: aiReceptionistDemos[2].id,
        title: 'Khách hỏi giờ mở cửa',
        description: 'Trả lời nhanh thay lễ tân.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Bảng giá booking',
    title: 'Không có khách, không thu tiền.',
    supportLine: 'Chỉ tính phí khi Dash Booking mang booking về.',
    tiers: [
      { range: '0 booking', selectorLabel: '0', price: '$0/tháng' },
      { range: 'Dưới 50 booking', selectorLabel: '<50', price: '$29/tháng' },
      { range: 'Dưới 150 booking', selectorLabel: '<150', price: '$69/tháng' },
      { range: 'Dưới 500 booking', selectorLabel: '<500', price: '$99/tháng' },
      { range: 'Dưới 1000 booking', selectorLabel: '<1000', price: '$149/tháng' },
      { range: '1000+ booking', selectorLabel: '1000+', price: '$199/tháng' },
    ],
    selectorAriaLabel: 'Các mức giá theo số booking',
    smsNote: 'SMS: $0.05 / tin nhắn',
    ctaLabel: 'Đăng ký miễn phí',
    chargedCard: {
      title: 'Có tính phí',
      items: ['Google Booking', 'Booking từ website / link Dash Booking', 'Booking do AI Receptionist tạo'],
    },
    notChargedCard: {
      title: 'Không tính phí',
      items: ['Walk-in', 'Lịch nhân viên nhập tay', 'Cuộc gọi nhân viên tự ghi lịch'],
    },
    aiAddOnNote:
      'AI Receptionist là add-on riêng: setup $300 một lần, AI Access $30/tháng, AI Phone Number $20/tháng, Call Time $0.30/phút.',
  },
  includes: {
    eyebrow: 'Dash Booking gồm gì',
    title: 'Các phần chính tiệm dùng mỗi ngày.',
    cardsAriaLabel: 'Các phần chính của Dash Booking',
    cards: [
      {
        title: 'Google Booking',
        description: 'Nhận khách đặt lịch ngay trên Google.',
        bullets: ['Book Online', 'Link đặt lịch', '24/7'],
      },
      {
        title: 'Lịch hẹn gọn',
        description: 'Xem lịch theo ngày, theo thợ, theo nguồn.',
        bullets: ['Theo ngày', 'Theo thợ', 'Nguồn booking'],
      },
      {
        title: 'Giữ khách đúng hẹn',
        description: 'SMS, đặt cọc, gift cards trong cùng luồng.',
        bullets: ['SMS', 'Đặt cọc', 'Gift Cards'],
      },
      {
        title: 'AI Receptionist',
        description: 'Nhận cuộc gọi khi tiệm đang bận.',
        bullets: ['Đặt lịch', 'Dời lịch', 'Hủy lịch'],
      },
    ],
  },
  addOns: {
    eyebrow: 'POS',
    title: 'Tích hợp máy tính tiền',
    terminalIntro: 'Kết nối Clover hoặc Poynt để quầy gọn hơn.',
    terminalBadge: 'Rental từ $30/tháng / máy',
    terminalRates: ['Debit: $0.04 / giao dịch', 'Credit: Cost + 0.25%'],
    terminalDisclaimer: 'Giá tùy hồ sơ merchant và thiết bị.',
    optionalTitle: 'Optional',
    terminalListAriaLabel: 'Các máy thanh toán được hỗ trợ',
    optionalListAriaLabel: 'Các add-on tùy chọn',
    optionalItems: [
      {
        name: 'SMS',
        price: '$0.05 / tin nhắn',
        description: 'Nhắc hẹn, follow-up và xin review.',
      },
      {
        name: 'Deposits & Gift Cards',
        price: '$150 / one-time setup',
        description: 'Giảm no-show và nhận tiền trước.',
      },
      {
        name: 'AI Receptionist',
        price: '$300 setup + $50/tháng + $0.30/phút',
        description: 'Nhận cuộc gọi và tạo lịch khi tiệm bận.',
      },
    ],
  },
  whyChoose: {
    eyebrow: 'Vì sao chọn Dash Booking',
    title: 'Phù hợp với cách salon chạy mỗi ngày.',
    reasonsAriaLabel: 'Các lý do chủ tiệm chọn Dash Booking',
    reasons: [
      {
        title: 'Setup gọn, vào dùng nhanh',
        description: 'Không cần đổi hết quy trình đang chạy.',
      },
      {
        title: 'Dễ biết khách đến từ đâu',
        description: 'Google, link đặt lịch và AI tách rõ trong luồng booking.',
      },
      {
        title: 'Hợp với tiệm nhiều thợ',
        description: 'Xem lịch theo thợ để chia ca nhanh hơn.',
      },
      {
        title: 'Mở thêm tiện ích khi cần',
        description: 'SMS, đặt cọc, gift cards và AI Receptionist thêm sau vẫn gọn.',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Các câu hỏi tiệm hay hỏi.',
    items: [
      {
        question: 'Nếu không có booking qua Dash Booking thì có bị tính phí không?',
        answer: 'Không.',
      },
      {
        question: 'Walk-in hoặc lịch nhập tay có bị tính không?',
        answer: 'Không.',
      },
      {
        question: 'Khách cancel no show có bị tính không?',
        answer: 'Không.',
      },
      {
        question: 'Lấy danh sách khách hàng khi cancel được không?',
        answer: 'Có, download file Excel trực tiếp từ hệ thống.',
      },
      {
        question: 'Import khách hàng ngược lại vào hệ thống được không?',
        answer: 'Có. Gửi danh sách khách hàng cho Dash Booking, hệ thống sẽ xử lý và import tự động.',
      },
      {
        question: 'Có hợp đồng không?',
        answer: 'Không. Cancel anytime.',
      },
    ],
  },
  finalCta: {
    title: 'Muốn thử Dash Booking cho tiệm của bạn?',
    primaryCta: 'Đăng ký miễn phí',
    secondaryCta: 'Nghe AI Receptionist',
  },
  footer: {
    summary: 'Google Booking, lịch hẹn và AI Receptionist trong một hệ thống gọn.',
    languageLabel: 'Ngôn ngữ',
    rights: '© Dash Booking. All rights reserved.',
  },
};
