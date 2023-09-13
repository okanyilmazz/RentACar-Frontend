import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditScore } from 'src/app/models/credit-score/creditScore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreditScoreService } from 'src/app/services/credit-score/credit-score.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private creditScoreService: CreditScoreService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          this.localStorageService.setItem('token', response.data.token);
          this.toastrService.success('Tebrikler! başarıyla kayıt olundu.');
          this.authService.getUserInfo();

          /*Add default credit score */
          let creditScore: CreditScore = {
            id: 0,
            score: 100,
            userId: this.localStorageService.getItem('userId'),
          };
          this.addCreditScore(creditScore);
          /*end region */

          this.router.navigate(['home']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Tüm alanları doldurmalısınız.');
    }
  }
  addCreditScore(creditScore: CreditScore) {
    this.creditScoreService.add(creditScore).subscribe(response=>{
      
    })
  }
}
