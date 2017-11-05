import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./core/header/header.component";
import {HeadComponent} from "./core/header/head/head.component";
import {NavComponent} from "./core/header/nav/nav.component";
import {ProductsComponent} from "./clients/products/products.component";
import {ProductListComponent} from "./clients/products/product-list/product-list.component";
import {DetailComponent} from "./clients/products/detail/detail.component";
import {ProductItemComponent} from "./clients/products/product-list/product-item/product-item.component";
import {SlideBarComponent} from "./core/slide-bar/slide-bar.component";
import {CatalogComponent} from "./core/slide-bar/catalog/catalog.component";
import {ProductNewComponent} from "./core/slide-bar/product-new/product-new.component";
import {CommonModule} from "@angular/common";
import {PostNewComponent} from "./core/slide-bar/post-new/post-new.component";
import {SliderComponent} from "./clients/products/slider/slider.component";
import {Product} from "./model/product.model";
import {FooterComponent} from "./core/footer/footer.component";
import {FooterAboveComponent} from "./core/footer/footer-above/footer-above.component";
import {FooterBelowComponent} from "./core/footer/footer-below/footer-below.component";
import {ProductRouting} from "./clients/products/product.routing";
import {AppRouting} from "./app.routing";
import {ProductService} from "./service/product.service";
import {ShoppingComponent} from "./clients/shopping/shopping.component";
import {CartComponent} from "./clients/shopping/cart/cart.component";
import {ShoppingService} from "./service/shopping.service";
import {Ingredient} from "./model/ingrendient.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerComponent} from "./clients/shopping/customer/customer.component";
import {TaskService} from "./service/task.service";
import {HttpModule} from "@angular/http";
import {Page} from "./model/page.model";
import {PaginationComponent} from "./clients/products/pagination/pagination.component";
import {CookieService} from "angular2-cookie/core";
import {MyCookieService} from "./service/my-cookie.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeProductComponent} from "./clients/products/home-product/home-product.component";
import {SlideBarDirective} from "./directive/slidebar.directive";
import {HomeSliderComponent} from "./clients/products/home-product/home-slider/home-slider.component";
import {MystoreService} from "./service/my-storage.service";
import {ClientsComponent} from "./clients/clients.component";
import {AdminModule} from "./admin/admin.module";
import {ModalModule} from "ngx-bootstrap";
import {SearchComponent} from "./clients/products/search/search.component";
import {OrdersComponent} from "./clients/orders/orders.component";
import {CustomerCanActivateService} from "./service/CustomerCanActivate.service";
import {CustomerService} from "./clients/shopping/customer/customer.service";
import {ArraySortPipe} from "./service/sort.pipe";
import {IntroComponent} from "./clients/intro/intro.component";
import {PolicyComponent} from "./clients/policy/policy.component";
import {TopComponent} from "app/core/top/top.component";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./login/login.service";
import {AdminGuardService} from "./guard/admin.guard";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeadComponent,
    NavComponent,
    ProductsComponent,
    ProductListComponent,
    DetailComponent,
    ProductItemComponent,
    SlideBarComponent,
    CatalogComponent,
    ProductNewComponent,
    PostNewComponent,
    SliderComponent,
    FooterComponent,
    FooterAboveComponent,
    FooterBelowComponent,
    ShoppingComponent,
    CartComponent,
    CustomerComponent,
    PaginationComponent,
    PageNotFoundComponent,
    HomeProductComponent,
    SlideBarDirective,
    HomeSliderComponent,
    ClientsComponent,
    SearchComponent,
    OrdersComponent,
    ArraySortPipe,
    IntroComponent,
    PolicyComponent, TopComponent,LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ProductRouting,
    AppRouting,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AdminModule
  ],
  providers: [Product,
    ProductService,
    ShoppingService,
    Ingredient,
    TaskService,
    Page,
    CookieService,
    MyCookieService,
    MystoreService,
    CustomerCanActivateService,
    CustomerService,
    LoginService,
    AdminGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
