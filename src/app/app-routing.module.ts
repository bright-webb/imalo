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

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
