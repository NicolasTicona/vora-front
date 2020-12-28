import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'workstation',
  templateUrl: './workstation.component.pug',
  styleUrls: ['./workstation.component.sass']
})
export class WorkstationComponent implements OnInit {

  sidebarOpened: boolean = false;
  sidebarMode: String = 'side'

  constructor(
    private globalSvc: GlobalService
  ) { }

  ngOnInit(): void {

    if(window.innerWidth <= 768){
      this.sidebarMode = 'over';
    }

    this.globalSvc.$toggleSidebar.subscribe((res) => {
      this.sidebarOpened = res;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    if(window.innerWidth <= 768){
      this.sidebarMode = 'over';
    }else{
      this.sidebarMode = 'side';
    }
  }

}
