import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {CustomerLoginForm, CustomerRegister, CustomerService} from "./customer.service";
import {Response} from "@angular/http";
import {Subject} from "rxjs/Subject";
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css', '../shopping.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  formDataLogin: FormGroup;
  forgetPass: FormGroup;
  isLogin: boolean;
  private acountLogin = new Subject<boolean>();

  cssSubmit = {
    "cursor": "not-allowed",
    "background-color": "#ccc"
  };

  constructor(private formBuildler: FormBuilder,
              private  customerService: CustomerService) {
    this.isLogin = this.customerService.isAcount();
    this.acountLogin.subscribe((data: boolean) => this.isLogin = data);
  }


  ngOnInit() {
    this.initForm();
  }

  onSend(registerModal: any) {
    registerModal.show();
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
      }
    }, (error) => {
      alert("Đăng nhập không thành công, vui lòng kiểm tra lại email và  mật khẩu ");
    }, () => {
      this.customerService.publishAcount(true);
      console.log( this.customerService.publishAcount(true));
    });
  }
}
