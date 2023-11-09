import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  user: any;
  constructor(private userStorageService: UserStorageService){}

  ngOnInit(): void {
    this.user = this.userStorageService.getUserData();
  }
}
