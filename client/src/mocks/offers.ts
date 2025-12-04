import { FullOffer } from "../types/offer";

const offers: FullOffer[] = [
  {
    id: "bbb06a0e-3f92-446d-9a68-cb64b5d38e2b",
    title: "Cozy Canal View Apartment",
    description:
      "Charming apartment overlooking Amsterdam's famous canals. Perfect location for exploring the city.",
    type: "apartment",
    price: 180,
    images: ["/img/apartment-1.jpg", "/img/room.jpg", "/img/studio-01.jpg"],
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    goods: ["Wi-Fi", "Heating", "Kitchen", "Washer", "Towels"],
    host: {
      isPro: true,
      name: "Emma",
      avatarUrl: "/img/avatar-angelina.jpg",
    },
    isPremium: false,
    isFavorite: false,
    rating: 4.6,
    bedrooms: 1,
    maxAdults: 2,
  },
  {
    id: "ccc16b1f-4g03-557e-0b79-dc75b6d49f3c",
    title: "Modern Studio near Museumplein",
    description:
      "Bright and modern studio just steps from Rijksmuseum and Van Gogh Museum.",
    type: "room",
    price: 140,
    images: ["/img/room.jpg", "/img/studio-01.jpg", "/img/H3.jpg"],
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    goods: ["Wi-Fi", "Heating", "TV", "Coffee machine"],
    host: {
      isPro: false,
      name: "Lars",
      avatarUrl: "/img/avatar-max.jpg",
    },
    isPremium: false,
    isFavorite: true,
    rating: 4.4,
    bedrooms: 1,
    maxAdults: 2,
  },
  {
    id: "ddd26c2g-5h14-668f-1c80-ed86c7e50g4d",
    title: "Luxury Apartment in Eastern Docklands",
    description:
      "Stylish waterfront apartment with panoramic views and high-end amenities.",
    type: "apartment",
    price: 250,
    images: ["/img/apartment-2.jpg", "/img/H2.jpg", "/img/loft-1.jpg"],
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    goods: [
      "Wi-Fi",
      "Air conditioning",
      "Kitchen",
      "Washer",
      "Dishwasher",
      "Parking",
    ],
    host: {
      isPro: true,
      name: "Sophie",
      avatarUrl: "/img/avatar-sophie.jpg",
    },
    isPremium: true,
    isFavorite: false,
    rating: 4.9,
    bedrooms: 2,
    maxAdults: 4,
  },
  {
    id: "eee36d3h-6i25-779g-2d91-fe97d8f61h5e",
    title: "Historic House in Jordaan District",
    description:
      "Authentic 17th-century house in the heart of Amsterdam's picturesque Jordaan neighborhood.",
    type: "house",
    price: 320,
    images: ["/img/house-1.jpg", "/img/H4.jpg", "/img/cottage-1.jpg"],
    city: {
      name: "Amsterdam",
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    goods: ["Wi-Fi", "Heating", "Garden", "Fireplace", "Kitchen", "Washer"],
    host: {
      isPro: true,
      name: "Thomas",
      avatarUrl: "/img/avatar-thomas.jpg",
    },
    isPremium: true,
    isFavorite: true,
    rating: 4.8,
    bedrooms: 3,
    maxAdults: 6,
  },
];

export { offers };
