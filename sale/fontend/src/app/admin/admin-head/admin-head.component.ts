import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {UserEntityModel} from "../entities/user-entity/user.model";

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
  styleUrls: ['./admin-head.component.css']
})
export class AdminHeadComponent implements OnInit {
  private acount;

  constructor(private loginService: LoginService, private cookieService: CookieService, private  router: Router) {

  }

  ngOnInit() {

    this.acount = JSON.parse(this.loginService.getUserInfo());
    console.log("acount:" + this.acount['userName']);

  }

  onLogout() {
    this.cookieService.removeAll();
    this.router.navigate(['/login']);
  }
}
