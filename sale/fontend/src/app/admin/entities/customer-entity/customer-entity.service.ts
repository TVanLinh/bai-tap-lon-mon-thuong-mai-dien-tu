import {TaskService} from "../../../service/task.service";
import {Injectable} from "@angular/core";
import {HOST_NAME} from "../../../config";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {LoginService} from "../../../login/login.service";
import {CustomerEntity} from "./customer-entity.model";
@Injectable()
export class CustomerEntityService {
  public url = HOST_NAME + '/admin/customer';

  private access_token: string;

  constructor(private taskService: TaskService, private  loginService: LoginService) {
    this.access_token = this.loginService.getToken();
    this.access_token = this.loginService.getToken();
  }

  getAll(): Observable<CustomerEntity[]> {
    return this.taskService.getTask(this.url + "?access_token=" + this.access_token);
  }

  findBy(query: String): Observable<CustomerEntity[]> {
    return this.taskService.getTask(this.url + "/find?query=" + query + "&access_token=" + this.access_token);
  }


  deleteUser(id: number,): Observable<any> {
    return this.taskService.deleteTask(this.url + "/" + id + "?access_token=" + this.access_token);
  }


}
