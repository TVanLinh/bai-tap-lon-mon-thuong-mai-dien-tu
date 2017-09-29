import {Component, ElementRef, OnInit} from "@angular/core";
import {MystoreService} from "../../../service/my-storage.service";
import {Product} from "../../../model/product.model";
declare const jQuery: any;

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {

  constructor(private eleRef: ElementRef, public mylocalStorage: MystoreService) {
  }

  ngOnInit() {

  }


}
