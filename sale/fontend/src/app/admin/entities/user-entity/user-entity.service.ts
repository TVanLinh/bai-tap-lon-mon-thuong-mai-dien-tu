import {TaskService} from "../../../service/task.service";
import {Injectable} from "@angular/core";
import {UserEntityModel} from "./user.model";
import {HOST_NAME} from "../../../config";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
@Injectable()
export class UserEntityService {
  public url = HOST_NAME + '/users';

  constructor(private  taskService: TaskService, private  http: Http) {
  }

  getAll(): Observable<UserEntityModel[]> {
    return this.taskService.getTask(this.url);
  }

  createUser(body: UserEntityModel): Observable<any> {
    return this.taskService.postTask(this.url, body);
  }


  updateUser(body: UserEntityModel): Observable<any> {
    return this.taskService.putTask(this.url, body);
  }

  deleteUser(id: number, ): Observable<any> {
    return this.taskService.deleteTask(this.url + "/" + id);
  }

  find(query) {
    return this.taskService.getTask(HOST_NAME+"/users/search?query="+query);
  }


}
