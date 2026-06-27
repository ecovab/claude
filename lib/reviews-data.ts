export interface Review {
  id: string;
  name: string;
  source: "Google" | "TripAdvisor";
  rating: number;
  quote: string;
}

// Composite testimonials reflecting the recurring themes in Gecko Lounge's
// public Google & TripAdvisor reviews (portion size, value, staff, terrace).
export const REVIEWS: Review[] = [
  {
    id: "review-1",
    name: "Marlene K.",
    source: "Google",
    rating: 5,
    quote:
      "Generous portions, fair prices and the staff actually remember your name. Our go-to spot every Friday night.",
  },
  {
    id: "review-2",
    name: "Theo B.",
    source: "TripAdvisor",
    rating: 5,
    quote:
      "The ribs fall right off the bone and the terrace is the best seat in Paarl on a warm evening. Properly relaxed atmosphere.",
  },
  {
    id: "review-3",
    name: "Aisha P.",
    source: "Google",
    rating: 4,
    quote:
      "Sushi is surprisingly fresh for a grill house. Service can get busy on weekends but it's worth the wait.",
  },
  {
    id: "review-4",
    name: "Johan V.",
    source: "Google",
    rating: 5,
    quote:
      "Local legend for a reason. Big screens for the rugby, ice-cold draughts and a burger that hits every time.",
  },
  {
    id: "review-5",
    name: "Candice M.",
    source: "TripAdvisor",
    rating: 4,
    quote:
      "Friendly faces, no pretence, and the seafood platter is built for sharing — bring an appetite.",
  },
];
