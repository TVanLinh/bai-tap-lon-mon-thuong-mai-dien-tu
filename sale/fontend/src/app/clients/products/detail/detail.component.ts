import {Component, OnDestroy, OnInit} from "@angular/core";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product.model";
import {Subscription} from "rxjs/Subscription";
import {Ingredient} from "../../../model/ingrendient.model";
import {ShoppingService} from "../../../service/shopping.service";
import {Router} from "@angular/router";
import {MyCookieService} from "../../../service/my-cookie.service";
import {MystoreService} from "../../../service/my-storage.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  list: Product[] = [];
  product: Product;
  subcription: Subscription = null;
  id: number;
  catalog = "";

  constructor(private productService: ProductService,
              private  shopService: ShoppingService,
              private  router: Router,
              private myCookieService: MyCookieService<any>,
              private mylocalStorage: MystoreService,) {
  }


  ngOnInit() {
    this.getProduct();
  }

  private  getProduct() {
    this.list = this.productService.getProducts().splice(0, 4);

    this.product = this.myCookieService.getObject(MyCookieService.PRODUCT_ITEM);

    if (this.product == null) {
      this.router.navigate(["/product"]);
    }
    // this.subcription = this.productService.subjectItem.subscribe((prod: Product) => this.product = prod);
  }


  addCart(product: Product) {
    let shopList = this.mylocalStorage.getItem(MystoreService.SHOP_LIST);

    this.shopService.setIngredient(shopList);

    if (this.shopService.isExistsProduct(product)) {
      ++this.shopService.getIngredientByIdProduct(product.id).amount;
    } else {
      let ingredient = new Ingredient();
      ingredient.product = product;
      ingredient.amount = 1;
      this.shopService.getIngredients().push(ingredient);
      let i = this.shopService.getIngredients().length;
    }

    this.mylocalStorage.setItem(MystoreService.SHOP_LIST, this.shopService.getIngredients());

    this.router.navigate(['/shop']);
    this.shopService.publishCountShop(this.shopService.getAllTotal());
  }

  ngOnDestroy() {
    this.myCookieService.remove(MyCookieService.PRODUCT_ITEM);
    if (this.subcription != null) {
      this.subcription.unsubscribe();
    }
  }


}
