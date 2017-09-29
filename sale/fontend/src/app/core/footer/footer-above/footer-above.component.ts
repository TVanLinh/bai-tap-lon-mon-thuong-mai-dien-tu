import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-above',
  templateUrl: './footer-above.component.html',
  styleUrls: ['./footer-above.component.css']
})
export class FooterAboveComponent implements OnInit {

  constructor() { }
  list: any[] =[{
    title:"MIỄN PHÍ VẬN CHUYỂN",
    classItem:"fa fa-truck",
    infor:"Miễn phí vận chuyển các tỉnh nội thành Hà Nội & TP. HCM"
  },
    {
      title:"ĐỔI TRẢ TRONG VÒNG 24H",
      classItem:"fa fa-calendar",
      infor:"Miễn phí vận chuyển các tỉnh nội thành Hà Nội & TP. HCM"
    },
    {
      title:"UY TÍN HÀNG ĐẦU",
      classItem:"fa fa-cogs",
      infor:"Miễn phí vận chuyển các tỉnh nội thành Hà Nội & TP. HCM"
    },
    {
      title:"TƯ VẤN MIỄN PHÍ 24/7",
      classItem:"fa fa-phone",
      infor:"Miễn phí vận chuyển các tỉnh nội thành Hà Nội & TP. HCM"
    }
  ];
  ngOnInit() {
  }

}
