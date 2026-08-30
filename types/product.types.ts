export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  category: string;
  image: string;
  unit: string;
  description?: string;
  isOrganic?: boolean;
  freeDelivery?: boolean;
  isFeatured: boolean;
  inStock?: boolean; // Add this property
}

export interface ProductCardProps {
  product: Product;
  index?: number;
}

export interface ProductsResponse {
  products: Product[];
  total?: number;
  page?: number;
  limit?: number;
}