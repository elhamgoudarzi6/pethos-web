import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/auth/local-storage.service';
import { MessageService} from 'primeng/api';
import { LayoutService } from './../../layout.service';
import { FormGroup } from '@angular/forms';
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
  pethos: any[] = [];
  agentLevel: any[] = [];
  subPropertyTypes: any[] = [];
  priceFrom: any;
  priceTo: any;
  form: FormGroup;
  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPropertyTypes();
    this.getTransactionTypes();
  }

  goProperty(transactionTypeID: any, propertyTypeID: any, subPropertyTypeID: any): any {
    this.router.navigateByUrl(
      '/properties/' + transactionTypeID + '/' + propertyTypeID + '/' + subPropertyTypeID
    );
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

  onTypeChange(e: any) {
    this.selectedPropertyType = e.value._id;
    this.subPropertyTypes = e.value.SubPropertyType;
  }

  onSubTypeChange(e: any) {
    this.selectedSubPropertyType = e.value._id;
  }
  onTransactionTypeChange(e: any) {
    this.selectedTransactionType = e.value._id;
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

}