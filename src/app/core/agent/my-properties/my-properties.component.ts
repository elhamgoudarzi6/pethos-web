import { TokenService } from './../../../auth/token.service';
import { AgentService } from './../agent.service';
import { DialogService } from 'primeng/dynamicdialog';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class MyPropertiesComponent implements OnInit {
  properties: any[];
  statuses: SelectItem[];
  agentConfirm: any;

  constructor(
    private messageService: MessageService,
    private service: AgentService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.statuses = [
      { label: 'رد ', value:false },
      { label: 'تایید ', value:true },
    ];
    this.getProperties();
  }

  getProperties(): any {
    this.service
      .getAllPropertyForAgent(this.localStorage.userToken, this.localStorage.userID)
      .subscribe((response) => {
        if (response.success === true) {
          this.properties = response.data;
        } else {
          this.token.checkTokenExamination(response.data, 'user');
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }


 


  deleteProperty(id: any, image: any, gallery: any, vrFiles: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (image) {
          const filename = image.replace(/^.*[\\\/]/, '');
          this.service.deleteFile({
            path: filename,
          });
        }
        if (gallery.length > 0) {
          gallery.forEach((element) => {
            const galleyFilename = element.replace(/^.*[\\\/]/, '');
            this.service.deleteFile({
              path: galleyFilename,
            });
          });
        }
        if (vrFiles.length > 0) {
          vrFiles.forEach((element) => {
            const vrFilename = element.replace(/^.*[\\\/]/, '');
            this.service.deleteFile({
              path: vrFilename,
            });
          });
        }

        this.service
          .deleteProperty(this.localStorage.userToken, id)
          .subscribe((response) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
              this.getProperties();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: ' حذف اطلاعات ',
                detail: response.data,
              });
            }
          });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      },
    });
  }


  onRowEditSave(id: any) {
    let formData: any;
    formData = {
      'agentConfirm': this.agentConfirm
    }
    this.service
      .updateProperty(this.localStorage.userToken, this.localStorage.userID, formData)
      .subscribe((response) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ویرایش اطلاعات ',
            detail: 'اطلاعات با موفقیت ویرایش شد.'
          });
          this.getProperties();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ویرایش اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  onRowEditInit(status: any){
    this.agentConfirm = status;
  }
}
