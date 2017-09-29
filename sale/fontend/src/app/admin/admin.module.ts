import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {AdminHeadComponent} from "./admin-head/admin-head.component";
import {CatalogEntityComponent} from "./entities/catalog-entity/catalog-entity.component";
import {ProductEntityComponent} from "./entities/product-entity/product-entity.component";
import {CustomerEntityComponent} from "./entities/customer-entity/customer-entity.component";
import {OrderEntityComponent} from "./entities/order-entity/order-entity.component";
import {EmployeeEntityComponent} from "./entities/employee-entity/employee-entity.component";
import {UserEntityComponent} from "./entities/user-entity/user-entity.component";
import {EntitiesComponent} from "./entities/entities.component";
import {CommentEntityComponent} from "./entities/comment-entity/comment-entity.component";
import {DataTableModule} from "angular2-datatable";
import {BrowserModule} from "@angular/platform-browser";
import {AlertModule, ModalModule} from "ngx-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {TaskService} from "../service/task.service";
import {HttpModule} from "@angular/http";
import {ToastrModule} from "toastr-ng2";
import {CommonModule} from "@angular/common";


const routes: Routes = [{
  component: AdminComponent,
  path: "manager", children: [
    {
      path: 'entity',
      component: EntitiesComponent, children: [
      {
        path: 'catalog',
        component: CatalogEntityComponent
      }, {
        path: 'product',
        component: ProductEntityComponent
      }, {
        path: 'customer',
        component: CustomerEntityComponent
      }, {
        path: 'employee',
        component: EmployeeEntityComponent
      }, {
        path: 'user',
        component: UserEntityComponent
      }, {
        path: 'order',
        component: OrderEntityComponent
      }, {
        path: 'comment',
        component: CommentEntityComponent
      }
    ]
    }
  ]
}];


@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    AdminHeadComponent,
    CatalogEntityComponent,
    ProductEntityComponent,
    CustomerEntityComponent,
    OrderEntityComponent,
    EmployeeEntityComponent,
    UserEntityComponent,
    EntitiesComponent,
    CommentEntityComponent,


  ],
  imports: [RouterModule.forChild(routes),
    DataTableModule,
    ModalModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    ToastrModule.forRoot(), AlertModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [TaskService]
})

export class AdminModule {

}
