import {Injectable} from "@angular/core";
import {TaskService} from "../../../service/task.service";
import {HOST_NAME} from "../../../config";
import {ProductEntity} from "./product-entity.model.component";
import {Product} from "../../../model/product.model";
import {LoginService} from "../../../login/login.service";

@Injectable()
export class ProductEntityService {
  private access_token: string;
  constructor(private tastService: TaskService,private  loginService: LoginService) {
    this.access_token = this.loginService.getToken();
  }

  public  createProduct(body: ProductEntity) {
    return this.tastService.postTask(HOST_NAME + "/admin/product/create?access_token="+this.access_token, body);
  }

  public  updateProduct(body: ProductEntity) {
    return this.tastService.putTask(HOST_NAME + "/admin/product/update?access_token="+this.access_token, body);
  }


  public  findAll() {
    return this.tastService.getTask(HOST_NAME + "/admin/product?access_token="+this.access_token);
  }

  public  findBy(query) {
    return this.tastService.getTask(HOST_NAME + "/admin/product/search?param=" + query+"&access_token="+this.access_token);
  }


  static getPrice(product: Product) {
    return product.price - ((product.price * product.discount) / 100)
  }
}
