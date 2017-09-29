import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Page} from "../../../model/page.model";
import {Subject} from "rxjs/Subject";
import {Data, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: Page;
  @Input() totalList: number;
  @Input() param: string;
  @Input() url: string;
  subject: Subject<any> = new Subject<any>();

  @Output() pageNextURL = new EventEmitter<string>();

  constructor(private router: Router,private  productService: ProductService) {
  }

  ngOnInit() {

  }



  initArray(total: number, start: number, end: number) {
    return Array(total).fill(start, end).map((x, a) => a);
  }

  onClick(data: any, url:string[]) {
    // console.log(data);
    this.productService.subject.next(data);
    this.router.navigate(url);
    console.log(url);
  }

  nextPage(url) {
    this.pageNextURL.next(url);
  }
}
