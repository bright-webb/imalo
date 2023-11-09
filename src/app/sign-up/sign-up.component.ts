import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, AbstractControl  } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../models/api-response.model';
import { Router } from '@angular/router';
import * as intlTelInput from 'intl-tel-input';




declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  isLoading: boolean = false;
  form!: FormGroup;
  url: string = environment.apiBaseUrl;
  signUpText: string = "Sign Up";
 constructor(private userService: UserService, private fb: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router, private elRef: ElementRef, private renderer: Renderer2, private spinner: NgxSpinnerService) {
    this.form = new FormGroup({
      userType: new FormControl(''),
      country: new FormControl('')
    });
 }
 ngOnInit(): void {
  this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      middleName: [''],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      file: ['']
    }, { 
      
    });

  }

 ngAfterViewInit() {
    $('.chosen-select').chosen();
    $('.chosen-select-no-single').chosen({ disable_search: true });
    const input = document.querySelector("#phone") as HTMLInputElement;
    const iti = intlTelInput(input, { // initialize itelinput 
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    onlyCountries: false, 
    preferredCountries: ['us', 'gb'], 
    dropdownContainer: document.body
  });

  const countryDropdown = document.querySelector("#country") as HTMLSelectElement;
  iti.promise.then(function () {
    iti.setCountry(iti.getDetectedCountry() || 'us');
    for (const country in iti.getCountryData()) {
      const countryElement = document.createElement("option");
      countryElement.value = iti.getCountryData()[country].iso2;
      countryElement.text = iti.getCountryData()[country].name;
      countryDropdown.appendChild(countryElement);
    }
  });

  countryDropdown.addEventListener("change", function () {
    const countryCode = this.value;
    iti.setCountry(countryCode);
  });

   const flagContainer = this.elRef.nativeElement.querySelector('.iti__flag-container');
    if (flagContainer) {
      this.renderer.setStyle(flagContainer, 'position', 'absolute');
      this.renderer.setStyle(flagContainer, 'top', '37px');
      this.renderer.setStyle(flagContainer, 'left', '5px');
      this.renderer.setStyle(flagContainer, 'z-index', '100');
    }
  }


 onRegister(){
    if(this.form.valid){
      const formData = new FormData();
      for (let key in this.form.value) {
        formData.append(key, this.form.value[key]);
      }
      this.isLoading = true;
      this.signUpText = "";
      this.userService.registerUser(formData).subscribe((response: any) => {
        if(response.status_code != 201){
          this.toastr.error(response.message, "Error");
          this.isLoading = false;
          this.signUpText = "Sign Up";
        }
        else{
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Redirect to another page
          this.router.navigate(['verify/success']);
        }
      },
      (error)=>{
        this.toastr.error("Something went wrong, please try again", "Error");
        console.error(error);
        this.isLoading = false;
        this.signUpText = "Sign Up";
      }
      )
    }
    else{
      
      const controls = this.form.controls;
       this.showErrorIfInvalid('firstName', 'Please enter your first name');
        this.showErrorIfInvalid('lastName', 'Please enter your last name');
        this.showErrorIfInvalidPattern('phoneNumber', '^[0-9]+$', 'Please enter a valid phone number');
        this.showErrorIfInvalid('email', 'Please enter your email');
        this.showErrorIfInvalidEmail('email', 'Please enter a valid email');
        this.showErrorIfInvalid('password', 'Please enter your password');
        this.showErrorIfInvalidMinLength('password', 6, 'Password should be at least 6 characters long');
        this.showErrorIfInvalid('confirmPassword', 'Please confirm your password');
        this.showErrorIfInvalid('userType', "Please select user type");
        this.showErrorIfInvalid('country', "Please select country");
        this.passwordMatch('password', 'confirmPassword');
        // this.showErrorIfInvalid('file', 'Please upload a file');
    }
 }


  handleInputFile(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.form.patchValue({
      file: file
    });
  }
}


showErrorIfInvalid(controlName: string, errorMessage: string) {
    const control = this.form.controls[controlName];
    if (control?.errors && control.errors['required']) {
      this.toastr.error(errorMessage, 'Form Error');
    }
  }

  showErrorIfInvalidPattern(controlName: string, pattern: string, errorMessage: string) {
    const control = this.form.controls[controlName];
    if (control?.errors && (control.errors['required'] || (control.errors['pattern'] && new RegExp(pattern).test(control.value)))) {
      this.toastr.error(errorMessage, 'Form Error');
    }
  }

  showErrorIfInvalidEmail(controlName: string, errorMessage: string) {
    const control = this.form.controls[controlName];
    if (control?.errors && (control.errors['email'] || control.errors['required'])) {
      this.toastr.error(errorMessage, 'Form Error');
    }
  }

  showErrorIfInvalidMinLength(controlName: string, minLength: number, errorMessage: string) {
    const control = this.form.controls[controlName];
    if (control?.errors && (control.errors['required'] || (control.errors['minlength'] && control.errors['minlength'].requiredLength < minLength))) {
      this.toastr.error(errorMessage, 'Form Error');
    }
  }

  passwordMatch(password: string, confirmPassword: string) {
    const control1 = this.form.controls[password].value;
    const control2 = this.form.controls[confirmPassword].value;
    if(control1 !== control2){
      this.toastr.error("Passwords do not match", "Error");
    }
  }
}
