import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentVi: LandingContent = {
  locale: 'vi',
  localeLabel: 'Tiếng Việt',
  metadata: {
    title: 'Dash Booking cho tiệm nail và beauty',
    description: 'Google Booking, pricing trả theo booking, hệ thống quản lý tiệm và các add-on cho salon.',
  },
  header: {
    nav: [
      { label: 'Add-ons', href: '#optional-features' },
      { label: 'Bảng giá', href: '#pricing' },
    ],
    cta: 'Đăng ký miễn phí',
    homeAriaLabel: 'Về trang chủ Dash Booking',
    navAriaLabel: 'Các phần trên trang',
    localeSwitcherAriaLabel: 'Đổi ngôn ngữ',
    partnerPillLabel: 'List đối tác trực tiếp của Google',
  },
  hero: {
    eyebrow: 'Google Booking',
    partnerPills: ['Google Authorized Partner', 'Đối tác trực tiếp với Google'],
    headline: 'Không có khách, không trả phí',
    supportLine: '',
    subtitle: 'No Contract - No Setup Fee',
    bullets: ['Google bookings 24/7', 'Khách thật', 'Group Booking', 'Free hệ thống quản lí tiệm'],
    bulletsAriaLabel: 'Điểm chính của Dash Booking',
    primaryCta: '',
    secondaryCta: '',
    lowRiskNote: '',
    graphicLabel: 'Hình điện thoại hiển thị trang salon Dash Booking và tính năng đặt lịch',
    priceBadge: '$0/tháng để bắt đầu',
  },
  trust: {
    eyebrow: 'Google Authorized Partner',
    title: 'Dash Booking - Đối tác trực tiếp của Google',
    logoAlt: 'Google logo',
    partnerCtaLabel: 'Danh sách đối tác đặt hẹn của Google',
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
    eyebrow: '',
    title: 'Tham khảo một số thành phố đang sử dụng',
    cityCta: 'Xem tiệm ở {city}',
    moreLabel: 'Xem thêm thành phố',
    lessLabel: 'Thu gọn thành phố',
  },
  ai: {
    eyebrow: '',
    title: 'Tích hợp AI Receptionist',
    description: 'Chuyên nghe phone book hẹn 24/7',
    supportLine: 'Song ngữ Anh Pháp',
    price: '',
    priceLines: [
      '$300 setup one-time',
      '$30/tháng AI Access',
      '$20/tháng AI Phone Number',
      '$0.30/phút Call Time',
    ],
    demoTitle: 'Nghe thử',
    demoIds: [
      'check-current-appoinment',
      'confirm-address',
      'late-appointment',
      'new-appoinment',
      'rescheduling-appoinment',
    ],
  },
  pricing: {
    eyebrow: 'Bảng giá',
    title: 'Pay As You Go',
    supportLine: '',
    tiers: [
      { range: '0 completed online appointments', selectorLabel: '0', price: '$0 / month' },
      { range: '1 to 49 completed online appointments', selectorLabel: '<50', price: '$29 / month' },
      { range: '50 to 149 completed online appointments', selectorLabel: '<150', price: '$69 / month' },
      { range: '150 to 499 completed online appointments', selectorLabel: '<500', price: '$99 / month' },
      { range: '500 to 999 completed online appointments', selectorLabel: '<1000', price: '$149 / month' },
      { range: '1000+ completed online appointments', selectorLabel: '1000+', price: '$199 / month' },
    ],
    selectorAriaLabel: 'Các mức giá theo số booking',
    smsNote: 'Optional ¢5 per SMS',
    processingFeeNote: '(3%) Processing fee will apply on credit card',
    ctaLabel: '',
  },
  includes: {
    eyebrow: '',
    title: 'Dash Booking Platform',
    cardsAriaLabel: 'Các phần chính của Dash Booking Platform',
    cards: [
      {
        title: 'Appointment Calendar',
        description: 'Quản lý lịch theo ngày, theo thợ, theo nguồn booking.',
      },
      {
        title: 'Client Management',
        description: 'Lưu thông tin khách, lịch sử đặt hẹn và ghi chú.',
      },
      {
        title: 'Staff & Service Setup',
        description: 'Quản lý thợ, dịch vụ, giá và thời gian làm.',
      },
      {
        title: 'Booking Page / QR Code',
        description: 'Khách đặt lịch qua link booking, website hoặc QR code.',
      },
      {
        title: 'Group Booking',
        description: 'Nhận nhiều khách trong cùng một booking.',
      },
      {
        title: 'Reporting & Analytics',
        description: 'Theo dõi booking, doanh thu và hiệu suất tiệm.',
      },
    ],
  },
  addOns: {
    eyebrow: '',
    title: 'Optional Add-on Features',
    supportLine: '',
    terminalTitle: 'Tích hợp Clover / Poynt',
    terminalIntro: '',
    terminalBadge: '',
    terminalRates: ['Debit: $0.04 / giao dịch', 'Credit: Cost + 0.25%', 'Thuê máy: $30 / tháng'],
    terminalDisclaimer: '',
    terminalListAriaLabel: 'Các máy thanh toán được hỗ trợ',
    optionalListAriaLabel: 'Các add-on tùy chọn',
    optionalItems: [
      {
        slug: 'website',
        name: 'SEO Website',
        price: '',
        description: '',
        ctaLabel: 'Template',
        ctaHref: 'https://websitetemplate.ca/',
      },
      {
        slug: 'google-business-profile',
        name: 'Manage Google Business Profile',
        price: '',
        description: 'Quản lý tiệm / trả lời google review',
      },
      {
        slug: 'online-deposits-gift-cards',
        name: 'Online Deposits & Gift Cards',
        price: '',
        description: '',
      },
      {
        slug: 'sell-products',
        name: 'Bán products',
        price: '',
        description: '',
      },
      {
        slug: 'ai-social-media',
        name: 'AI Social Media',
        price: '',
        description: 'Coming soon',
      },
    ],
  },
  faq: {
    eyebrow: '',
    title: 'Q&A',
    items: [
      {
        question: 'Cancel / no-show có tính phí không?',
        answer: 'Không.',
      },
      {
        question: 'Lấy danh sách khách hàng được không?',
        answer: 'Có. Download Excel trực tiếp từ hệ thống.',
      },
      {
        question: 'Import khách hàng được không?',
        answer: 'Có. Dash Booking hỗ trợ lọc data và import.',
      },
      {
        question: 'Có hợp đồng không?',
        answer: 'Không. No Contract - No Setup Fee.',
      },
      {
        question: 'Tiệm bao nhiêu thợ dùng được?',
        answer: 'Đa dạng tiệm từ 1 đến 50 thợ hoặc hơn.',
      },
      {
        question: 'Thanh toán hằng tháng bằng cách nào?',
        answer: 'Credit Card, Void Cheque hoặc PayPal.',
      },
      {
        question: 'Thiết bị nào dùng được?',
        answer: 'Dash Booking tích hợp với mọi thiết bị.',
      },
    ],
  },
  finalCta: {
    title: 'Muốn thử Dash Booking cho tiệm của bạn?',
    primaryCta: 'Đăng ký miễn phí',
    secondaryCta: 'Nghe AI Receptionist',
  },
  footer: {
    summary: 'All-in-one platform for beauty salon',
    languageLabel: 'Ngôn ngữ',
    rights: '© Dash Booking. All rights reserved.',
  },
};
