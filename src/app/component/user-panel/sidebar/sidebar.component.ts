import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreditScoreService } from 'src/app/services/credit-score/credit-score.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string;
  userId: number = 0;
creditScore:number;

  blogStyle: string;
  homeStyle: string;
  projectStyle: string;
  projectTypeStyle: string;
  messagesStyle: string;
  isMessageCollapsed: boolean = false;
  offerCount: number;
  offerByFilterBg: string;
  offerBg: string;
  currentDate: Date = new Date();
  transformCurrentDate: string;
role:string="Admin";
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService:LocalStorageService,
    private creditScoreService:CreditScoreService  
  ) {
  
  }

  ngOnInit(): void {
    this.getUserId();
    this.getUserCreditScore(this.userId);
  }

  logOut() {
    this.localStorageService.removeAll()
    this.router.navigate(['/home']);
  }

  getBg(url: any) {
    if (url.includes('/project-operations')) {
      this.projectStyle = '#0d6efd';
      this.blogStyle = 'transparent';
      this.homeStyle = 'transparent';
      this.projectTypeStyle = 'transparent';
      this.messagesStyle = 'transparent';
    } else if (url.includes('/blog-operations')) {
      this.projectStyle = 'transparent';
      this.blogStyle = '#0d6efd';
      this.homeStyle = 'transparent';
      this.messagesStyle = 'transparent';
      this.projectTypeStyle = 'transparent';
    } else if (url.includes('/project-type-operations')) {
      this.projectStyle = 'transparent';
      this.blogStyle = 'transparent';
      this.homeStyle = 'transparent';
      this.projectTypeStyle = '#0d6efd';
      this.messagesStyle = 'transparent';
    } else if (url.includes('/messages')) {
      this.projectStyle = 'transparent';
      this.blogStyle = 'transparent';
      this.homeStyle = 'transparent';
      this.projectTypeStyle = 'transparent';
      this.messagesStyle = '#0d6efd';
    } else if (url.includes('/offers')) {
      this.projectStyle = 'transparent';
      this.blogStyle = 'transparent';
      this.homeStyle = 'transparent';
      this.projectTypeStyle = 'transparent';
      this.messagesStyle = 'transparent';
    } else {
      this.projectStyle = 'transparent';
      this.blogStyle = 'transparent';
      this.homeStyle = '#0d6efd';
      this.projectTypeStyle = 'transparent';
      this.messagesStyle = 'transparent';
    }
  }

  goToMessages() {
    this.router.navigate(['/profile/messages']);
  }

  goToSettingsPage(){
    this.router.navigate(['/profile']);
  }
  getMessages() {}

  getOffersByFilter() {
    // this.offerService.getAllOffer().subscribe((response) => {
    //   this.offers = response.data.filter((o) => o.isActive === false).slice(-5);
    // });
    // this.offerByFilterBg = 'background-color:#818896;color:#fff;';
    // this.offerBg = 'background-color:transparent;color:#212529';
  }
  getOffers() {
    // this.offerService.getAllOffer().subscribe((response) => {
    //   this.offerCount = response.data.filter(
    //     (o) => o.isActive === false
    //   ).length;
    //   this.offers = response.data;
    //   this.myevent.emit({ offer: this.offers});
    // });
    // this.offerByFilterBg = 'background-color:transparent;color:#212529';
    // this.offerBg = 'background-color:#818896;color:#fff;';
  }

  isReadNotification(isActive: any) {
    if (isActive) {
      return 'none';
    } else {
      return 'block';
    }
  }

  markAsReadNotification(offerId: number) {
    // this.transformCurrentDate = this.transformDate(this.currentDate);
    // this.offerService.getOfferById(offerId).subscribe((response) => {
    //   const updatedOffer = response.data;
    //   if (updatedOffer.isActive === false) {
    //     updatedOffer.isActive = true;
    //     this.offerService.updateOffer(updatedOffer).subscribe(
    //       (response) => {
    //         if (response.success) {
    //           this.getOffers();
    //         }
    //       },
    //       (responseError) => {
    //         if (responseError.error.Errors.length > 0) {
    //           for (let i = 0; i < responseError.error.Errors.length; i++) {
    //             this.toastrService.error(
    //               responseError.error.Errors[i].ErrorMessage,
    //               'Doğrulama Hatası'
    //             );
    //           }
    //         }
    //       }
    //     );
    //   }
    // });
  }
  goToAllOffers() {
    // this.router.navigate(['/bk-panel/offers']);
  }

  transformDate(date: any) {
    // return this.datePipe.transform(date, 'dd.MM.yyyy', this.locale);
  }


  getUserCreditScore(userId:number){
    this.creditScoreService.getScoreByUserId(userId).subscribe(response=>{
      this.creditScore = response.data.score
    })
  }
  getUserId() {
    let userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userId = userInfo.id;
      this.getUserInfoById(this.userId);
    }
  }

  getUserInfoById(userId: number) {
    this.userService.getUserById(userId).subscribe((response) => {
      this.firstName = response.data.firstName;
      this.lastName = response.data.lastName;
      this.email = response.data.email;
    });
  }
}
