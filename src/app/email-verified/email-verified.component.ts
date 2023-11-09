import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../services/user-storage.service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss']
})
export class EmailVerifiedComponent {
  user: any;
  modalVisible: boolean = false;
  isLoading: boolean = false;
  phone: any;
  verificationCode: string = '';
  constructor(private userStorageService: UserStorageService, private http: HttpClient, private toastr: ToastrService, private router: Router){}

  ngOnInit(): void {
    this.user = this.userStorageService.getUserData();
  }

   openModal() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (userString !== null) {
        const user = JSON.parse(userString);
        this.phone = JSON.stringify(user.phone);
    }

    
    // console.log(token);
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', 'application/json');
    const data = { phoneNumber: this.phone };
    const requestOptions = { headers: headers };
    this.http.post(`${environment.apiBaseUrl}/auth/phone/token`, data, requestOptions).subscribe((response: any) => {
      if(response.status_code != 200){
        this.toastr.error("Something went wrong, please try again", "Error");
      }
      else{
        this.modalVisible = true;
        this.isLoading = false;
      }
      
    }, (error) => {
      this.isLoading = false;
      this.toastr.error(`Something went wrong, please try again`, "Error");

    })
  }

  closeModal() {
    this.isLoading = false;

    this.modalVisible = false;
  }

  verify(){
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    .set('Content-Type', 'application/json');

    const requestOptions = { headers: headers };
    const data = { otp: this.verificationCode };
    if(this.verificationCode == ''){
      this.toastr.error("Please enter your verification code", "Error");
    }
    else{
       this.http.post(`${environment.apiBaseUrl}/auth/verify/phone/code`, data, requestOptions).subscribe((response: any) => {
      if(response.status_code == 200){
        this.router.navigate(['/']);
      }
      else{
        this.toastr.error(`${response.message}`, "Error");
        this.isLoading = false;
      }
    }, (error) => {
      this.toastr.error("Something went wrong, please try again", "Error");
      this.isLoading = false;
    })
    }
   
  }
}
