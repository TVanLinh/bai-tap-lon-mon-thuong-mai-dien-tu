import {Component, ElementRef, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {ShoppingService} from "../../service/shopping.service";
import {Ingredient} from "../../model/ingrendient.model";
import {TaskService} from "../../service/task.service";
import {CustomerService} from "../shopping/customer/customer.service";
import {HOST_NAME} from "../../config";
import {Product} from "../../model/product.model";
import {Angular2Csv} from "angular2-csv/Angular2-csv";
import * as Collections from "typescript-collections";
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
        console.log("order " + this.orders);
      });
    }
  }

  viewOrder(modal: any, item: number) {
    modal.show();
    this.indexOrder = item;
    this.orderDetail = this.orders[item].orderDetails;
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

  getPrice(product: Product) {
    return product.price - ((product.price * product.discount) / 100)
  }

  print() {
    // jQuery(this.eleRef.nativeElement).find(".modal.fade.in").css({
    //   "background-color": "#fff"
    // });
    // setTimeout(()=>{
    //   window.print();
    // },1000);'background-color': ''


    let mywindow = window.open('', 'Chi tiết đơn hàng ', 'height=1000px,width=1000px');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write("<style> img{height: 50px;width: 50px}" +
      " td,th{min-width: 100px;text-align: left}," +
      "thead{background-color:#2B4A91 } " +
      "thead tr th:first-child,tbody tr td:first-child {min-width:0 !important;width:50px !important;}</style>");
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + "Thông tin đơn hàng DH0000" + this.indexOrder + '</h1>');
    mywindow.document.write(jQuery(this.eleRef.nativeElement).find("#table-order-detail-client").html());
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    console.log("inner: " + jQuery(this.eleRef.nativeElement).find(".modal.fade.in").html());

    // return true;
  }

  exportExcel() {
    let data = OrderExport.getListOrderExportFromIngredients(this.orderDetail);
    new Angular2Csv(data, 'order');
  }


}

interface Orders {
  createTime: number;

  customerId: number;

  employeeId: number;
  orderDetails: Ingredient[];
}
class OrderExport {
  name: string;
  amount: string;
  price: string;

  public static  getListOrderExportFromIngredients(ings: Ingredient[]) {
    let list = new Collections.LinkedList<OrderExport>();
    let title = new OrderExport();
    title.name = "Tên sản phẩm";
    title.amount = "Số lượng";
    title.price = "Đơn giá / 1 sản phẩm (VND";
    list.add(title);
    let temp;
    for (let item of ings) {
      let temp = new OrderExport();
      temp.name = item.product.name;
      temp.amount = item.amount + "";
      temp.price = item.product.price - (item.product.price * item.product.discount) / 100 + "";
      list.add(temp);
    }
    return list.toArray();
  }
}

