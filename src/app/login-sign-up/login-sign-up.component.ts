import { Component, OnInit, ChangeDetectorRef, NgZone   } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.scss']
})
export class LoginSignUpComponent {
  isLoading: boolean = false;
  form!: FormGroup;
  loginText: string = "Login";
  url: string = environment.apiBaseUrl;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  user$: Observable<any> = this.userSubject.asObservable();
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private fb: FormBuilder, private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
  }

  onLogin() {
    if(this.form.valid){
      this.isLoading = true;
      this.loginText = '';
      const formData = new FormData();
      for(let key in this.form.value){
        formData.append(key, this.form.value[key]);
      }
      this.userService.loginUser(formData).subscribe((response: any) => {
        if(response.status_code != 201){
          this.toastr.error(response.message, "Error");
          this.isLoading = false;
          this.loginText = 'Login';
        }
        else{
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.isLoggedInSubject.next(true);
          this.userSubject.next(response.user);
          this.changeDetectorRef.detectChanges();
          window.location.href="my-account";
          
        }
      }, (error) => {
        this.toastr.error("Something went wrong, please try again", "Error")
        this.changeDetectorRef.detectChanges();
        this.isLoading = false;
        this.loginText = 'Login';
      })
    }
    else{
      this.toastr.error("Please fill out all fields");
    }
  }
}
