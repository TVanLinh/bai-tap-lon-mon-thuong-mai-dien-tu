import {Component, Input, OnInit} from "@angular/core";
import {Product} from "../../../../model/product.model";
import {Router} from "@angular/router";
import {ProductService} from "../../../../service/product.service";
import {MyCookieService} from "../../../../service/my-cookie.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css', "../../../.././core/core.css"]
})
export class ProductItemComponent implements OnInit {

  @Input() itemProduct: Product;

  constructor(private router: Router,
              private productService: ProductService,
              private myCookieService: MyCookieService<Product>) {
  }

  ngOnInit() {
  }

  onClick(product: Product) {

    console.log("product =--");
    this.router.navigate(['/detail'], {queryParams: {param: product.id}});

  }
}
