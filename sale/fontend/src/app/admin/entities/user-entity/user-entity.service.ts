import {TaskService} from "../../../service/task.service";
import {Injectable} from "@angular/core";
import {UserEntityModel} from "./user.model";
import {HOST_NAME} from "../../../config";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {LoginService} from "../../../login/login.service";
@Injectable()
export class UserEntityService {
  public url = HOST_NAME + '/users';

  private access_token: string;

  constructor(private taskService: TaskService, private  loginService: LoginService) {
    this.access_token = this.loginService.getToken();
    this.access_token = this.loginService.getToken();
  }

  getAll(): Observable<UserEntityModel[]> {
    return this.taskService.getTask(this.url + "?access_token=" + this.access_token);
  }

  createUser(body: UserEntityModel): Observable<any> {
    return this.taskService.postTask(this.url + "?access_token=" + this.access_token, body);
  }


  updateUser(body: UserEntityModel): Observable<any> {
    return this.taskService.putTask(this.url + "?access_token=" + this.access_token, body);
  }

  deleteUser(id: number,): Observable<any> {
    return this.taskService.deleteTask(this.url + "/" + id + "?access_token=" + this.access_token);
  }

  find(query) {
    return this.taskService.getTask(HOST_NAME + "/users/search?query=" + query + "&access_token=" + this.access_token);
  }


  changePassWord(info: { passWord: string, rePassWord: string }) {
    return this.taskService.putTask(this.url + "/change-pass?access_token=" + this.access_token, info);
  }


}
