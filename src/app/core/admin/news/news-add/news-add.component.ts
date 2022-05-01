import { MessageService } from 'primeng/api';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { AdminService } from './../../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss'],
  providers: [MessageService]
})
export class NewsAddComponent implements OnInit {
  form: FormGroup;
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان خبر را وارد کنید.' }],
    brief: [{ type: 'required', message: 'خلاصه خبر را وارد کنید.' }],
    details: [{ type: 'required', message: 'متن خبر را وارد کنید.' }],
    image: [{ type: 'required', message: 'تصویر خبر را آپلود کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.compose([Validators.required])),
      brief: new FormControl(null, Validators.compose([Validators.required])),
      details: new FormControl(null, Validators.compose([Validators.required])),
      keywords: new FormControl(null),
      image: new FormControl(null, Validators.compose([Validators.required])),
      imageDescription: new FormControl(null),
      metaDescription: new FormControl(null),
      tags: new FormControl(null),
      date: new FormControl(null),
    });
  }

  onFileUpload(event): void {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service
    .uploadFile(formData)
      .subscribe((response) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);

          this.messageService.add({
            severity: 'success',
            summary: ' آپلود تصویر محصول ',
            detail: 'تصویر با موفقیت آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' آپلود تصویر محصول ',
            detail: response.data,
          });
        }
      });
  }


  submitForm(): void {
    this.service
      .addNews(this.localStorage.userToken, this.form.value)
      .subscribe((response) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }
}
