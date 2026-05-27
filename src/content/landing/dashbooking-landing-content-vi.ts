import type { LandingContent } from '@/content/landing/dashbooking-landing-content-types';
import { googlePartnersUrl } from '@/content/landing/dashbooking-landing-shared-data';

export const dashbookingLandingContentVi: LandingContent = {
  locale: 'vi',
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
    headline: 'Không có khách, không trả phí',
    supportLine: '',
    subtitle: 'No Contract - No Setup Fee',
    bullets: ['Google bookings 24/7', 'Khách thật', 'Group Booking', 'Free hệ thống quản lí tiệm'],
    bulletsAriaLabel: 'Điểm chính của Dash Booking',
    primaryCta: '',
    secondaryCta: '',
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
  reviewResponseDemo: {
    eyebrow: 'Google Reviews',
    title: 'AI trả lời Google Review',
    supportLine: 'Đề xuất câu trả lời riêng cho từng khách.',
    reviewsAriaLabel: 'Các Google review mẫu',
    generateLabel: 'Tạo phản hồi AI',
    responseLabel: 'Phản hồi AI',
    emptyResponse: 'Chọn review rồi bấm tạo phản hồi.',
    reviews: [
      {
        customerName: 'Maya T.',
        ratingLabel: '★☆☆☆☆ 1.0',
        review: 'I booked for 3 PM but still had to wait a long time. Nobody explained what was happening.',
        response: 'Hi Maya, thank you for sharing this. We are sorry for the long wait and the lack of communication. We are reviewing our booking flow so this is handled better next time. We hope we can welcome you back and give you a smoother visit.',
      },
      {
        customerName: 'Sophie L.',
        ratingLabel: '★★★☆☆ 3.0',
        review: 'The nails looked good, but the appointment felt rushed near the end.',
        response: 'Hi Sophie, thank you for the honest feedback. We are happy you liked the result, and we are sorry the ending felt rushed. We will use this to improve how we pace each appointment. We would love to see you again.',
      },
      {
        customerName: 'Amanda R.',
        ratingLabel: '★★★★★ 5.0',
        review: 'Beautiful work and very friendly staff. Booking online was easy too.',
        response: 'Hi Amanda, thank you so much. We are glad you loved the service and that online booking was easy. We appreciate your support and look forward to seeing you again soon.',
      },
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
  footer: {
    summary: 'All-in-one platform for beauty salon',
    rights: '© Dash Booking. All rights reserved.',
  },
};
