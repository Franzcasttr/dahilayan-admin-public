export interface VenueTypes {
  venues: {
    id: string;
    name: string;
    image_url: string[];
    services: string[];
    description: string;
    url: string;
  }[];
  numOfpages: number;
  page: number;
}

export interface IVenueTypes {
  id: string;
  name: string;
  services: string[];
  description: string;
  image_url: string[];
}
