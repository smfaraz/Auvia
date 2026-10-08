declare const __AUVIA_REVIEW__: boolean;

export const REVIEW_MODE = __AUVIA_REVIEW__;

export function preventReviewSubmission(event: { preventDefault(): void; stopPropagation(): void }) {
  if (!REVIEW_MODE) return;
  event.preventDefault();
  event.stopPropagation();
  window.alert('Review preview only. Nothing was sent or saved. Forms, subscriptions and live chat are disabled here.');
}
