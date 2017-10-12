import {Component, OnChanges, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {ShoppingService} from "../../../service/shopping.service";
import {MystoreService} from "../../../service/my-storage.service";
import {CustomerRegister, CustomerService} from "../../../clients/shopping/customer/customer.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

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
  search = "";
  isLogin: boolean;

  constructor(private shopService: ShoppingService,
              private router: Router,
              private customerService: CustomerService,
              private  myStorageService: MystoreService) {

    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });

    this.customerService.$publishAcount.subscribe((data: boolean) => {
      if (data == true) {
        this.email = this.customerService.getAcount() != null ? this.customerService.getAcount().email : '';
        this.isLogin = true;
      }

    });
  }

  ngOnInit() {
    this.isLogin = this.customerService.isAcount();
    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });
    this.email = this.customerService.getAcount() != null ? this.customerService.getAcount().email : '';

  }

  ngOnChanges() {
    console.log("HeadComponent");
  }

  onClick() {
    console.log(this.search);
    this.router.navigate(['search'], {queryParams: {"query": this.search}});
  }

  onLogout() {
    this.customerService.logout();
    this.isLogin = false;
    window.location.href="/";
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
}
