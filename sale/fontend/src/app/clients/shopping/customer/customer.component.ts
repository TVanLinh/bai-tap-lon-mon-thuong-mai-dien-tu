import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "./customer.service";
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css', '../shopping.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  formDataRegister: FormGroup;
  formDataLogin: FormGroup;

  isLogin: boolean;

  cssSubmit = {
    "cursor": "not-allowed",
    "background-color": "#ccc"
  };

  constructor(private formBuildler: FormBuilder, private  customerService: CustomerService) {
    this.isLogin = this.customerService.isAcount();
  }


  ngOnInit() {
    this.initForm();
  }

  onSend(registerModal: any) {
    registerModal.show();
  }

  initForm() {
    this.formDataRegister = this.formBuildler.group({
      fullName: [''],
      email: [''],
      passWord: [''],
      rePassWord: [''],
      phone: [''],
      address: ['']
    });
    this.formDataLogin = this.formBuildler.group({
      email: [''],
      passWord: ['']
    });
  }

  onRegister() {
    console.log(this.formDataRegister.value);
  }
}
