import {Component, ElementRef, OnInit} from "@angular/core";
declare const jQuery: any;
@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit() {
    this.initSlider();
  }

  private initSlider() {
    jQuery(this.eleRef.nativeElement).find('.regular').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear'
    });
  }
}
