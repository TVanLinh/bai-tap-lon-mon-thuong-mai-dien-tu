import {Component, OnInit} from "@angular/core";
import {Product} from "../../../model/product.model";
import {ProductService} from "../../../service/product.service";
import {Router} from "@angular/router";
import {MyCookieService} from "../../../service/my-cookie.service";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {
  public list: Product[] = [];

  constructor(private productService: ProductService,
              private mycookieService: MyCookieService<Product>,
              private router: Router) {
  }

  ngOnInit() {
    const pro = new Product();
    pro.price = 45000;
    pro.imagePath = "../../../../assets/images/nuoc-hoa/nuoc-hoa-nu-dior-miss-dior-blooming-bouquet-a-1024x1024.jpg";
    pro.name = "Nước hoa Chanel Bleu De Chanel EDT pour homme";
    pro.description = "";
    pro.discount = 0.5;
    pro.id = 3;
    this.list.push(pro);
    this.list.push(pro);
    this.list.push(pro);
    this.list.push(pro);
  }

  onClick(item: Product) {
    this.mycookieService.putObject(MyCookieService.PRODUCT_ITEM, item);
    this.router.navigate(['/detail']);
  }
}
