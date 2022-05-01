import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { LayoutService } from './../../layout.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  providers: [MessageService],
})
export class HomeSearchComponent implements OnInit {
  properties: any[] = [];
  propertyTypes: any[] = [];
  propertySubTypes: any[] = [];
  transactionTypes: any[] = [];
  selectedTransactionType: any;
  selectedPropertyType: any;
  selectedSubPropertyType: any;
  priceFrom: any;
  priceTo: any;
  form: FormGroup;
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPropertyTypes();
    this.getTransactionTypes();
  }

  getPropertyTypes(): any {
    this.service.getAllPropertyTypes().subscribe((response) => {
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

  onTypeChange() {
    this.propertySubTypes = this.propertyTypes.find(
      (x) => x._id === this.selectedPropertyType._id
    ).SubPropertyType;
  }

  getTransactionTypes(): any {
    this.service.getAllTransactionTypes().subscribe((response) => {
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

 

  redirectToDetail(id: any): void {
    this.router.navigate(['/property/' + id]);
  }
}