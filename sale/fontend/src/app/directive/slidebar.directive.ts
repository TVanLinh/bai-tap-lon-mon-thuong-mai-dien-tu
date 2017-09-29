import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector:'[slide-bar-directive]'
})
export class SlideBarDirective {

  constructor(private eleRef: ElementRef) {

  }

  @HostListener('click') onClick() {
    this.eleRef.nativeElement.style.color = '#c91d67';
  }
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.eleRef.nativeElement.style.color = '#000';
  // }
}
