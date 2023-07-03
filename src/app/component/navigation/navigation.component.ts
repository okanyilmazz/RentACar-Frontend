import {
  faTwitter,
  faInstagram,
  faYoutube,
  faGooglePlus,
} from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit, Inject } from '@angular/core';
import {
  NgxPageScrollCoreModule,
  PageScrollService,
} from 'ngx-page-scroll-core';

import {
  faBullhorn,
  faCar,
  faHome,
  faInfo,
  faMapPin,
  fas,
  faSearch,
  faUser,
  faMailBulk,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor() {}
  searchIcon = faSearch;
  homeIcon = faHome;
  carIcon = faCar;
  bullhornIcon = faBullhorn;
  mailIcon = faMailBulk;
  rightArrowIcon = faAngleRight;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  youtubeIcon = faYoutube;
  googlePlusIcon = faGooglePlus;
  userIcon = faUser;

  isLogin = true;
  isSearchCollapsed = true;
  isMenuCollapsed = true;
  ngOnInit(): void {}

  login() {
    this.isLogin = false;
  }
  signOut() {
    this.isLogin = true;
  }

  scroll(id: string) {
    this.isMenuCollapsed = true;
    let el = document.getElementById(id);
    el.scrollIntoView();
  }
}
