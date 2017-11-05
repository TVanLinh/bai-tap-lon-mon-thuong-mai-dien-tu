import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ShoppingComponent} from "./clients/shopping/shopping.component";
import {ProductListComponent} from "./clients/products/product-list/product-list.component";
import {DetailComponent} from "./clients/products/detail/detail.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeProductComponent} from "./clients/products/home-product/home-product.component";
import {ProductsComponent} from "./clients/products/products.component";
import {AdminModule} from "./admin/admin.module";
import {ClientsComponent} from "./clients/clients.component";
import {SearchComponent} from "./clients/products/search/search.component";
import {OrdersComponent} from "./clients/orders/orders.component";
import {CustomerCanActivateService} from "./service/CustomerCanActivate.service";
import {IntroComponent} from "./clients/intro/intro.component";
import {PolicyComponent} from "./clients/policy/policy.component";
import {LoginComponent} from "./login/login.component";

const routing: Routes = [
  {
    path: "",
    component: ClientsComponent, children: [
    {
      path: "", component: ProductsComponent, children: [
      {path: "", component: HomeProductComponent},
      {path: "product", component: ProductListComponent},
      {path: "detail", component: DetailComponent},
      {path: "intro", component: IntroComponent},
      {path: "policy", component: PolicyComponent},
      {path: 'search', component: SearchComponent}
    ]
    },
    {path: "shop", component: ShoppingComponent},
    {path: "order", component: OrdersComponent, canActivate: [CustomerCanActivateService]},


    {path: "404", component: PageNotFoundComponent},
  ]
  },
  {path: 'login', component:LoginComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routing), AdminModule],
  exports: [RouterModule]
})

export class AppRouting {

}
