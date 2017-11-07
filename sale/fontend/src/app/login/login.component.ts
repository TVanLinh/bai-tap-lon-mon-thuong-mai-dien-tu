import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    // if(this.loginService.getToken()) {
    //   this.router.navigate(["/manager/entity"]);
    // }
  }

  onSubmit(formData: NgForm) {
    let valueForm = formData.value;

    this.loginService.login(valueForm);
  }

}
