import { Directive, ElementRef, AfterViewInit, OnDestroy  } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appSlider]'
})
export class SliderDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).slick({
      autoplay: false,
      dots: false,
      arrows: true,
      slidesToShow: 1,
      centerMode: true,
      slidesToScroll: 1,
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
