import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'imalo';
  loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngOnInit(){
    this.loadScript('../assets/scripts/jquery-3.6.0.min.js');
    this.loadScript('../assets/scripts/custom.js');
    // this.loadScript('../assets/scripts/chosen.min.js');
    // this.loadScript('../assets/scripts/daterangepicker.js');
    // this.loadScript('../assets/scripts/dropzone.js');
    // this.loadScript('../assets/scripts/gmaps_api_v3.min.js');
    // this.loadScript('../assets/scripts/hoverIntent.js');
    // this.loadScript('../assets/scripts/infobox.js');
    // this.loadScript('../assets/scripts/jquery-migrate-3.3.2.min.js');
    // this.loadScript('../assets/scripts/jquery.counterup.min.js');
    // this.loadScript('../assets/scripts/jquery.jpanelmenu.js');
    // this.loadScript('../assets/scripts/magnific-popup.min.js');
    // this.loadScript('../assets/scripts/maps.js');
    // this.loadScript('../assets/scripts/markerclusterer.js');
    // this.loadScript('../assets/scripts/masonry.min.js');
    // this.loadScript('../assets/scripts/mmenu.min.js');
    // this.loadScript('../assets/scripts/moment.js');
    // this.loadScript('../assets/scripts/owl.carousel.min.js');
    // this.loadScript('../assets/scripts/quantityButton.js');
    // this.loadScript('../assets/scripts/rangeSlider.js');
    // this.loadScript('../assets/scripts/slick.min.js');
    // this.loadScript('../assets/scripts/sticky-kit.min.js');
    // this.loadScript('../assets/scripts/switcher.js');
    // this.loadScript('../assets/scripts/tooltips.min.js');
    // this.loadScript('../assets/scripts/waypoints.min.js');
  }
}
