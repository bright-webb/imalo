import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { SliderDirective } from '../directives/slider.directive';

@Component({
  selector: 'app-preview-property-post',
  templateUrl: './preview-property-post.component.html',
  styleUrls: ['./preview-property-post.component.scss']
})
export class PreviewPropertyPostComponent {
  isLoading: boolean = true;
  showError: boolean = true;
  propertyData: any;
  propertyImages: any;
  propertyFeatures: any;
  constructor(private http: HttpClient, private toastr: ToastrService){};

  ngOnInit(): void{
    const property: any = localStorage.getItem('propertyData');
    let propertyData: any;
    if (property) {
      propertyData = JSON.parse(property);
      const property_id: any = propertyData.property_id;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Content-Type', 'application/json');
      const requestOptions = { headers: headers };
      this.http.get(`${environment.apiBaseUrl}/property/${property_id}`, requestOptions).subscribe((response: any) => {
      if(response.status_code != 200){
        this.toastr.error("Something went wrong, please try again", "Error");
      }
      else{
        this.isLoading = false;
        this.propertyData = response.data;
        this.propertyImages = response.images;
        this.showError = false;
        const baseUrl = "https://api.imbapano.com/"
        for (let image of response.images) {
          image.image_path = baseUrl + image.image_path;
        }
        this.propertyImages = response.images;
        this.propertyFeatures = response.propertyFeatures;

        
      }
      
    }, (error) => {
      this.isLoading = false;
      this.toastr.error(`Something went wrong, please try again`, "Error");

    })
      }

  }


}
