import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  firstName: string;
  lastName: string;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  email: string;
  userId: number = 0;
  settingsSendForm: FormGroup;
  passwordSendForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.getUserId();
    this.createSettingsForm();
    this.createPasswordForm();
  }

  ngOnInit(): void {

  }

  createSettingsForm() {
    this.settingsSendForm = this.formBuilder.group({
      id: [this.userId, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  createPasswordForm() {
    this.passwordSendForm = this.formBuilder.group({
      id: [this.userId, Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required],
    });
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

  update() {
    this.settingsSendForm.patchValue({ id: this.userId });
    let updatedUser = this.settingsSendForm.value;

    this.userService.updateUser(updatedUser).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message);
      }
    });
  }

  updatePassword() {
    if (this.passwordSendForm.valid) {
      let updatePassword = this.passwordSendForm.value;
      console.log(updatePassword);
      this.authService.updatePassword(updatePassword).subscribe(
        (response) => {
        if (response.success) {
          this.toastrService.success(response.message);
        }
        else{
          this.toastrService.warning(response.message)
        }
      });
    }
  }
}
