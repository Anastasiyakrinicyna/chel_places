export type Category = {
  id: string;
  name: string;
};

export type Place = {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  address: string;
  workingHours: string;
  price: string;
  rating?: number;
  phone?: string;
  website?: string;
};