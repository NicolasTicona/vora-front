import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {DashboardService} from '../../services/dashboard.service';
import {EditCreateTaskComponent} from '../modals/edit-create-task/edit-create-task.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.pug',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  tasks: any[] = [];

  constructor(
    private dialog: MatDialog,
    private dashboardSvc: DashboardService) { }

  ngOnInit(): void {
    this.getTasks();

   this.listenUpdates();

  }

  getTasks(){
    const obj = {
      team_id: 4
    }
    
    this.dashboardSvc.getDashboardInfo(obj).subscribe((res: any)  => {
      this.tasks = [...res.response.tasks];
      
    console.log(this.tasks);
      
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
        modalTitle: 'Crear tarea'
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
    })
  }
}
