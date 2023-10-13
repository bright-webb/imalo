import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageTitleService } from '../../services/page-title.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent {
  carouselImages: string[] = [];
  constructor(private titleService: Title, private pageTitleService: PageTitleService, private ImageService: ImageService){
    this.carouselImages = this.ImageService.getCarouselImages();
  }
  ngOnInit(){
    this.titleService.setTitle('House for rents');
    this.pageTitleService.setPageTitle("Rent Houses");
  }
}
