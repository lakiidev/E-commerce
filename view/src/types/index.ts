export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  createdAt: string;
  modifiedAt: string;
};
export type CartItem = Product & {
  quantity: number;
};
