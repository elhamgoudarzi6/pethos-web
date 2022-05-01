import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-requests',
  templateUrl: './visit-requests.component.html',
  styleUrls: ['./visit-requests.component.scss'],
  providers: [MessageService]
})
export class VisitRequestsComponent implements OnInit {

  requests: any[];

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): any {
    this.service
      .getAllVisitRequests(this.localStorage.userToken)
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

}
