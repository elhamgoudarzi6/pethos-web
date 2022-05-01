import { UserService } from './../../user.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-add-by-property',
  templateUrl: './ticket-add-by-property.component.html',
  styleUrls: ['./ticket-add-by-property.component.scss'],
  providers: [MessageService],
})
export class TicketAddByPropertyComponent implements OnInit {
  form: FormGroup;
  properties: any[] = [];
  errorMessages = {
    title: [{ type: 'required', message: 'عنوان را وارد کنید.' }],
    message: [{ type: 'required', message: 'پیام را وارد کنید.' }],
    propertyID: [{type: 'required', message: 'املاک را انتخاب کنید.'}]
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: UserService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getProperties();
  }

  getProperties(): any {
    this.service
      .getAllProperties(this.localStorage.userToken)
      .subscribe((response) => {
        if (response.success === true) {
          this.properties = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  onPropertyChange(e: any) {
    this.form.controls.agentID.setValue(e.value.Agent[0]._id);
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.compose([Validators.required])),
      userID: new FormControl(this.localStorage.userID),
      agentID: new FormControl(null),
      date: new FormControl(null),
      time: new FormControl(null),
      propertyID: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      detail: new FormGroup({
        message: new FormControl(
          null,
          Validators.compose([Validators.required])
        ),
        from: new FormControl('user'),
        to: new FormControl('agent'),
        date: new FormControl(null),
        time: new FormControl(null),
      }),
    });
  }

  submitForm(): void {
    this.form.patchValue({
      date: new Date().toLocaleDateString('fa-IR'),
      time: new Date().toLocaleTimeString('fa-IR'),
      detail: {
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR'),
      },
    });
    this.service
      .addTicket(this.localStorage.userToken, this.form.value)
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
