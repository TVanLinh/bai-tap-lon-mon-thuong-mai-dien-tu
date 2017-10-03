import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {Product} from "../../../model/product.model";
import {ProductService} from "../../../service/product.service";
import {TaskService} from "../../../service/task.service";
import {Page} from "../../../model/page.model";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {HOST_NAME} from "../../../config";
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
  catalog = "";

  constructor(private  productService: ProductService,
              private  route: ActivatedRoute,
              private  taskService: TaskService) {
  }

  ngOnInit() {
    this.page.url = HOST_NAME + "/product";
    this.taskService.getTask(HOST_NAME + "/product?page=1").subscribe((data: any) => {
      this.list = data.productList;
      this.page = data.page;
      this.page.url = HOST_NAME + "/product";
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
      this.catalog = params['catalog'] || "all";
      this.getUrl(this.page.url);
      this.page.currentPage = 1;

      let urlTarget=HOST_NAME + "/product?page=1&param="+(params['catalog'] || "all");

      this.taskService.getTask(urlTarget).subscribe((data: any) => {
        this.list = data.productList;
        this.page = data.page;
        this.page.url = HOST_NAME + "/product";
      });
    });
  }

  getUrl($event) {
    this.page.url = $event;
    console.log($event);
    this.taskService.getTask(this.page.url).subscribe((data: any) => {
      this.list = data.productList;
      this.page = data.page;
      this.page.url = HOST_NAME + "/product";
    });
  }

  getCatalogTitle() {
    let str = "hiện tại  không có sản phẩm nào ";
    switch (this.catalog.toLowerCase()) {
      case 'nhm': {
        return "Nước hoa nam " + str;
      }
      case 'nhn': {
        return "Nước hoa nữ  " + str;
      }
      case 'srm': {
        return "Sữa rửa mặt  " + str;
      }
      case 'dh': {
        return "Đồng hồ   " + str;
      }
      case 'st': {
        return "Sữa tắm  " + str;
      }
      case 'dtdtt': {
        return "Dưỡng trắng da toàn thân  " + str;
      }
      case 'kdt': {
        return "Kem dưỡng thế   " + str;
      }
      case 'sm' :{
        return "Son môi " + str;
      }
      default:
        return str;
    }
  }
}
