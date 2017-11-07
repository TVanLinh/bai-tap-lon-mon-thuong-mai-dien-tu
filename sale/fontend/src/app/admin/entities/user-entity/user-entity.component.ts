import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import * as Collection from "typescript-collections";
import {UserEntityModel} from "./user.model";
import {BsModalComponent} from "ng2-bs3-modal";
import {UserEntityService} from "./user-entity.service";
import {ToastrService} from "toastr-ng2";
import {MessageAlert} from "../../../share/message.model";
import {BaseComponent} from "../../BaseComponent";
import {CookieService} from "angular2-cookie/core";
import {LoginService} from "../../../login/login.service";
@Component({
  selector: 'app-user-entity',
  templateUrl: './user-entity.component.html',
  styleUrls: ['./user-entity.component.css'],
  providers: [UserEntityService]
})
export class UserEntityComponent extends BaseComponent implements OnInit {
  @ViewChild('userModal') userModalForm: BsModalComponent;
  formData: FormGroup;
  data: any[] = [];
  listUser = new Collection.LinkedList<UserEntityModel>();
  tempUpdate = null;
  query = "";
  isAdmin: boolean;


  constructor(private formBuilder: FormBuilder,
              private cookieService: CookieService,
              private  userEntityService: UserEntityService,
              private  loginService: LoginService) {
    super();
    this.userEntityService.getAll().subscribe((data: UserEntityModel[]) => {
      this.listUser.clear();
      for (let i of data) {
        this.listUser.add(i);
      }
    });

    this.isAdmin = loginService.isAdmin();
    console.log(loginService.isAdmin());
  }


  ngOnInit() {
    this.initForm();
  }

  openModal(userModal: any) {
    if (!this.isAdmin) {
      this.updateMessge('Bạn không có quyền thực hiện chức năng này  ', 'warning');
      return;
    }
    userModal.show();
  }

  onSave(formData: NgForm, target: any) {
    let valueForm: UserEntityModel = formData.value;
    console.log(valueForm);
    if (valueForm.passWord !== formData.value.rePassWord) {
      this.updateMessge('Không thành công kiểm tra lại thông tin ', 'warning');
      return;
    }

    if (this.tempUpdate === null) {
      this.userEntityService.createUser(valueForm).subscribe((data: Response) => {
        if (data.status === 200) {
          this.updateMessge('Thêm thành công ', 'success');
          valueForm.id = +data['_body'];
          this.listUser.add(valueForm);
        } else {
          this.updateMessge(data['_body'], 'warning');
        }
      }, (error: Error) => {
        this.updateMessge(error.message, 'warning');
      }, () => {
        target.hide();
        formData.reset();
      });
    } else {
      let index = this.listUser.indexOf(this.tempUpdate);
      valueForm.id = this.listUser.elementAtIndex(index).id;
      this.userEntityService.updateUser(valueForm).subscribe((data: Response) => {
        if (data.status === 200) {
          this.updateMessge('Cập nhật thành công ', 'success');
          this.listUser.removeElementAtIndex(index);
          this.listUser.add(valueForm, index);
          target.hide();
          formData.reset();
          console.log(valueForm);
        } else {
          this.updateMessge(data['_body'], 'warning');
        }
      }, (error: Error) => {
        this.updateMessge(error.message, 'warning');
      }, () => {

      });
    }
    this.tempUpdate = null;
  }

  getMessage(status: number, content: string) {

  }

  initForm() {
    this.formData = this.formBuilder.group({
      name: [''],
      userName: [''],
      passWord: [''],
      enable: [true],
      email: [''],
      phone: [''],
      roles: [['user']],
    });
  };


  editItem(formData: NgForm, target: any, item) {
    if (!this.isAdmin) {
      this.updateMessge('Bạn không có quyền thực hiện chức năng này  ', 'warning');
      return;
    }

    let user: UserEntityModel = JSON.parse(this.loginService.getUserInfo());

    if (user.id == item.id) {
      if (!this.isAdmin) {
        this.updateMessge('Bạn không thể cập nhật tài khoản này   ', 'warning');
        return;
      }
    }

    this.tempUpdate = item;
    formData.setValue({
      name: item.name,
      userName: item.userName,
      passWord: item.passWord,
      rePassWord: item.passWord,
      enable: item.enable,
      email: item.email,
      phone: item.phone,
      roles: item.roles,
    });
    target.show();
  }


  removeItem(item) {
    let msg = new MessageAlert();
    if (!this.isAdmin) {
      this.updateMessge('Bạn không có quyền thực hiện chức năng này  ', 'warning');
      return;
    }

    let user: UserEntityModel = JSON.parse(this.loginService.getUserInfo());
    if (user.id == item.id) {
      if (!this.isAdmin) {
        this.updateMessge('Bạn không thể xóa chính mình  ', 'warning');
        return;
      }
    }

    this.userEntityService.deleteUser(item.id).subscribe((data: Response) => {
      this.updateMessge('Xóa thành công ', 'success');
    }, (error: Error) => {
      this.updateMessge(error.message, 'warning');
    }, () => {
      this.listUser.remove(item);
    })
  }

  resetForm() {
    this.formData.setValue({
      name: '',
      userName: '',
      passWord: '',
      enable: true,
      email: '',
      phone: '',
      roles: ['user'],
    })
  }

  onSearch() {
    this.userEntityService.find(this.query).subscribe((data: UserEntityModel[]) => {
      this.listUser.clear();
      for (let item of data) {
        this.listUser.add(item);
      }
    });
  }

}
