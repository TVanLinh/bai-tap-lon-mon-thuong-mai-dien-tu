import {Component, ElementRef, OnChanges, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {ShoppingService} from "../../../service/shopping.service";
import {MystoreService} from "../../../service/my-storage.service";
import {
  CustomerLoginForm,
  CustomerRegister,
  CustomerService
} from "../../../clients/shopping/customer/customer.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Subject} from "rxjs/Subject";
declare const jQuery: any;
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers: [CustomerService]
})
export class HeadComponent implements OnInit, OnChanges {
  dateNow = Date.now();
  amount: number = this.shopService.getAmountAllIngredient(this.myStorageService.getItem(MystoreService.SHOP_LIST)) | 0;
  email: string = '';
  emailTemp: string = '';
  search = "";
  isLogin: boolean;
  formDataLogin: FormGroup;
  forgetPass: FormGroup;
  emailChange = "";

  private acountLogin = new Subject<boolean>();

  disablePass = true;
  cssSubmit = {
    "cursor": "not-allowed",
    "background-color": "#ccc"
  };

  constructor(private shopService: ShoppingService,
              private router: Router,
              private eleRef: ElementRef,
              private formBuildler: FormBuilder,
              private customerService: CustomerService,
              private  myStorageService: MystoreService) {

    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });

    this.acountLogin.subscribe((data: boolean) => {
        this.isLogin = data;
        this.emailTemp = this.customerService.getAcount().email;
      }
    );

  }

  ngOnInit() {
    this.initForm();
    if (this.customerService.isAcount()) {
      this.isLogin = true;
      this.emailTemp = this.customerService.getAcount().email;
    }
  }

  ngOnChanges() {

  }

  onClick() {
    // console.log(this.search);
    // this.router.navigate(['search'], {queryParams: {"param": this.search}});
    window.location.href = "/search?param=" + this.search;
  }


  onLogout() {
    this.customerService.logout();
    this.isLogin = false;
    window.location.href = "/";
  }

  onChangePass(changPassForm: NgForm, changPassModal) {
    let formValue = changPassForm.value;
    console.log(formValue);
    let acount = this.customerService.getAcount();
    let customer: CustomerRegister = {
      fullName: null,
      email: acount.email,
      passWord: formValue.passWord,
      rePassWord: formValue.rePassWord,
      phone: null,
      address: null
    };

    this.customerService.changePassWord(customer).subscribe((data: Response) => {
      if (data.status === 200) {
        window.alert("Thay đổi mật khẩu thành công ");
        this.customerService.setCount({email: acount.email, passWord: formValue.rePassWord});
        changPassModal.hide();
      } else {
        window.alert("Thay đổi mật khẩu không thành công ");
      }
    }, (error) => {
      window.alert("Thay đổi mật khẩu không thành công ");

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
        let dataCompare = JSON.parse(data["_body"]);
        this.customerService.setCount({email: dataCompare.email, passWord: dataCompare.passWord});
        this.acountLogin.next(true);
        loginModal.hide();
        this.acountLogin.next(true);
        window.location.reload(true);
      }
    }, (error) => {
      alert("Đăng nhập không thành công, vui lòng kiểm tra lại email và  mật khẩu ");
    }, () => {
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
