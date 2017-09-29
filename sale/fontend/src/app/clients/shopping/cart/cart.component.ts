import {Component, OnDestroy, OnInit} from "@angular/core";
import {Ingredient} from "../../../model/ingrendient.model";
import {ProductService} from "../../../service/product.service";
import {ShoppingService} from "../../../service/shopping.service";
import {MyCookieService} from "../../../service/my-cookie.service";
import {MystoreService} from "../../../service/my-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', "../shopping.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  list: Ingredient[] = [];
  money: number = 0;
  // subscription: Subscription;

  constructor(public productService: ProductService,
              public  shopService: ShoppingService,
              private mystorageService: MystoreService) {
  }

  ngOnInit() {
    this.shopService.setIngredient(this.mystorageService.getItem(MyCookieService.SHOP_LIST) as Ingredient[]);
    this.list = this.shopService.getIngredients();
    this.money = this.shopService.getAllMoney();
  }

  onChangeAmount(even: any, index: number) {

  }


  amountChange() {
    this.shopService.setIngredient(this.list);
    this.mystorageService.setItem(MystoreService.SHOP_LIST, this.list);
    this.money = this.shopService.getAllMoney();
    this.shopService.publishCountShop(this.shopService.getAllTotal());
  }

  onChange() {
    this.amountChange();
  }

  onKeyup() {
    this.amountChange();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  removeItem(index: number) {
    this.shopService.removeIngredient(index);
    this.list = this.shopService.getIngredients();
    this.mystorageService.setItem(MystoreService.SHOP_LIST, this.list);
    this.shopService.publishCountShop(this.shopService.getAllTotal());
    this.money = this.shopService.getAllMoney();
  }
}
