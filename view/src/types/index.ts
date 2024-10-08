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
  cartitemid: number;
};

export type Order = {
  id: number;
  total: number;
  status: string;
  createdat: string;
  modifiedat: string;
  items: CartItem[];
};
