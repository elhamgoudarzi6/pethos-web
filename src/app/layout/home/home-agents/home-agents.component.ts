import { LayoutService } from './../../layout.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-agents',
  templateUrl: './home-agents.component.html',
  styleUrls: ['./home-agents.component.scss'],
})
export class HomeAgentsComponent implements OnInit {
  agents: any[] = [];
  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    margin: 10,
    navText: [
      '<i class="fa fa-chevron-left fa-2x"></i>',
      '<i class="fa fa-chevron-right fa-2x"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };
  constructor(private service: LayoutService) {}
  ngOnInit(): void {
    this.getAgents();
  }

  getAgents() {
    this.service.getAllAgents().subscribe((response) => {
      if (response.success === true) {
        this.agents = response.data;
        console.log(this.agents);

      }
    });
  }
}
