export interface roomTypes {
  id: string;
  name: string;
  image_url: string[];
  price: number;
  bedtype: string[];
  number_of_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  description: string;

  numOfpages: number;
  page: number;
}
export interface roomDataTypes {
  id: string;
  name: string;
  image_url: string[];
  price: number;
  bedtype: string[];
  number_of_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  url?: string[];
}
