import {ElementRef, Injectable} from "@angular/core";
import {TaskService} from "../../../service/task.service";
import {HOST_NAME} from "../../../config";
import {OrderEntity} from "./order-entity.model";
import {Angular2Csv} from "angular2-csv";
import {OrderExport} from "../../../clients/orders/orders.component";
declare const jQuery: any;
import * as Collections from "typescript-collections";
import {Ingredient} from "../../../model/ingrendient.model";
@Injectable()
export class OrderEntityService {
  constructor(private tastService: TaskService) {

  }

  public  createProduct(body: OrderEntity) {
    return this.tastService.postTask(HOST_NAME + "/order/create", body);
  }

  public  updateOrder(body: {id: number,idUser: number,status: number}) {
    return this.tastService.putTask(HOST_NAME + "/admin/order/update", body);
  }


  public  findAll() {
    return this.tastService.getTask(HOST_NAME + "/admin/order/find-all");
  }

  public  findBy(query) {
    return this.tastService.getTask(HOST_NAME + "admin/search?param=" + query);
  }


  static getStatus(index: number) {
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


    print( eleRef: ElementRef) {

    let mywindow = window.open('', 'Chi tiết đơn hàng ', 'height=100%,width=auto');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');

    mywindow.document.write("<link href='/assets/css/print/order-print.css' media='all'rel='stylesheet' type='text/css'>");
    mywindow.document.write('</head><body > <div class="container">');
    mywindow.document.write(jQuery(eleRef.nativeElement).find("#print1").html());
    mywindow.document.write('</div></body></html>');

    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(() => {
      mywindow.print();
      mywindow.close();
    }, 1000);


  }

  exportExcel(value:Ingredient[]) {
    let data = OrderExport.getListOrderExportFromIngredients(value);
    new Angular2Csv(data, 'order');
  }

}
