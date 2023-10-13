import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FormsModule } from '@angular/forms';
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
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    NgxSlickModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
