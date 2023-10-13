import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private carouselImages: string[] = [
      '/assets/images/house1.jpg',
      '/assets/images/house2.jpg',
      '/assets/images/house3.jpg',
      '/assets/images/house4.jpg',
      '/assets/images/house5.jpg',
    ];

  private otherImages: string[] = [
    '/assets/images/house1.jpg',
      '/assets/images/house2.jpg',
      '/assets/images/house3.jpg',
      '/assets/images/house4.jpg',
      '/assets/images/house5.jpg',
    ];

  getCarouselImages(): string[] {
    return this.carouselImages;
  }

  getOtherImages(): string[]{
    return this.otherImages;
  }
}
