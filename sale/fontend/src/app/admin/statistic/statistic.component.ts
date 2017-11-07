import {Component, OnInit} from '@angular/core';
import {StatisticModel} from "./statistic.model";
import {StatisticService} from "./statistic.service";
import  * as Collections from "typescript-collections";
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  list: StatisticModel[] = [];
  type: number = 0;
  now = Date.now();
  detail: { total: number, price: number } = {total: 0, price: 0};

  constructor(private statisticService: StatisticService) {
    this.statisticService.statistic((new Date).getTime(), 1).subscribe((data: StatisticModel[]) => {
      this.list = data;
      this.detail = this.statisticService.getTotalAndPrice(data);
    });
  }

  getStatisticByMonth(time, type) {

  }


  ngOnInit() {
  }


  selectType(type, time) {
    this.type = type;
    if (time) {
      let date = new Date(time);
      this.statisticService.statistic(date.getTime(), this.type).subscribe((data: StatisticModel[]) => {
        this.list = data;
        this.detail = this.statisticService.getTotalAndPrice(data);
      });
    }

  }

  timeChange(value) {
    // console.log(value);
    let date = new Date(value);
    this.statisticService.statistic(date.getTime(), this.type).subscribe((data: StatisticModel[]) => {
      this.list = data;
      this.detail = this.statisticService.getTotalAndPrice(data);
    });
  }
}
