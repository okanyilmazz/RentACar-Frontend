import { ToastrService } from 'ngx-toastr';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SubscribeNewsService } from 'src/app/services/news/news';
@Component({
  selector: 'app-subscribe-news',
  templateUrl: './subscribe-news.component.html',
  styleUrls: ['./subscribe-news.component.css'],
})
export class SubscribeNewsComponent implements OnInit {
  mailIcon = faMailBulk;
  subscribeAddForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private newsService: SubscribeNewsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createSubscribeAddForm();
  }

  createSubscribeAddForm() {
    this.subscribeAddForm = this.formBuilder.group({
      mail: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }

  addMailToSubscribe() {
    if (this.subscribeAddForm.valid) {
      let newsModel = Object.assign({}, this.subscribeAddForm.value);
      this.newsService.add(newsModel).subscribe(
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
      this.toastr.error('Formunuz eksik', 'Dikkat!');
    }
  }
}
