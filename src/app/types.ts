export interface Product {
  _id: string;
  name: string;
  description: string;
  productCategory: string;
  price: number;
  imageUrl: string;
}

export interface Category {
  _id: string;
  name: string;
}
