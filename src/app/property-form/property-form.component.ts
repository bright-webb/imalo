import { Component, ElementRef, ViewChild, AfterViewInit, NgZone, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../services/user-storage.service';
import { Helper } from '../helpers/helper';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent {
  zoom: number = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  propertyForm!: FormGroup;
  isLoading: boolean = false;
  url: string = environment.apiBaseUrl;
  buttonText: string = "Next";

  constructor(private ngZone: NgZone, private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private userService: UserStorageService, private helper: Helper, private router: Router) {}
   ngOnInit() {
    this.propertyForm = this.fb.group({
      propertyTitle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      propertyRequest: ['', Validators.required],
      propertyCategory: ['', Validators.required],
      price: ['', Validators.required],
      propertySquareMetre: ['', Validators.required],
      distressDeal: ['', Validators.required],
      easyAccessRoad: [false],
      tarredRoad: [false],
      tightSecurity: [false],
      cctv: [false],
      constantPowerSupply: [false],
      roomsEnSuite: [false],
      popCeilings: [false],
      swimmingPool: [false],
      largeLivingRoom: [false],
      spaciousRooms: [false],
      wellDesignedKitchen: [false],
      enoughParkingSpace: [false],
      wardrobe: [false],
      interLockedCompound: [false],
      sereneEnvironment: [false],
      waterHeater: [false],
      others: [false],
      propertyDescription: ['', Validators.required],
      province: ['', Validators.required],
      area: ['', Validators.required],
      closestLandmark: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      alternativePhoneNumber: ['', Validators.required],
    })
  }

   onSubmit() {
        if(this.propertyForm.valid){
          // set header data
          this.buttonText = '';
          this.isLoading = true;
          const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.helper.getToken())
          .set('Content-Type', 'application/json');
          const formData = new FormData();
          for (let key in this.propertyForm.value) {
            formData.append(key, this.propertyForm.value[key]);
          }

          // send form data
          this.http.post(`${environment.apiBaseUrl}/new/property`, this.propertyForm.value, {headers}).subscribe((response: any) => {
          if(response.status_code == 201){
            localStorage.setItem('propertyData', JSON.stringify(response.data));
            this.router.navigate(['/post/property/gallery']);
          }
          else{
            this.toastr.error(response.message, "Error")
            this.buttonText = 'Next';
            this.isLoading = false;
          }
          }, (error: any) => {
            this.toastr.error("An unknown error has occured, please try again");
            this.buttonText = 'Next';
            this.isLoading = false;
          })
        }
        else{
          const controls = this.propertyForm.controls;

          // verify form data
          this.helper.showErrorIfInvalid(this.propertyForm, 'propertyTitle', 'Please provide title of your property');
          this.helper.showErrorIfInvalidMinLength(this.propertyForm, 'propertyTitle', 3, 'Please enter at least three characters');
          this.helper.showErrorIfInvalidMaxLength(this.propertyForm, 'propertyTitle', 30, 'Property title must not not exceed 30 characters');
      
          this.helper.showErrorIfInvalid(this.propertyForm, 'propertyRequest', 'Please select property request');
          this.helper.showErrorIfInvalid(this.propertyForm, 'propertyCategory', 'Please select category');
          this.helper.showErrorIfInvalid(this.propertyForm, 'price', 'Please enter price');
          this.helper.showErrorIfInvalid(this.propertyForm, 'propertySquareMetre', 'Please select property square metre');
          this.helper.showErrorIfInvalid(this.propertyForm, 'distressDeal', 'Please select distress deal');
          this.helper.showErrorIfInvalid(this.propertyForm, 'propertyDescription', 'Please enter property Description');
          this.helper.showErrorIfInvalid(this.propertyForm, 'closestLandmark', 'Please enter closest landmark');
          this.helper.showErrorIfInvalid(this.propertyForm, 'address', 'Please enter address');
          this.helper.showErrorIfInvalid(this.propertyForm, 'phoneNumber', 'Please enter phone number');
          this.helper.showErrorIfInvalid(this.propertyForm, 'alternativePhoneNumber', 'Please provide alternative phone number');
        }
    }

    onLocationInput(value: string) {
      if (value) {
        // Implement the logic to handle the user's input, such as using Google Maps Autocomplete API
        console.log(value); // Use the value to query the Google Places API and handle the response accordingly
      }
    }



  }

