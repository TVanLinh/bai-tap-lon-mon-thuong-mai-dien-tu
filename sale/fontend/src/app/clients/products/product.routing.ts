

import {RouterModule, Routes} from "@angular/router";
import {DetailComponent} from "./detail/detail.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {NgModule} from "@angular/core";
const  routing: Routes=[
  // {path:"product",component: ProductListComponent,
  //   children:[
  //    {path: ':id',component: DetailComponent}
  // ]},
  // {path: 'detail/:id',component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routing)],
  exports:[RouterModule]
})
export class ProductRouting{

}
