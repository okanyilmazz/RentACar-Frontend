import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faInbox, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  userIcon = faUser;
  mailIcon = faMailBulk;
  subjectIcon = faInbox;
  contactSendForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createContactSendForm();
  }

  createContactSendForm() {
    this.contactSendForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      mail: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendContactMessage() {
    if (this.contactSendForm.valid) {
      let contactModel = Object.assign({}, this.contactSendForm.value);
      this.contactService.add(contactModel).subscribe(
        (response) => {
          this.toastr.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastr.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastr.error('Gerekli alanları doldurmalısınız', 'Dikkat!');
    }
  }
}
