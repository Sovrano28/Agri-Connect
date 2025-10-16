export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'farmer' | 'landowner' | 'equipment-owner';
};

export type Review = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
};

type BaseListing = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  ownerId: string;
  reviews: Review[];
  avgRating: number;
};

export type FarmlandListing = BaseListing & {
  type: 'farmland';
  priceUnit: 'per_acre_per_year';
  size: number; // in acres
  soilType: string;
};

export type EquipmentListing = BaseListing & {
  type: 'equipment';
  priceUnit: 'per_day';
  category: string; // e.g., Tractor, Harvester
  condition: 'new' | 'used';
};

export type AnyListing = FarmlandListing | EquipmentListing;

export type Booking = {
  id: string;
  listingId: string;
  listingTitle: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
};

export type Language = 'en' | 'ha' | 'yo' | 'ig';

export type Translations = {
  [key: string]: {
    [lang in Language]?: string;
  };
};
