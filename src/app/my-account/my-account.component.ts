import { Component, OnInit, ElementRef } from '@angular/core';
import { Helper } from '../helpers/helper';
import { UserStorageService } from '../services/user-storage.service'
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, NgForm  } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  user: any;
  name: string = '';
  public profilePhoto: string | undefined;
  selectedFile: File | undefined;
  fileInput!: FormGroup;
  constructor(private userData: UserService, private userService: UserStorageService, private helper: Helper, private http: HttpClient, private toastr: ToastrService, private fb: FormBuilder, private el: ElementRef) {}

  ngOnInit():void {
    this.profileData();
    this.user = this.userService.getUserData();
    this.name = this.helper.getName(this.user);
    
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];
    this.uploadProfilePicture();
    event.target.value = null;
  }

  uploadProfilePicture(): void{
    const url = environment.apiBaseUrl;
    if(this.selectedFile) {  
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + token)
      .append('Content-Type', 'multipart/form-data')
      .append('Accept', 'application/json');
       const requestOptions = { headers: headers };

       const formData = new FormData($('.profile-picture-form')[0]);
        const uploadData = new FormData();
        
        // uploadData.append('profileImage', this.selectedFile, this.selectedFile.name);
        uploadData.append('name', 'Bright');
       
       
        // send file to the server
        $.ajax({
          type: "POST",
          url: `${url}/user/upload-profile-picture`,
          data: formData,
          contentType: false,
          processData: false,
          cache: false,
          headers: { Authorization: 'Bearer ' + token },
          success: function(response: any){
            if(response.status_code == 201){
              const filePath = 'https://api.imbapano.com';
              $('.profile-photo').attr('src', (`${response.image}`));
              this.toastr.success("Upload was successful", "Success");
            }
            else{
              alert(response.message);
            }
          },
          error: function(xhr: any, error: any, status: any){
            alert("Something went wrong, please try again");
          }
        })
  
    }
  }

    profileData() {
    this.userData.userData().subscribe(
      (user: any) => {
        this.user = user;
        const profile_photo =user.profile_path;
        this.profilePhoto = (profile_photo == undefined || profile_photo == '') ? './assets/images/avatar.png' : profile_photo;
      },
      (error: any) => {
        // Handle errors here
      }
    );
  }
}
