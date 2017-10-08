import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../model/product.model";
import {Page} from "../../../model/page.model";
import {HOST_NAME} from "../../../config";
import {TaskService} from "../../../service/task.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listProduct: Product[] = [];
  page: Page = new Page();
  query: string = '';

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
  }


  ngOnInit() {
    this.route.queryParams.subscribe((param) => {
      console.log(param['query']);
      this.query = param['query'];
      let urlTarget = HOST_NAME + "/product/search?param = " + this.query;
      this.taskService.getTask(urlTarget).subscribe((data: any) => {
        this.listProduct = data.productList;
        this.page = data.page;
        this.page.url = HOST_NAME + "/product/search";
      });
    });
  }


  getUrl($event) {
    this.page.url = $event;
    console.log($event);
    this.taskService.getTask(this.page.url).subscribe((data: any) => {
      this.listProduct = data.productList;
      this.page = data.page;
      this.page.url = HOST_NAME + "/product/search";
    });
  }



}
