import {Subject} from "rxjs/Subject";
import {Product} from "../model/product.model";

export class ShareService {
  private publishProduct = new Subject<Product>();
  productListener = this.publishProduct.asObservable();

  publicProduct(product: Product) {
    this.publishProduct.next(product);
  }
}
