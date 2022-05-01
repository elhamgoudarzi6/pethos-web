import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { AdminService } from './../../admin.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.scss'],
  providers: [MessageService]
})
export class TicketReplyComponent implements OnInit {
  form: FormGroup;
  errorMessages = {
    message: [{ type: 'required', message: 'پیام را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      message: new FormControl(null, Validators.compose([Validators.required])),
      from: new FormControl('agent'),
      to: new FormControl('user'),
      date: new FormControl(),
      time: new FormControl(),
    });
  }

  submitForm(): void {
    this.form.patchValue({
      date: new Date().toLocaleDateString('fa-IR'),
      time: new Date().toLocaleTimeString('fa-IR'),
    });
    this.service
      .replyTicket(this.localStorage.userToken,this.config.data.ticketId, this.form.value)
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
