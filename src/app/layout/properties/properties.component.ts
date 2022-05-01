import { FormGroup, FormControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { Router } from '@angular/router';
import { LayoutService } from './../layout.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  providers: [MessageService],
})
export class PropertiesComponent implements OnInit {
  public displayMobileFilter: boolean = false;
  properties: any[] = [];
  page: number = 1;
  pageSize: number = 9;
  total: number = 0;
  transactionTypes: any[] = [];
  selectedtransactionType: any;
  propertyTypes: any[] = [];
  selectedPropertyType: any;
  features: any[] = [];
  selectedFeatures: any[] = [];
  conditions: any[] = [];
  selectedConditions: any[] = [];
  exchanges: any[] = [];
  selectedExchanges: any[] = [];
  hasDiscount: any;
  priceFrom: number;
  priceTo: number;
  form: FormGroup;
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.service.getAllProperties().subscribe((response) => {
      if (response.success === true) {
        this.properties = response.data;
        this.total = this.properties.length;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });

    this.getPropertyTypes();
    this.getExchanges();
    this.getConditions();
    this.getFeatures();
    this.getTransactionTypes();
  }


  getPropertyTypes(): any {
    this.service
      .getAllPropertyTypes()
      .subscribe((response) => {
        if (response.success === true) {
          this.propertyTypes = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getExchanges(): any {
    this.service
      .getAllExchanges()
      .subscribe((response) => {
        if (response.success === true) {
          this.exchanges = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getConditions(): any {
    this.service
      .getAllConditions()
      .subscribe((response) => {
        if (response.success === true) {
          this.conditions = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getFeatures(): any {
    this.service
      .getAllFeatures()
      .subscribe((response) => {
        if (response.success === true) {
          this.features = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  getTransactionTypes(): any {
    this.service
      .getAllTransactionTypes()
      .subscribe((response) => {
        if (response.success === true) {
          this.transactionTypes = response.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' دریافت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

  addToFavorites(id: string) {
    if (this.localStorage.getCurrentUser()) {
      this.form = new FormGroup({
        userID: new FormControl(this.localStorage.userID),
        propertyID: new FormControl(id),
      });

      this.service
        .addFavorite(this.localStorage.userToken, this.form.value)
        .subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({
              severity: 'success',
              summary: ' ثبت اطلاعات ',
              detail: 'ملک مورد نظر به لیست علاقه مندی شما اضافه شد..',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' ثبت اطلاعات ',
              detail: response.data,
            });
          }
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: ' ورود به سایت ',
        detail: 'لطفا ایتدا وارد سایت شوید.',
      });
    }
  }

  redirectToDetail(id: any): void {
    this.router.navigate(['/property/' + id]);
  }

}
