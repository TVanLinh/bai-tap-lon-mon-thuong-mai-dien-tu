import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";

import {NgForm} from "@angular/forms/src/forms";
import {Response} from "@angular/http";
import {UserEntityService} from "../entities/user-entity/user-entity.service";

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
  styleUrls: ['./admin-head.component.css']
})
export class AdminHeadComponent implements OnInit {
  private acount;

  constructor(private loginService: LoginService, private cookieService: CookieService,
              private userService: UserEntityService,
              private  router: Router) {

  }

  ngOnInit() {

    this.acount = JSON.parse(this.loginService.getUserInfo());
    console.log("acount:" + this.acount['userName']);

  }

  onLogout() {
    this.cookieService.removeAll();
    this.router.navigate(['/login']);
  }

  onChangePass(changPassForm: NgForm, changPassModal) {
    let formValue = changPassForm.value;
    console.log(formValue);
    // let acount = this.customerService.getAcount();
    let user = {
      passWord: formValue.passWord,
      rePassWord: formValue.rePassWord
    };

    this.userService.changePassWord(user).subscribe((data: Response) => {
      if (data.status === 200) {
        window.alert("Thay đổi mật khẩu thành công ");
        changPassModal.hide();
      }
    }, (error) => {
      window.alert("Thay đổi mật khẩu không thành công ");
    });

  }
}
