export class Item {

  _id?: string;
  name: string;
  description: string;
  purchase: {
    price: number;
    date: Date;
    vendor: string;
    notes: string;
  };
  shipmentIn: {
    date: Date;
    method: string;
    tracking: string;
    notes: string;
  };
  delivery: {
    date: Date;
    notes: string;
  };
  listing: {
    price: number;
    date: Date;
    vendor: string;
  };
  sale: {
    price: number;
    date: Date;
    vendorId: string;
  };
  shipmentOut: {
    date: Date;
    method: string;
    tracking: string;
    notes: string;
  };
  category: string;
  tags: string[];

}
