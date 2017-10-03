import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {CustomerService} from "./customer.service";
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

  cssSubmit = {
    "cursor": "not-allowed",
    "background-color": "#ccc"
  };

  constructor(private formBuildler: FormBuilder,
              private  customerService: CustomerService) {
    this.isLogin = this.customerService.isAcount();
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
      email: ['']
    });
  }

  onRegister(form: NgForm, registerModal: any, loginModal: any) {
    let valueForm = form.value;
    console.log(form.value);



    this.customerService.register(valueForm).subscribe((data: any) => {
      let  a = data;
    });

    // alert("Đăng kí thành công ");
    // registerModal.hide();
    // loginModal.show();

    // this.formDataLogin.setValue({
    //   email: valueForm['email'],
    //   passWord: ['password']
    // });
  }
}
