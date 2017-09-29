import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class TaskService {
  constructor(private  http: Http) {
  }

  public getTask(url: string) {
    return this.http.get(url).map((data: Response) => {
      return data.json();
    });
  }

  public postTask(url: string, body?: any) {
    return this.http.post(url, body);
  }

  public deleteTask(url: string, body?: any) {
    return this.http.delete(url, body);
  }

  public putTask(url: string, body?: any) {
    return this.http.put(url, body);
  }
}