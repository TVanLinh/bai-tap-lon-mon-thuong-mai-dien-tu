import {Component, OnChanges, OnInit} from "@angular/core";
import {ShoppingService} from "../../../service/shopping.service";
import {MystoreService} from "../../../service/my-storage.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit, OnChanges {
  dateNow = Date.now();
  amount: number = this.shopService.getAmountAllIngredient(this.myStorageService.getItem(MystoreService.SHOP_LIST)) | 0;

  constructor(private shopService: ShoppingService, private  myStorageService: MystoreService) {
    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });
  }

  ngOnInit() {
    this.shopService.countShopChange.subscribe((data: number) => {
      this.amount = data;
    });
  }

  ngOnChanges() {
    console.log("HeadComponent")
  }

}
