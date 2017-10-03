import {Component, OnInit} from "@angular/core";
import {Product} from "../../../model/product.model";
import {ProductService} from "../../../service/product.service";
import {Router} from "@angular/router";
import {MyCookieService} from "../../../service/my-cookie.service";
import {TaskService} from "../../../service/task.service";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  public list: Product[] = [];

  constructor(private productService: ProductService,
              private taskService: TaskService,
              private mycookieService: MyCookieService<Product>,
              private router: Router) {
  }

  ngOnInit() {
    this.taskService.getTask("http://localhost:8080/product/saleoff").subscribe((data: any) => {
      this.list = data.productList;
    });

  }

  onClick(item: Product) {
    console.log("product sliderbar");
    this.router.navigate(['/detail'], {queryParams: {param: item.id}});
  }
}
