import {Injectable} from "@angular/core";
import {TaskService} from "../../../service/task.service";
import {HOST_NAME} from "../../../config";
import {Subject} from "rxjs/Subject";
import {OrderForm} from "../../../model/order.model";
@Injectable()
export class CustomerService {
  private ACOUNT = "ACOUNT";
  private acountListener = new Subject<boolean>();
  $publishAcount = this.acountListener.asObservable();
  $logout = new Subject<boolean>();

  constructor(private  taskService: TaskService) {

  }


  publishAcount(acount: boolean) {
    this.acountListener.next(acount);
  }


  getAcount(): { email: string, passWord: string } {
    let str = localStorage.getItem(this.ACOUNT);
    if (str == null || str === 'undefined') {
      return null;
    }
    return JSON.parse(str);
  }

  isAcount(): boolean {
    let str = localStorage.getItem(this.ACOUNT);
    if (str == null || str === 'undefined') {
      return false;
    }
    return true;
  }

  setCount(acount: { email: string, passWord: string }) {
    localStorage.setItem(this.ACOUNT, JSON.stringify(acount));
  }

  public login(customerLogin: CustomerLoginForm) {
    return this.taskService.postTask(HOST_NAME + "/customer/login", customerLogin);
  }

  public  logout() {
    localStorage.removeItem(this.ACOUNT);
    this.$logout.next(true);
  }

  public register(customerRegister: CustomerRegister) {
    return this.taskService.postTask(HOST_NAME + "/customer", customerRegister);
  }

  public  changePassWord(customerRegister: CustomerRegister) {
    return this.taskService.putTask(HOST_NAME + "/customer/change-pass", customerRegister);
  }

  public  forgetPassWord(email: string) {
    return this.taskService.putTask(HOST_NAME + "/customer/forget-pass?email=" + email);
  }

  public createOrder(orderForm: OrderForm) {
    return this.taskService.postTask(HOST_NAME + "/order/create", orderForm);
  }
}

export  interface  CustomerRegister {
  fullName: string;
  email: string;
  passWord: string;
  rePassWord: string;
  phone: string;
  address: string
}

export  interface  CustomerLoginForm {
  email: string;
  passWord: string;
}

