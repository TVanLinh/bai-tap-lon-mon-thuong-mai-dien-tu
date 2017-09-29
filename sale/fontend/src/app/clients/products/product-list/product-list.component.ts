import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {Product} from "../../../model/product.model";
import {ProductService} from "../../../service/product.service";
import {TaskService} from "../../../service/task.service";
import {Page} from "../../../model/page.model";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnChanges, OnDestroy {


  public list: Product[] = [];
  product: Product;
  page: Page = new Page();
  observable: Observable<string> = new Observable<string>();
  subscript: Subscription;
  catalog = "ALL";

  constructor(private  productService: ProductService,
              private  route: ActivatedRoute,
              private  taskService: TaskService) {
  }

  ngOnInit() {
    this.page.url = "http://localhost:8080/product";
    this.taskService.getTask("http://localhost:8080/product?page=1&param=ALL").subscribe((data: any) => {
      this.list = data.productList;
      this.page = data.page;
      this.page.url = "http://localhost:8080/product";
    });
    this.getCatalog();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.productService.subject.subscribe((data: string) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    if (this.subscript != null) {
      this.subscript.unsubscribe();
    }
  }

  getCatalog() {
    this.route.queryParams.subscribe(params => {
      this.catalog = params['catalog'] || "";
      this.getUrl(this.page.url);
    });
    this.page.currentPage = 1;
  }

  getUrl($event) {
    this.page.url = $event;
    console.log($event);
    this.taskService.getTask(this.page.url).subscribe((data: any) => {
      this.list = data.productList;
      this.page = data.page;
      this.page.url = "http://localhost:8080/product";
    });
  }
}
