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

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}
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
  userId: number;

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.getUserId();
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('paymentDetails');
    localStorage.removeItem('driverDetails');
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('newRental');
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
    localStorage.setItem('lastUrl', currentUrl);
  }
  getUserId() {
    let userInfo = this.authService.getUserInfo();
    this.userId = userInfo.id;
    this.getUserInfoById(this.userId);
  }

  getUserInfoById(userId: number) {
    this.userService.getUserById(userId).subscribe((response) => {
      this.firstName=response.data.firstName
      this.lastName=response.data.lastName
    });
  }
}
