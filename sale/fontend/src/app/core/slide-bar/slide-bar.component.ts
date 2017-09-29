import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css']
})
export class SlideBarComponent implements OnInit {
  @Output() openCatalog = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  openProductByCataloy($event: string) {
    this.openCatalog.emit($event);
  }
}
