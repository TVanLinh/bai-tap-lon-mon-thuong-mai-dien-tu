import {Component, ElementRef, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {ShoppingService} from "../../service/shopping.service";
import {Ingredient} from "../../model/ingrendient.model";
import {TaskService} from "../../service/task.service";
import {CustomerRegister, CustomerService} from "../shopping/customer/customer.service";
import {HOST_NAME} from "../../config";
import {Product} from "../../model/product.model";
import {Angular2Csv} from "angular2-csv/Angular2-csv";
import * as Collections from "typescript-collections";
import {UserEntityModel} from "../../admin/entities/user-entity/user.model";
declare const jQuery: any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', "../shopping/cart/cart.component.css"],
  providers: [CustomerService]
})
export class OrdersComponent implements OnInit {
  orderDetail: Ingredient[] = [];
  orders: Orders[] = [];
  indexOrder = 1;
  orderBy = "createTime";
  orderTemp: Orders;
  dateNow = Date.now();
  ingredientGetPrice = new Ingredient();

  constructor(private shopService: ShoppingService,
              private customerService: CustomerService,
              private eleRef: ElementRef,
              private  taskService: TaskService) {

  }

  ngOnInit() {
    // this.list = this.shopService.getIngredients();
    if (this.customerService.isAcount()) {
      this.taskService.postTask(HOST_NAME + "/order/find-all", this.customerService.getAcount())
        .map((data: Response) => {
          return data.json();
        }).subscribe((data: Orders[]) => {
        this.orders = data;
        if (this.orders != null && this.orders.length > 0) {
        }
      });
    }
  }

  viewOrder(modal: any, item: number) {
    modal.show();
    this.indexOrder = item;

    this.orderDetail = this.orders[item].orderDetails;
    this.orderTemp = this.orders[item];
  }


  getTotalMoney(listItem: Ingredient[]) {
    let money = 0;
    for (let item of listItem) {
      money += (item.product.price - (item.product.price * item.product.discount) / 100) * item.amount;
    }
    return money;
  }

  getStatus(index: number) {
    switch (index) {
      case 0:
        return "Đơn hàng chưa được  xử lý";
      case 1:
        return "Đơn hàng đã được xử lý, đơn hàng đang trong quá trình giao tới khách hàng  ";
      case 100:
        return "Đã giao hàng";
      case 99:
        return "Quý vị đã hủy đơn hàng này ";
      default:
        return "Đơn hàng chưa được  xử lý";
    }

  }

  print() {

    let mywindow = window.open('', 'Chi tiết đơn hàng ', 'height=100%,width=auto');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');

    mywindow.document.write("<link href='/assets/css/print/order-print.css' media='all'rel='stylesheet' type='text/css'>");
    mywindow.document.write('</head><body > <div class="container">');
    mywindow.document.write(jQuery(this.eleRef.nativeElement).find("#print1").html());
    mywindow.document.write('</div></body></html>');

    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(() => {
      mywindow.print();
      mywindow.close();
    }, 1000);


  }

  exportExcel() {
    let data = OrderExport.getListOrderExportFromIngredients(this.orderDetail);
    new Angular2Csv(data, 'order');
  }

}

interface Orders {
  createTime: number;
  status: number;
  customer: CustomerRegister;
  user: UserEntityModel;
  orderDetails: Ingredient[];
}

 export class OrderExport {
  name: string;
  amount: string;
  price: string;

  public static  getListOrderExportFromIngredients(ings: Ingredient[]) {
    let list = new Collections.LinkedList<OrderExport>();
    let title = new OrderExport();
    title.name = "Tên sản phẩm";
    title.amount = "Số lượng";
    title.price = "Đơn giá / sản phẩm (VND)";
    list.add(title);
    let temp;
    for (let item of ings) {
      let temp = new OrderExport();
      temp.name = item.product.name;
      temp.amount = item.amount + "";
      temp.price = item.product.price - (item.product.price * item.product.discount) / 100 + "";
      list.add(temp);
    }


    let footer = new OrderExport();
    footer.name = "";
    footer.amount = "Tổng tiền ";
    footer.price = (new Ingredient).getPrice(ings)+"";
    list.add(footer);
    return list.toArray();
  }
}

