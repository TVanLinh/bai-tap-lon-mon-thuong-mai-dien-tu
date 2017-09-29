import {Component, ElementRef, OnInit} from '@angular/core';
declare  var jQuery: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private  eleRef: ElementRef) {}

  ngOnInit() {
  }

  toggleNavbar(){
    jQuery(this.eleRef.nativeElement).find('.app-nav').slideToggle();
  }

}
