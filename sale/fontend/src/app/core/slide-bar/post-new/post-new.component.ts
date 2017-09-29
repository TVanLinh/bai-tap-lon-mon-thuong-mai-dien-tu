import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  list: any[] =[{
    imagePath:'../../../assets/images/post/3462-bieu-hien-cua-da-kho-02-300x225.jpg',
    title:'“Điểm mặt” 8 thủ phạm gây khô da',
    datePost:'19/02/2017'
  },{imagePath:'../../../assets/images/post/3462-bieu-hien-cua-da-kho-02-300x225.jpg',
    title:'“Điểm mặt” 8 thủ phạm gây khô da',
    datePost:'19/02/2017'
    },  {imagePath:'../../../assets/images/post/3462-bieu-hien-cua-da-kho-02-300x225.jpg',
        title:'“Điểm mặt” 8 thủ phạm gây khô da',
        datePost:'19/02/2017'
     }];
  constructor() { }

  ngOnInit() {
  }

}
