import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'workstation',
  templateUrl: './workstation.component.pug',
  styleUrls: ['./workstation.component.sass']
})
export class WorkstationComponent implements OnInit {

  sidebarOpened: boolean = false;

  constructor(
    private globalSvc: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalSvc.$toggleSidebar.subscribe((res) => {
      this.sidebarOpened = res;
    })
  }

}
