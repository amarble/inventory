import { Part } from './part';

export class Truck {
  _id?: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  parts: Part[];
}
