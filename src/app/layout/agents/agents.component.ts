import { Router } from '@angular/router';
import { LayoutService } from './../layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {
  agents: any[] = [];
  constructor(private service: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents() {
    this.service.getAllAgents().subscribe((response) => {
      if (response.success === true) {
        this.agents = response.data;
      }
    });
  }

  redirectToDetail(id: any): void {
    this.router.navigate(['/agent/' + id]);
  }
}
