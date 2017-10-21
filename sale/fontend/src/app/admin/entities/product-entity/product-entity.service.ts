import {Injectable} from "@angular/core";
import {TaskService} from "../../../service/task.service";
import {HOST_NAME} from "../../../config";
import {ProductEntity} from "./product-entity.model.component";
import {Product} from "../../../model/product.model";

@Injectable()
export class ProductEntityService {
  constructor(private tastService: TaskService) {

  }

  public  createProduct(body: ProductEntity) {
    return this.tastService.postTask(HOST_NAME + "/admin/product/create", body);
  }

  public  updateProduct(body: ProductEntity) {
    return this.tastService.putTask(HOST_NAME + "/admin/product/update", body);
  }


  public  findAll() {
    return this.tastService.getTask(HOST_NAME + "/admin/product");
  }

  public  findBy(query) {
    return this.tastService.getTask(HOST_NAME + "/admin/product/search?param=" + query);
  }


  static getPrice(product: Product) {
    return product.price - ((product.price * product.discount) / 100)
  }
}
