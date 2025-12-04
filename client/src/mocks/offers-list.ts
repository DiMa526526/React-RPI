import { OffersList } from "../types/offer";

export const offersList: OffersList[] = [
  {
    id: "bbb06a0e-3f92-446d-9a68-cb64b5d38e2b",
    title: "Cozy Canal View Apartment",
    type: "apartment",
    price: 180,
    previewImage: "/img/apartment-1.jpg",
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
    isFavorite: false,
    isPremium: false,
    rating: 4.6,
  },
  {
    id: "ccc16b1f-4g03-557e-0b79-dc75b6d49f3c",
    title: "Modern Studio near Museumplein",
    type: "room",
    price: 140,
    previewImage: "/img/room.jpg",
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
    isFavorite: true,
    isPremium: false,
    rating: 4.4,
  },
  {
    id: "ddd26c2g-5h14-668f-1c80-ed86c7e50g4d",
    title: "Luxury Apartment in Eastern Docklands",
    type: "apartment",
    price: 250,
    previewImage: "/img/apartment-2.jpg",
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
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
  },
  {
    id: "hhh66g6k-9l58-002j-5gb4-ih20g1i94k8h",
    title: "Historic House in Jordaan District",
    type: "house",
    price: 320,
    previewImage: "/img/house-1.jpg",
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
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
  },
];
