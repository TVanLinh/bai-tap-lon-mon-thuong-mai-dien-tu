import {Component, ElementRef, OnInit} from "@angular/core";
declare const jQuery: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  showListEntity(target: string) {
    jQuery(this.elementRef.nativeElement).find(target).slideToggle();
  }
}
