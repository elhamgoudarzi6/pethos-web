import { LocalStorageService } from './../../../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-mobile-top-header',
  templateUrl: './mobile-top-header.component.html',
  styleUrls: ['./mobile-top-header.component.scss'],
})
export class MobileTopHeaderComponent implements OnInit {
  items: MenuItem[] = [];
  isLogged = false;
  public displayMobileMenu: boolean = false;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.getCurrentUser()) {
      this.isLogged = true;
    }

    this.items = [
      {
        label: 'صفحه اصلی',
        command: (event) => this.router.navigate(['/']),
      },
      {
        label: 'املاک',
        command: (event) => this.router.navigate(['/properties']),
      },
      {
        label: 'مشاوران',
        command: (event) => this.router.navigate(['/agents']),
      },
      {
        label: 'اخبار',
        command: (event) => this.router.navigate(['/news']),
      },
      {
        label: 'سوالات متداول',
        command: (event) => this.router.navigate(['/faqs']),
      },
      {
        label: 'شرایط و ضوابط',
        command: (event) => this.router.navigate(['/terms']),
      },
      {
        label: 'درباره ما',
        command: (event) => this.router.navigate(['/about']),
      },
      {
        label: 'تماس با ما',
        command: (event) => this.router.navigate(['/contact']),
      },
    ];

    var mobile = window.document.getElementById('mobile-fixed')!;
    var mobileSticky = 0;
    if (mobile !== null) {
      mobileSticky = mobile.offsetTop;
    }

    window.addEventListener('scroll', scroll, true);

    function scroll() {
      if (mobile !== undefined) {
        if (window.pageYOffset > mobileSticky) {
          mobile.classList.add('sticky');
        } else {
          mobile.classList.remove('sticky');
        }
      }
    }
  }
}
