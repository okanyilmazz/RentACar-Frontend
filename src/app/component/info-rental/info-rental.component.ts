
import { Component } from '@angular/core';
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faBinoculars, faCar, faWater } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-info-rental',
  templateUrl: './info-rental.component.html',
  styleUrls: ['./info-rental.component.css']
})

export class InfoRentalComponent{

  youtubeIcon = faYoutube;
   carIcon = faCar;
  //  pinIcon = faLocationDot;
   cleanIcon = faWater;
  //  supportIcon = faMessage;
  //  insuranceIcon = faCarBurst;
   carsIcon = faBinoculars;

  constructor() {

  }

  ngOnInit(): void {

  }

}
