import {CatalogEntity} from "../catalog-entity/catalog-entity.model";
export class ProductEntity {
  id: number;
  name: string;
  imagePath: string;
  discount: number;
  price: number;
  description: string;
  amount: number;
  catalog: CatalogEntity;
}
