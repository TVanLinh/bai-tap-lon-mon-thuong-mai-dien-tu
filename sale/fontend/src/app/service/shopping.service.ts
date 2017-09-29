import {Ingredient} from "../model/ingrendient.model";
import {Injectable} from "@angular/core";
import {ProductService} from "./product.service";
import {Product} from "../model/product.model";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ShoppingService {
  private list: Ingredient[] = [];
  cartChange = new Subject<Ingredient[]>();
  cartItem = new Subject<Ingredient>();

  private shareCountShop = new Subject<Number>();

  countShopChange = this.shareCountShop.asObservable();

  publishCountShop(data: any) {
    this.shareCountShop.next(data);
  }


  constructor(private productService: ProductService) {
  }

  setIngredient(ingredients: Ingredient[]) {
    if (!Array.isArray(ingredients) || ingredients == null) {
      this.list = [];
    } else {
      this.list = ingredients;
    }
  }

  public getIngredients(): Ingredient[] {
    return this.list;
  }

  public getAllMoney(): number {
    let all = 0;
    for (let item of this.list) {
      all += (this.productService.getMoney(item.product)) * item.amount;
    }
    return all;
  }

  public isExistsProduct(product: Product): boolean {
    if (this.list == null || this.list.length == 0) {
      return false;
    }
    for (let item of this.list) {
      if (item.product.id == product.id) {
        return true;
      }
    }
    return false;
  }

  public getIngredientByIdProduct(id: number): Ingredient {
    for (let item of this.list) {
      if (item.product.id == id) {
        return item;
      }
    }
    return null;
  }

  public  removeIngredient(index: number): Ingredient[] {
    return this.list.splice(index, 1);
  }

  public getTotal() {
    return this.list ? this.list.length : 0;
  }

  public  getAllTotal() {
    let tt = 0;
    for (let item of this.list) {
      tt += item.amount;
    }
    return tt;
  }

  public  getAmountAllIngredient(data: Ingredient[]) {
    let tt = 0;
    for (let item of data) {
      tt += item.amount;
    }
    return tt;
  }

}
