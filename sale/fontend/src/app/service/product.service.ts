import {Subject} from "rxjs/Subject";
import {Product} from "../model/product.model";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductService {
  private list: Product[] = [];
  subjectList = new Subject<Product[]>();
  subjectItem = new Subject<Product>();
  subject =  new Subject();

  private publishProduct = new Subject<Product>();
  productListener = this.publishProduct.asObservable();

  publicProduct(product: Product) {
    this.publishProduct.next(product);
  }

  setProducts(list: Product[]) {
    this.list = list;
  }

  setProduct(index: number, product: Product) {
    this.list[index] = product;
  }

  getProduct(index: number) {
    return this.list[index];
  }

  getProductById(id: number): Product{
    for (let item of this.list) {
        if (item.id == id){
          return item;
        }
    }
    return null;
  }

  getMoney(product: Product):number{
    return product.price - product.price*product.discount;
  }
}
