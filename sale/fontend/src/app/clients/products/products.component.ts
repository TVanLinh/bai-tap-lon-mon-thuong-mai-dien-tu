import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MystoreService} from "../../service/my-storage.service";
import {Product} from "../../model/product.model";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private  router: Router, public mylocalStorage: MystoreService) {
    let product = new Product();
    product.id = 1;
    product.name = "test";
    product.amount = 3;
    product.imagePath = "kfdkdff";
    product.description = "okfkdffdkdfkdf men";
    this.mylocalStorage.setItem("product", product);
    let test = this.mylocalStorage.getItem("product");
    console.log(test);
  }

  ngOnInit() {
  }

  getCatalog($event: string) {
    // window.alert($event);
    this.router.navigate(['product'], {queryParams: {catalog: $event}});
  }

}
