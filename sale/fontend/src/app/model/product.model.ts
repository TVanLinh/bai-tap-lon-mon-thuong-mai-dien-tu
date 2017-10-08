import {Catalog} from "./catalog.model";
export class Product {
  id: number;
  name: string;
  imagePath: string;
  discount: number;
  price: number;
  description: string;
  amount: number;
  catalog: Catalog;

}
