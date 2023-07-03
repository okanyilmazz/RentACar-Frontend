
import { Component, OnInit } from '@angular/core';
import { faTwitter,faInstagram,faYoutube,faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})

export class NaviComponent implements OnInit {
  constructor() {}
  searchIcon = faSearch;
  twitterIcon=faTwitter;
  instagramIcon=faInstagram;
  youtubeIcon=faYoutube;
  googlePlusIcon=faGooglePlus;
  cartIcon = faShoppingCart;
  isCollapsed=false;
  ngOnInit(): void {}


}
