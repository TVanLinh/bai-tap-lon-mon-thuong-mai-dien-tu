import {Injectable} from "@angular/core";
import {TaskService} from "../../../service/task.service";
import {HOST_NAME} from "../../../config";
@Injectable()
export class CustomerService {
  private ACOUNT = "ACOUNT";

  constructor(private  taskService: TaskService) {
  }

  getAcount(): { email: string, passWord: string } {
    let str = sessionStorage.getItem(this.ACOUNT);
    if (str == null || str === 'undefined') {
      return null;
    }
    return JSON.parse(str);
  }

  isAcount(): boolean {
    let str = sessionStorage.getItem(this.ACOUNT);
    if (str == null || str === 'undefined') {
      return false;
    }
    return true;
  }

  setCount(acount: { email: string, passWord: string }) {
    sessionStorage.setItem(this.ACOUNT, JSON.stringify(acount));
  }

  public login(customerLogin: CustomerLoginForm) {

  }

  public  logout() {
    sessionStorage.removeItem(this.ACOUNT);
  }

  public register(customerRegister: CustomerRegister) {
    return this.taskService.postTask(HOST_NAME+"/customer");
  }

  public  changePassWord(customerLogin: CustomerLoginForm) {

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

