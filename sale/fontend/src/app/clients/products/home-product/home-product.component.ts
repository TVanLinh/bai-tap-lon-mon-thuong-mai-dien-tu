import {Component, ElementRef, OnInit} from "@angular/core";
import {MystoreService} from "../../../service/my-storage.service";
import {Product} from "../../../model/product.model";
import {TaskService} from "../../../service/task.service";
import {HOST_NAME} from "../../../config";
declare const jQuery: any;

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {

  productNews: Product[]=[];
  productSaleHight: Product[]=[];

  constructor(private eleRef: ElementRef,
              private taskService: TaskService,
              public mylocalStorage: MystoreService) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    if (this.productNews != null && this.productNews.length == 0) {
      this.taskService.getTask(HOST_NAME + "/product/productnew").subscribe((data: any) => {
        this.productNews = data.productList;
      });
    }

    if (this.productSaleHight != null && this.productSaleHight.length == 0) {
      this.taskService.getTask(HOST_NAME + "/product/product-sale-hight").subscribe((data: any) => {
        this.productSaleHight = data.productList;
      });
    }

  }

}
