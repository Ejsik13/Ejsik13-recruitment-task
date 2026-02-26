export type Order = {
  orderId: string;
  timestamp: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  category: string;
  subcategory: string;
  product: string;
  quantity: number;
  unitPrice: number;
  paymentMethod: string;
  customerType: "new" | "returning";
  device: "mobile" | "desktop" | "tablet";
  deliveryDays: number;
};

export type DataFile = {
  meta: {
    currency: string;
    generatedAt: string;
    source: string;
  };
  orders: Order[];
};
