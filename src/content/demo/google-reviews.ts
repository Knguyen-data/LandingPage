import type { GoogleReviewsFilterId } from '@/content/types';

export type GoogleReviewsDemoReviewId = 'emma' | 'olivia' | 'sophie';

export interface GoogleReviewsDemoReview {
  readonly id: GoogleReviewsDemoReviewId;
  readonly customerName: string;
  readonly initial: string;
  readonly stars: 1 | 2 | 3 | 4 | 5;
  readonly timeAgo: string;
  readonly review: string;
  readonly reply: string;
  readonly tag: string;
}

export const GOOGLE_REVIEWS_THINKING_MS = 900;

export const googleReviewsLetterColors = [
  '#4285F4',
  '#EA4335',
  '#FBBC05',
  '#4285F4',
  '#34A853',
  '#EA4335',
] as const;

export const googleReviewsDemoReviews: readonly GoogleReviewsDemoReview[] = [
  {
    id: 'emma',
    customerName: 'Emma Wilson',
    initial: 'E',
    stars: 2,
    timeAgo: '2 days ago',
    review: 'I booked for 3 PM and still waited about 20 minutes. The service was fine once I sat down, but the wait made the visit feel rushed.',
    reply:
      'Hi Emma,\n\nThank you for telling us about your visit. We are sorry you waited after a 3 PM booking. We will check the schedule so your next appointment starts on time.\n\nBest regards,\nYour Lovely Salon',
    tag: '2-star review',
  },
  {
    id: 'olivia',
    customerName: 'Olivia Carter',
    initial: 'O',
    stars: 5,
    timeAgo: '5 days ago',
    review: 'My gel nails came out beautifully, and the technician took time to get the shape just right. The salon felt calm from the moment I walked in.',
    reply:
      'Hi Olivia,\n\nThank you so much. We are glad the gel set turned out the way you wanted and that you felt welcome with us. It is always a pleasure looking after you.\n\nBest regards,\nYour Lovely Salon',
    tag: '5-star review',
  },
  {
    id: 'sophie',
    customerName: 'Sophie Bennett',
    initial: 'S',
    stars: 4,
    timeAgo: '1 week ago',
    review: 'Lovely salon and a professional team. The space was clean and my manicure lasted well. A little more time on the finishing details would have made it perfect.',
    reply:
      'Hi Sophie,\n\nThank you for coming in. We are glad the manicure lasted and that the team felt professional. We will keep that extra finishing time in mind for your next visit.\n\nBest regards,\nYour Lovely Salon',
    tag: '4-star review',
  },
];

export function getGoogleReviewStarStates(stars: number): readonly boolean[] {
  return [1, 2, 3, 4, 5].map((value) => value <= stars);
}

export function reviewMatchesGoogleReviewsFilter(
  review: GoogleReviewsDemoReview,
  filterId: GoogleReviewsFilterId,
): boolean {
  if (filterId === 'all') {
    return true;
  }

  if (filterId === 'five') {
    return review.stars === 5;
  }

  if (filterId === 'three') {
    return review.stars === 3;
  }

  return review.stars === 1;
}

export function getVisibleGoogleReviews(
  reviews: readonly GoogleReviewsDemoReview[],
  filterId: GoogleReviewsFilterId,
): readonly GoogleReviewsDemoReview[] {
  return reviews.filter((review) => reviewMatchesGoogleReviewsFilter(review, filterId));
}
