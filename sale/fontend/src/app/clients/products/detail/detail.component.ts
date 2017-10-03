import {Component, OnDestroy, OnInit} from "@angular/core";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product.model";
import {Subscription} from "rxjs/Subscription";
import {Ingredient} from "../../../model/ingrendient.model";
import {ShoppingService} from "../../../service/shopping.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MyCookieService} from "../../../service/my-cookie.service";
import {MystoreService} from "../../../service/my-storage.service";
import {TaskService} from "../../../service/task.service";

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
              private route: ActivatedRoute,
              private  taskService: TaskService,
              private myCookieService: MyCookieService<any>,
              private mylocalStorage: MystoreService,) {
  }


  ngOnInit() {
    this.getProducts();
  }

  private  getProducts() {

    this.route.queryParams.subscribe((param) => {
      let id = param['param'];
      console.log(Number.isInteger(+id));
      if (Number.isInteger(+id)) {
        this.taskService.getTask("http://localhost:8080/product/" + id).subscribe((data: Product) => {
          this.product = data;
          console.log(data);
        });
      }
     setTimeout( ()=>{
       window.scrollTo(0, 0)
     },500);
    });

    if (this.list != null && this.list.length == 0) {
      this.taskService.getTask("http://localhost:8080/product/different").subscribe((data: any) => {
        this.list = data.productList;
      });

    }

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
