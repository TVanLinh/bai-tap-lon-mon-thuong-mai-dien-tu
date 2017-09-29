import {Component, OnDestroy, OnInit} from "@angular/core";


import {Subscription} from "rxjs/Subscription";
import {ShoppingService} from "../../service/shopping.service";


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private  shopService: ShoppingService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
