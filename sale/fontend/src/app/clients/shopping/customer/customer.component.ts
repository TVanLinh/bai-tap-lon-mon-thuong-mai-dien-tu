import {Component, ElementRef, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {CustomerLoginForm, CustomerRegister, CustomerService} from "./customer.service";
import {Response} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {MystoreService} from "../../../service/my-storage.service";
import {OrderForm} from "../../../model/order.model";
declare const jQuery: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css', '../shopping.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  formDataLogin: FormGroup;
  forgetPass: FormGroup;
  emailChange = "";
  isLogin: boolean;
  private acountLogin = new Subject<boolean>();
  disablePass = true;
  cssSubmit = {
    "cursor": "not-allowed",
    "background-color": "#ccc"
  };

  constructor(private formBuildler: FormBuilder,
              private eleRef: ElementRef,
              private mystorageService: MystoreService,
              private  customerService: CustomerService) {
    this.isLogin = this.customerService.isAcount();
    this.acountLogin.subscribe((data: boolean) => this.isLogin = data);
  }


  ngOnInit() {
    this.initForm();
  }

  onOrder() {
    let list = this.mystorageService.getItem(MystoreService.SHOP_LIST);
    if (list == null || list.length === 0) {
      alert("Giỏ hàng hiện tại chưa có sản phẩm nào");
      return;
    }
    let orderForm: OrderForm = new OrderForm();
    orderForm.customerLoginForm = this.customerService.getAcount();
    orderForm.engredients = list;

    this.customerService.createOrder(orderForm).subscribe((data: Response) => {
      if (data.status === 200) {
        alert("Đặt hàng thành công ");
      } else {
        alert("Đặt hàng không thành công ");
      }
    });

  }

  initForm() {

    this.formDataLogin = this.formBuildler.group({
      email: [''],
      passWord: ['']
    });

    this.forgetPass = this.formBuildler.group({
      emails: ['']
    });
  }


  onRegister(form: NgForm, registerModal: any, loginModal: any) {
    let valueForm: CustomerRegister = form.value;
    console.log(valueForm);

    this.customerService.register(valueForm).subscribe((data: Response) => {
      if (data.status === 200) {
        alert("Đăng kí thành công ");
        this.customerService.setCount({email: valueForm.email, passWord: valueForm.passWord});

        this.acountLogin.next(true);

        registerModal.hide();
      } else {
        alert(data["_body"] + "/n Đăng kí không thành công ");
      }
    }, (errorr) => {

    }, () => this.customerService.publishAcount(true));
  }

  onLogin(loginModal: any) {

    let customer: CustomerLoginForm = this.formDataLogin.value;
    this.customerService.login(customer).subscribe((data: Response) => {
      if (data.status == 200) {
        alert("Đăng nhập thành công");

        let dataCompare = JSON.parse(data["_body"]);

        this.customerService.setCount({email: dataCompare.email, passWord: dataCompare.passWord});

        this.acountLogin.next(true);

        loginModal.hide();
        this.customerService.publishAcount(true);
      }
    }, (error) => {
      alert("Đăng nhập không thành công, vui lòng kiểm tra lại email và  mật khẩu ");
    }, () => {
      // this.customerService.publishAcount(true);
      this.customerService.publishAcount(true);
    });
  }


  public  onForgetPassWord(forgetPassModal: any) {
    var btn = jQuery(this.eleRef.nativeElement).find('#btn-forget-pass-clients');
    forgetPassModal.hide();
    this.customerService.forgetPassWord(this.emailChange).subscribe((data: Response) => {
      if (data.status === 200) {
        window.alert("Quý khách vui lòng kiểm tra email để lấy mật khẩu, Hệ thống sẽ gửi mail trong giây lát ");
      } else {
        window.alert("Không thành công vui lòng kiểm tra lại email");
      }
    });
  }
}
