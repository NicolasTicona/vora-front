import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {TEAM} from 'src/app/models/vora.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'team-detail',
  templateUrl: './team-detail.component.pug',
  styleUrls: ['./team-detail.component.sass']
})
export class TeamDetailComponent implements OnInit {

  collaborators = [];
  teamInfo : TEAM;
  sidebarOpened: boolean = false;
  canToggle: boolean = false;

  constructor(
    private dashboardSvc: DashboardService,
    private globalSvc: GlobalService) { }

  ngOnInit(): void {
    if(window.innerWidth <= 768){
      this.canToggle = true;
    }

    this.dashboardSvc.$obs_collaborators.subscribe(res => {
      this.collaborators = [...res];
    })

    this.dashboardSvc.$obs_teamInfo.subscribe(res => {
      this.teamInfo = res[0];
    })
  }

  onToggleSidebar(){
    this.sidebarOpened = !this.sidebarOpened;
    this.globalSvc.$toggleSidebar.next(this.sidebarOpened)
  }
}
