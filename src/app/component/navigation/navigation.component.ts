import {
  faTwitter,
  faInstagram,
  faYoutube,
  faGooglePlus,
} from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit } from '@angular/core';

import {
  faBullhorn,
  faCar,
  faHome,
  faSearch,
  faUser,
  faMailBulk,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    if (this.localStorageService.getItem('token') !== null) {
      this.getUserInfo();
      this.firstName = this.localStorageService.getItem('userFirstName');
      this.lastName = this.localStorageService.getItem('userLastName');
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
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
  isSearchCollapsed = true;
  isMenuCollapsed = true;
  isLogin: boolean;
  firstName: string;
  lastName: string;

  ngOnInit(): void {
  }

  signOut() {
    this.localStorageService.removeAll();
    window.location.href = '/home';
    this.refreshPage();
  }
  goToProfilePage() {
    this.router.navigate(['/profile']);
  }
  scroll(id: string) {
    this.isMenuCollapsed = true;
    let el = document.getElementById(id);
    el.scrollIntoView();
  }

  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  getCurrentUrl() {
    const currentUrl = this.router.url;
    this.localStorageService.setItem('lastUrl', currentUrl);
  }

  CheckLoginStatus(){
    if(this.authService.isAuthenticated())
    {
      console.log("giriş yapılmış")
    }
    else{
      console.log("giriş yapılmamış")
    }
  }

  getUserInfo(){
    this.authService.getUserInfo();
  }
}
