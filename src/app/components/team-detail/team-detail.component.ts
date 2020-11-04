import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {TEAM} from 'src/app/models/vora.model';

@Component({
  selector: 'team-detail',
  templateUrl: './team-detail.component.pug',
  styleUrls: ['./team-detail.component.sass']
})
export class TeamDetailComponent implements OnInit {

  collaborators = [];
  teamInfo : TEAM;

  constructor(
    private dashboardSvc: DashboardService) { }

  ngOnInit(): void {
    this.dashboardSvc.$obs_collaborators.subscribe(res => {
      this.collaborators = [...res];
    })

    this.dashboardSvc.$obs_teamInfo.subscribe(res => {
      this.teamInfo = res[0];
    })
  }

}
