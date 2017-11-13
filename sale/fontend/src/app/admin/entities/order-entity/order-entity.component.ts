import {Component, ElementRef, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import * as Collections from "typescript-collections";
import {OrderEntity} from "./order-entity.model";
import {OrderEntityService} from "./order-entity.service";
import {Ingredient} from "../../../model/ingrendient.model";
import {Product} from "../../../model/product.model";
import {ProductEntityService} from "../product-entity/product-entity.service";
import {BaseComponent} from "../../BaseComponent";
import {UserEntityModel} from "../user-entity/user.model";
import {UserEntityService} from "../user-entity/user-entity.service";
import {NgForm} from "@angular/forms";
;import {templateJitUrl} from "@angular/compiler";
import {LoginService} from "../../../login/login.service";
@Component({
  selector: 'app-order-entity',
  templateUrl: './order-entity.component.html',
  styleUrls: ['./order-entity.component.css', "../entities.component.css"]
})
export class OrderEntityComponent extends BaseComponent implements OnInit {
  listOrder = new Collections.LinkedList<OrderEntity>();
  orderDetails: Ingredient[] = [];
  indexOrder = 0;
  query: string = '';
  orderTemp: OrderEntity;
  dateNow = Date.now();
  ingredientGetPrice = new Ingredient();
  users: UserEntityModel[] = [];
  statusList = [0, 1, 100];


  id = {"id": ""};
  customerName: { customer: { fullName: '' } };

  constructor(private orderService: OrderEntityService,
              private eleRef: ElementRef,
              private  loginService: LoginService,
              private  userEntityService: UserEntityService) {
    super();
    this.userEntityService.getAll().subscribe((data: UserEntityModel[]) => {
      this.users = data;
    });
  }

  ngOnInit() {
    this.getOrders();
  }

  print() {
    this.orderService.print(this.eleRef);
  }


  private getOrders() {
    this.listOrder.clear();
    this.orderService.findAll().subscribe((data: OrderEntity[]) => {
      for (let item of data) {
        this.listOrder.add(item);
      }
    });

  }

  exportExcel() {
    this.orderService.exportExcel(this.orderDetails);
  }

  onSearch() {

    let list = new Collections.Set<OrderEntity>();

    if (this.query.trim() === '') {
      this.getOrders();
      return;
    }

    this.listOrder.clear();
    this.orderService.findAll().subscribe((data: OrderEntity[]) => {
      console.log("query " + this.query);
      for (let item of data) {
        console.log(item['customer']['fullName'].toLowerCase().indexOf(this.query.toLowerCase()));
        if ((item['id'].toString() + "") === this.query
          || item['user']['name'].toLowerCase().trim().indexOf(this.query.toLowerCase().trim()) > -1
          || item['user']['name'].toLowerCase().trim().indexOf(this.query.toLowerCase().trim()) > -1) {
          list.add(item);
        }
      }

      for (let item of list.toArray()) {
        this.listOrder.add(item);
      }

    });

  }

  openDetail(item: OrderEntity, orderModalDetail) {
    // let user: UserEntityModel = JSON.parse(this.loginService.getUserInfo());

    this.indexOrder = item.id;
    this.orderTemp = item;
    this.orderDetails = item.orderDetails;
    orderModalDetail.show();
  }

  getStatus(index: number) {
    return OrderEntityService.getStatus(index);
  }

  getPrice(product: Product) {
    return ProductEntityService.getPrice(product);
  }

  editItem(formData, orderModalForm, item) {
    let admin = this.loginService.isAdmin();
    if (!admin) {
      this.updateMessge('Bạn không có quyền thực hiện chức năng này  ', 'warning');
      return;
    }
    orderModalForm.show();
    this.indexOrder = item;
    this.orderTemp = this.listOrder.elementAtIndex(this.indexOrder);
  }


  removeItem(item) {
    let admin = this.loginService.isAdmin();
    if (!admin) {
      this.updateMessge('Bạn không có quyền thực hiện chức năng này  ', 'warning');
      return;
    }
    this.orderService.delete(item.id).subscribe((data) => {
      this.updateMessge('Xóa đơn hàng thành công   ', 'success');
      this.listOrder.remove(item);
    }, (err) => {
      this.updateMessge('Xóa đơn hàng không thành công   ', 'warning');
    });
  }

  onSave(formData: NgForm, orderModalForm) {
    let value = formData.value;
    let obj = {
      id: this.orderTemp.id,
      idUser: value['iduser'],
      status: value['status']
    };

    let itemUpdate = this.listOrder.elementAtIndex(this.indexOrder);

    if (itemUpdate.user.id == obj.idUser && itemUpdate.status == obj.status) {
      orderModalForm.hide();
      return;
    }

    this.orderService.updateOrder(obj).subscribe((response: Response) => {
      if (response.status === 200) {
        this.updateMessge('Cập nhật thành công  ', 'success');
        this.listOrder.removeElementAtIndex(this.indexOrder);
        itemUpdate.status = obj.status;
        itemUpdate.user = this.getUser(this.users, Number.parseInt(obj.idUser));
        itemUpdate.lastUpdateTime = (new Date).getTime();
        console.log("Json " + JSON.stringify(itemUpdate.user));
        this.listOrder.add(itemUpdate, this.indexOrder);
        formData.reset();
      } else {
        this.updateMessge('Cập nhật không thành công   ', 'warning');
      }

    });
    orderModalForm.hide();
  }

  getUser(users: UserEntityModel[], id: number): UserEntityModel {
    let result;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        console.log(users[i].id === id);
        result = users[i];
      }
    }
    return result;
  }
}
