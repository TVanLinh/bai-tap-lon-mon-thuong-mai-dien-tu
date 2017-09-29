import {Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as Collection from "typescript-collections";
import {UserEntityModel} from "./user.model";
import {BsModalComponent} from "ng2-bs3-modal";
import {UserEntityService} from "./user-entity.service";
import {ToastrService} from "toastr-ng2";
import {MessageAlert} from "../../../share/message.model";
import {Subject} from "rxjs/Subject";
@Component({
  selector: 'app-user-entity',
  templateUrl: './user-entity.component.html',
  styleUrls: ['./user-entity.component.css'],
  providers: [UserEntityService]
})
export class UserEntityComponent implements OnInit {
  @ViewChild('userModal') userModalForm: BsModalComponent;
  formData: FormGroup;
  data: any[] = [];
  listUser = new Collection.LinkedList<UserEntityModel>();
  positionUpdate = -1;
  alert: Subject<MessageAlert> = new Subject<MessageAlert>();
  message = new MessageAlert();

  constructor(private formBuilder: FormBuilder,
              private  userEntityService: UserEntityService, private toastService: ToastrService) {
    this.userEntityService.getAll().subscribe((data: UserEntityModel[]) => {
      this.listUser.clear();
      for (let i of data) {
        this.listUser.add(i);
      }
    });
    this.alert.subscribe((data: MessageAlert) => {
      this.message = data;
    });
  }


  ngOnInit() {
    this.initForm();
  }

  onSave(target: any) {
    let valueForm: UserEntityModel = this.formData.value;
    console.log("onSave: " + this.positionUpdate);
    let msg = new MessageAlert();
    if (this.positionUpdate === -1) {
      this.userEntityService.createUser(valueForm).subscribe((data: Response) => {
        if (data.status === 200) {
          msg.type = 'success';
          msg.content = "Thêm thành công ";
          valueForm.id = +data['_body'];
          this.listUser.add(valueForm);
        } else {
          msg.type = 'warning';
          msg.content = data['_body'];
        }
      }, (error: Error) => {
        msg.type = 'warning';
        msg.content = error.message;
        this.alert.next(msg);
      }, () => {
        this.alert.next(msg);
        target.hide();
        this.formData.reset();
      });
    } else {
      valueForm.id = this.listUser.elementAtIndex(this.positionUpdate).id;
      this.userEntityService.updateUser(valueForm).subscribe((data: Response) => {
        if (data.status === 200) {
          msg.type = 'success';
          msg.content = "Cập nhật thành công ";
          this.listUser.removeElementAtIndex(this.positionUpdate);
          this.listUser.add(valueForm, this.positionUpdate);
          target.hide();
          this.alert.next(msg);
          this.formData.reset();
          console.log(valueForm);
        } else {
          msg.type = 'warning';
          msg.content = data['_body'];
        }
      }, (error: Error) => {
        msg.type = 'warning';
        msg.content = error.message;
        this.alert.next(msg);
      }, () => {

      });
    }
    this.positionUpdate = -1;
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


  editItem(target: any, index: number) {
    this.positionUpdate = index;
    let item = this.listUser.elementAtIndex(index);
    this.formData.patchValue({
      name: item.name,
      userName: item.userName,
      passWord: item.passWord,
      enable: item.enable,
      email: item.email,
      phone: item.phone,
      roles: item.roles,
    });
    target.show();
  }


  removeItem(index: number) {
    let msg = new MessageAlert();
    this.userEntityService.deleteUser(this.listUser.elementAtIndex(index).id).subscribe((data: Response) => {
      msg.type = 'success';
      msg.content = "Xoa thành công ";
    }, (error: Error) => {
      msg.type = 'warning';
      msg.content = error.message;
      this.alert.next(msg);
    }, () => {
      this.listUser.removeElementAtIndex(index);
      this.alert.next(msg);
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

}
