import { Directive, ElementRef, AfterViewInit } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appArticleCarousel]'
})
export class ArticleCarouselDirective {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    $(this.el.nativeElement).slick({
      autoplay: false,
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      appendArrows: '.slider-arrows',
      prevArrow: $('.prev-article-slide'),
      nextArrow: $('.next-article-slide'),
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, 
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, 
        }
      }
    ]
    });
  }

}
