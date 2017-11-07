import {Injectable} from "@angular/core";
import {TaskService} from "../../service/task.service";
import {HOST_NAME} from "../../config";
import {LoginService} from "../../login/login.service";
import {StatisticModel} from "./statistic.model";
@Injectable()
export class StatisticService {
  private access_token: string;

  constructor(private taskService: TaskService, private loginService: LoginService) {
    this.access_token = loginService.getToken();
  }

  statistic(time: number, type) {
    return this.taskService.getTask(HOST_NAME + "/admin/statistic/" + time + "/" + type + "?access_token=" + this.access_token);
  }

  getTotalAndPrice(data: StatisticModel[]): { total: number, price: number } {
    let total = 0;
    let price = 0;

    for (let item of data) {
      total += item.amount;
      price += item.totalMoney;
    }

    return {total: total, price: price};
  }
}
