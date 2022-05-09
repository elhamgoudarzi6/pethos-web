import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from './../layout.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from './../../auth/local-storage.service';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Galleria } from 'primeng/galleria';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
  providers: [MessageService],
})


export class PropertyDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('galleria') galleria!: Galleria;
  form: FormGroup;
  fullname: any;
  email: any;
  mobile: any;
  message: any;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  galleryFiles: any[] = [];
  vrFiles: any[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  id: any;
  property: any;
  constructor(
    private cd: ChangeDetectorRef,
    private service: LayoutService,
    private localStorage: LocalStorageService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.getProperty();
    this.bindDocumentListeners();
  }

  getProperty() {
    this.service.getProperty(this.id).subscribe((response) => {
      if (response.success === true) {
        this.property = response.data[0];
        if (this.property.gallery.length > 0) {
          this.property.gallery.forEach((element) => {
            this.galleryFiles.push({
              previewImageSrc: 'https://api.pethos.app/' + element.path,
            });
          });
        }

        if (this.property.vr.length > 0) {
          this.property.vr.forEach((element) => {
            this.vrFiles.push({
              previewImageSrc: 'https://api.pethos.app/' + element.path,
            });
          });
        }
      }
    });
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }
    this.cd.detach();
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
      /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
      /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
      /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
    this.cd.detectChanges();
    this.cd.reattach();
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener(
      'mozfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'msfullscreenchange',
      this.onFullScreenListener
    );
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'
      }`;
  }

  submitVisitRequest() {
    if (this.localStorage.getCurrentUser()) {
      let data = {
        status: {
          status: "در انتظار بررسی",
          date:new Date().toLocaleDateString('fa-IR'),
          time:new Date().toLocaleTimeString('fa-IR')
        },
        userID: this.localStorage.userID,
        propertyID:this.id,
        agentID:this.property.agentID,
        date:new Date().toLocaleDateString('fa-IR'),
        time:new Date().toLocaleTimeString('fa-IR'),
      }
      console.log(data)
      this.service
        .addVisitRequest(this.localStorage.userToken, data)
        .subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({
              severity: 'success',
              summary: ' ثبت اطلاعات ',
              detail: 'درخواست بازدید شما با موفقیت ثبت شد.',
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

  addToFavorites() {
    if (this.localStorage.getCurrentUser()) {
      this.form = new FormGroup({
        userID: new FormControl(this.localStorage.userID),
        propertyID: new FormControl(this.id),
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
  redirectToAgentDetail() {
    this.router.navigate(['/agent/' + this.property.agentID]);
  }
}
