import { TokenService } from './../../../auth/token.service';
import { SetVisitDateTimeComponent } from './set-visit-date-time/set-visit-date-time.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AgentService } from './../agent.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-visit-requests',
  templateUrl: './my-visit-requests.component.html',
  styleUrls: ['./my-visit-requests.component.scss'],
  providers: [MessageService, DialogService]
})
export class MyVisitRequestsComponent implements OnInit {

  requests: any[];
  statuses: SelectItem[];
  status: any;
  constructor(
    private messageService: MessageService,
    private service: AgentService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): any {
    this.service
      .getAllVisitRequestsByAgent(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.requests = response.data;
        } else {
          this.token.checkTokenExamination(response.data, 'admin');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  showSetVisitDateTimeDialog(requestId: string): void {
    const ref = this.dialogService.open(SetVisitDateTimeComponent, {
      data: {
        requestId,
      },
      header: 'ثبت تاریخ و زمان بازدید',
      width: '70%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getRequests();
      }
    });
  }


  onRowEditSave(id: any) {
    let formData: any;
    formData = {
      'visited': this.status
    }
    this.service
      .updateStatusRequestProperty(this.localStorage.userToken, this.localStorage.userID, formData)
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ویرایش اطلاعات ',
            detail: 'اطلاعات با موفقیت ویرایش شد.'
          });
          this.getRequests();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ویرایش اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  onRowEditInit(status: any) {
    this.status = status;
  }
}
