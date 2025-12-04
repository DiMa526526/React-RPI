import { Review } from "../types/review";

export const ReviewList: Review[] = [
  {
    id: "1",
    date: "April 2024",
    user: {
      name: "Max",
      avatarUrl: "/img/avatar-max.jpg",
      isPro: false,
    },
    comment:
      "A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.",
    rating: 4,
  },
  {
    id: "2",
    date: "March 2024",
    user: {
      name: "Angelina",
      avatarUrl: "/img/avatar-angelina.jpg",
      isPro: true,
    },
    comment:
      "An independent House, strategically located between Rembrandt Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.",
    rating: 5,
  },
];
