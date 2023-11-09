import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  propertyData: any;
  ngOnInit(): void{
    const propertyData: any = localStorage.getItem('propertyData');
    const property = JSON.parse(propertyData);
    this.propertyData = property;
  }
}
