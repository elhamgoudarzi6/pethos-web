import { LayoutService } from './../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss'],
})
export class AgentDetailsComponent implements OnInit {
  fullname: any;
  email: any;
  mobile: any;
  message: any;
  id: any;
  agent: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LayoutService
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.getAgent();
  }

  getAgent() {
    this.service.getAgent(this.id).subscribe((response) => {
      if (response.success === true) {
        this.agent = response.data;
      }
    });
  }
}
