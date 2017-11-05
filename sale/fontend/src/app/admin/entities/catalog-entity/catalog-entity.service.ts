import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {TaskService} from "../../../service/task.service";
import {CatalogEntity} from "./catalog-entity.model";
import {HOST_NAME} from "../../../config";
import * as Collection from "typescript-collections";
import {LoginService} from "../../../login/login.service";
@Injectable()
export class CatalogEntityService {
  private access_token: string;
  constructor(private tastService: TaskService,private loginService: LoginService) {
    this.access_token = loginService.getToken();
  }

  public  createCatalog(body: CatalogEntity) {
    return this.tastService.postTask(HOST_NAME + "/catalog/create?access_token="+this.access_token, body);
  }

  public  updateCatalog(body: CatalogEntity) {
    return this.tastService.putTask(HOST_NAME + "/catalog/update?access_token="+this.access_token, body);
  }


  public  findAll() {
    return this.tastService.getTask(HOST_NAME + "/catalog/catalogs?access_token="+this.access_token);
  }


  public  findBy(query) {
    return this.tastService.getTask(HOST_NAME + "/catalog/search?query=" + query+"&access_token="+this.access_token);
  }


}
