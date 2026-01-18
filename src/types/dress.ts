export interface DressImage {
  url: string;
}

export interface Dress {
  id: number;
  name: string;
  description: string;
  dress_type: string;

  price_without_jewelry: string;
  price_with_jewelry: string;
  security_deposit: string;

  status: 'available' | 'rented' | 'maintenance';
  available_after: string | null;

  sizes: string;
  images: DressImage[];
}
