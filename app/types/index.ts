export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  inStock: boolean;
}

export interface IVehicle {
  vehicleId: string;
  make: string;
  model: string;
  trimLevel: string;
  features?: IFeature[];
}

export interface IFeature {
  featureId: string;
  featureType: string;
  featureName: string;
}
