import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomesComponent } from './buy/sale/homes/homes.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { NewEstateComponent } from './buy/sales/new-estate/new-estate.component';
import { HouseComponent } from './rent/house/house.component';
import { PageHeaderComponent } from './templates/page-header/page-header.component';
import { SidebarComponent } from './templates/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSlickModule } from 'ngx-simple-slick';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselDirective } from './slick-carousel.directive';
import { ShufflePipe } from './pipes/shuffle.pipe';
import { SlickHandCarouselDirective } from './slick-hand-carousel.directive';
import { ArticleCarouselDirective } from './article-carousel.directive';
import { PremiumAdsComponent } from './premium-ads/premium-ads.component';
import { RentalGuideComponent } from './rental-guide/rental-guide.component';
import { BuyersGuideComponent } from './buyers-guide/buyers-guide.component';
import { SellersGuideComponent } from './sellers-guide/sellers-guide.component';
import { DownalodAppComponent } from './downalod-app/downalod-app.component';
import { DetailsComponent } from './details/details.component';
import { UndervelopedComponent } from './underveloped/underveloped.component';
import { HelpComponent } from './help/help.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
import { AffordabilityCalculatorComponent } from './affordability-calculator/affordability-calculator.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DropzoneDirective } from './dropzone.directive';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'; 
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { VerificationComponent } from './verification/verification.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { VerificationErrorComponent } from './verification-error/verification-error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AccountSidebearComponent } from './account-sidebear/account-sidebear.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { PreviewPropertyPostComponent } from './preview-property-post/preview-property-post.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SliderDirective } from './directives/slider.directive';
import { PropertiesComponent } from './account/properties/properties.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomesComponent,
    HeaderComponent,
    FooterComponent,
    NewEstateComponent,
    HouseComponent,
    PageHeaderComponent,
    SidebarComponent,
    NavBarComponent,
    SlickCarouselDirective,
    ShufflePipe,
    SlickHandCarouselDirective,
    ArticleCarouselDirective,
    PremiumAdsComponent,
    RentalGuideComponent,
    BuyersGuideComponent,
    SellersGuideComponent,
    DownalodAppComponent,
    DetailsComponent,
    UndervelopedComponent,
    HelpComponent,
    PropertyFormComponent,
    LoginSignUpComponent,
    AffordabilityCalculatorComponent,
    SignUpComponent,
    DropzoneDirective,
    VerificationComponent,
    EmailVerifiedComponent,
    VerificationErrorComponent,
    DashboardComponent,
    MyAccountComponent,
    AccountSidebearComponent,
    ChangePasswordComponent,
    PreviewPropertyPostComponent,
    GalleryComponent,
    SliderDirective,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxSlickModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    LoadingBarModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    NgxSpinnerModule,
    IntlInputPhoneModule,
    GoogleMapsModule,
    
    
  ],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
