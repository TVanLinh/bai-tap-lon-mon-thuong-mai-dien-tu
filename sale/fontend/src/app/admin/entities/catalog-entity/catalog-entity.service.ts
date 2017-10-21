import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {TaskService} from "../../../service/task.service";
import {CatalogEntity} from "./catalog-entity.model";
import {HOST_NAME} from "../../../config";
import * as Collection from "typescript-collections";
@Injectable()
export class CatalogEntityService {
  constructor(private tastService: TaskService) {

  }

  public  createCatalog(body: CatalogEntity) {
    return this.tastService.postTask(HOST_NAME + "/catalog/create", body);
  }

  public  updateCatalog(body: CatalogEntity) {
    return this.tastService.putTask(HOST_NAME + "/catalog/update", body);
  }


  public  findAll() {
    return this.tastService.getTask(HOST_NAME + "/catalog/catalogs");
  }


  public  findBy(query) {
    return this.tastService.getTask(HOST_NAME + "/catalog/search?query=" + query);
  }


}
