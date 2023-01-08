export interface RidesTypes {
  rides: {
    id: string;
    name: string;
    description: string;
    image_url: string[];
    price: number;
  }[];
  numOfpages: number;
  page: number;
}
export interface IRidesTypes {
  id: string;
  name: string;
  description: string;
  image_url: string[];
  price: number;
}
