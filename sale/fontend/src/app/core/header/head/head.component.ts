import {Component, OnChanges, OnInit} from "@angular/core";
import {ShoppingService} from "../../../service/shopping.service";
import {MystoreService} from "../../../service/my-storage.service";
import {CustomerService} from "../../../clients/shopping/customer/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers: [CustomerService]
})
export class HeadComponent implements OnInit, OnChanges {
  dateNow = Date.now();
  amount: number = this.shopService.getAmountAllIngredient(this.myStorageService.getItem(MystoreService.SHOP_LIST)) | 0;
  email: string = '';
  search = "";

  constructor(private shopService: ShoppingService,
              private router: Router,
              private customerService: CustomerService,
              private  myStorageService: MystoreService) {

    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });

    this.customerService.$publishAcount.subscribe((data: boolean) => {
      if (data == true) {
        this.email = this.customerService.getAcount() != null ? this.customerService.getAcount().email : '';
      }
    });
  }

  ngOnInit() {
    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });
    this.email = this.customerService.getAcount() != null ? this.customerService.getAcount().email : '';
  }

  ngOnChanges() {
    console.log("HeadComponent")
  }

  onClick() {
    console.log(this.search);
    this.router.navigate(['search'], {queryParams: {"query": this.search}});
  }
}
