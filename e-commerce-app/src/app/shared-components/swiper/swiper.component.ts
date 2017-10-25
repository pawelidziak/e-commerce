import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {

  images = [
    '../../../assets/slides/1.png',
    '../../../assets/slides/2.jpg',
    '../../../assets/slides/3.png',
  ];
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 2
  };

  constructor() { }

  ngOnInit() {
  }

}
