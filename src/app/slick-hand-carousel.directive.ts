import { Directive, ElementRef, AfterViewInit } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appSlickHandCarousel]'
})
export class SlickHandCarouselDirective  implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).slick({
      autoplay: true,
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      centerMode: true,
      variableWidth: true,
      responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Display 2 columns per slide on screens less than 768px wide
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Display 1 column per slide on screens less than 480px wide
        }
      }
    ]
    });
  }
}
