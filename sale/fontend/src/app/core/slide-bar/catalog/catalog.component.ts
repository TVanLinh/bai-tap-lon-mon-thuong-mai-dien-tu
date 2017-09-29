import {Component, ElementRef, EventEmitter, OnInit, Output} from "@angular/core";
declare const  jQuery: any;
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @Output() openCatalog = new EventEmitter<string>();

  constructor(private  eleRef: ElementRef) {
  }

  openProductByCatalog(catalogy: string) {
    this.openCatalog.emit(catalogy);
  }

  openMP(target: string,target2:string) {
    jQuery(this.eleRef.nativeElement).find('.'+target).slideToggle();
    jQuery(this.eleRef.nativeElement).find('.'+target2).toggleClass('active-mn');
  }
  ngOnInit() {
  }

}
