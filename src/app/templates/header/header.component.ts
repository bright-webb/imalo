import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../services/auth-guard.service';
import { UserStorageService } from '../../services/user-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  public profilePhoto: string | undefined;
  user: any;
  constructor(private auth: AuthGuardService, private userService: UserStorageService) {}
  ngOnInit():void {
   if (this.auth.isAuthenticated()) {
      this.isLoggedIn = true;
      const user = this.userService.getUserData();
      const profile_photo = user.profile_path;
      this.profilePhoto = (profile_photo == undefined || profile_photo == '') ? './assets/images/avatar.png' : profile_photo;
      this.user = user;
      console.log(profile_photo);
    }
  }

  public logout(): void {
    this.auth.logout();
  }
}
