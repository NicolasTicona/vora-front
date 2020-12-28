import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import {DashboardService} from '../../services/dashboard.service';
import {EditCreateTaskComponent} from '../modals/edit-create-task/edit-create-task.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.pug',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  tasks: any[] = [];
  teamByParam: number;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private dashboardSvc: DashboardService) { }

  ngOnInit(): void {

    this.teamByParam = Number(this.route.snapshot.paramMap.get('id'));

    this.getTasks();
    this.listenUpdates();
  }

  getTasks(){
    const obj = {
      team_id: this.teamByParam
    }
    
    this.dashboardSvc.getDashboardInfo(obj).subscribe((res: any)  => {
      this.tasks = [...res.response.tasks];
      
      let collaborators = [...res.response.users] || [];
      let teamInfo = [...res.response.teamInfo] || [];

      this.dashboardSvc.$collaborators.next(collaborators);
      this.dashboardSvc.$teamInfo.next(teamInfo);

    }, (err) => {
      console.log(err);  
    })
  }

  createTask(){
    const dialogRef = this.dialog.open(EditCreateTaskComponent,{
      data: {
        state: 'ASIGNAR',
        modalTitle: 'Crear tarea',
        team_id: this.teamByParam
      },
      disableClose: true,
      width: "300px"
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){

        console.log(res);

        this.tasks = [res, ...this.tasks];
      }
    })

  }

  listenUpdates(){
    this.dashboardSvc.$obj_updateTask.subscribe((data: any) => {
      if(data.state == 1){

        let {task_updated} = data;

        let index = this.tasks.findIndex(task => task.task_id == task_updated.task_id);
      
        if(index != -1){
          this.tasks[index] = task_updated; 
        }
      }
      
      else if(data.state == 2){
        console.log('JUST REMOVING')
        console.log(data);

        let index = this.tasks.findIndex(task => task.task_id == data.task_id);
      
        if(index != -1){
          this.tasks[index].count_users = data.count_users; 
        }
      }

      else if(data.state == 3){
        this.tasks = this.tasks.filter(task => task.task_id != data.task_id);
      }
    })
  }
}
