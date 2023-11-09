import { Directive, ElementRef, AfterViewInit, OnDestroy  } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appSlickCarousel]'
})
export class SlickCarouselDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).slick({
      autoplay: false,
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      appendArrows: '.slider-arrows',
      prevArrow: $('.prev-slide'),
      nextArrow: $('.next-slide'),
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

  ngOnDestroy() {
    // Destroy the Slick carousel to prevent memory leaks
    $(this.el.nativeElement).slick('unslick');
  }
}

// DJX-271-35410.