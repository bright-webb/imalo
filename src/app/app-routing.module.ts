import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomesComponent } from './buy/sale/homes/homes.component';
import { NewEstateComponent } from './buy/sale/new-estate/new-estate.component';
import { HouseComponent } from './rent/house/house.component'
import { PremiumAdsComponent } from './premium-ads/premium-ads.component';
import { RentalGuideComponent } from './rental-guide/rental-guide.component';
import { BuyersGuideComponent } from './buyers-guide/buyers-guide.component';
import { SellersGuideComponent } from './sellers-guide/sellers-guide.component';
import { DownalodAppComponent } from './downalod-app/downalod-app.component';
import { DetailsComponent } from './details/details.component';
import { UndervelopedComponent } from './underveloped/underveloped.component';
import { HelpComponent } from './help/help.component';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { AffordabilityCalculatorComponent } from './affordability-calculator/affordability-calculator.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationComponent } from './verification/verification.component';
import { AuthGuard } from './helpers/auth.guard';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { VerificationErrorComponent } from './verification-error/verification-error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PreviewPropertyPostComponent } from './preview-property-post/preview-property-post.component';
import { PropertiesComponent } from './account/properties/properties.component';

const routes: Routes = [
      {path: '', component: HomeComponent },
      {path: 'buy/sale/homes', component: HomesComponent},
      {path: 'buy/sale/new-estates', component: NewEstateComponent},
      {path: 'rent/house', component: HouseComponent},
      {path: 'premium-ads', component: PremiumAdsComponent},
      {path: 'rental-guide', component: RentalGuideComponent},
      {path: 'buyers-guide', component: BuyersGuideComponent},
      {path: 'sellers-guide', component: SellersGuideComponent},
      {path: 'download-app', component: DownalodAppComponent},
      {path: 'details', component: DetailsComponent},
      {path: 'buy/underveloped-properties', component: UndervelopedComponent},
      {path: 'help', component: HelpComponent},
      {path: 'login', component: LoginSignUpComponent},
      {path: 'post-a-sale', component: PropertyFormComponent},
      {path: 'affordability-calculator', component: AffordabilityCalculatorComponent},
      {path: 'register', component: SignUpComponent},
      {path: 'verification', component: VerificationComponent, canActivate: [AuthGuard]},
      {path: 'verify/success', component: EmailVerifiedComponent, canActivate: [AuthGuard]},
      {path: 'verify/email/error', component: VerificationErrorComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]},
      {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
      {path: 'post/property/gallery', component: GalleryComponent, canActivate: [AuthGuard]},
      {path: 'post/property/preview', component: PreviewPropertyPostComponent, canActivate: [AuthGuard]},
      {path: 'account/properties', component: PropertiesComponent, canActivate: [AuthGuard]}

  ];

@NgModule({
   imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
