import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsersService } from 'src/app/services/users.service';
import { EditCreateTaskComponent } from '../edit-create-task/edit-create-task.component';

@Component({
  selector: 'detail-task',
  templateUrl: './detail-task.component.pug',
  styleUrls: ['./detail-task.component.sass']
})
export class DetailTaskComponent implements OnInit {

  showProgress = false;
  collaborators: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DetailTaskComponent>,
    private snackbar: MatSnackBar,
    private usersSrv: UsersService,
    private dashboardSrv: DashboardService) { }

  ngOnInit(): void {
    this.getUsersInTask();
  }

  getUsersInTask(){
    this.usersSrv.getUsersInTask(this.data.task_id).subscribe((res:any)=> {
      this.collaborators = [...res.response.users];
    })
  }

  openEditTaskModal(){

    this.dialogRef.close();

    this.dialog.open(EditCreateTaskComponent,{
      data:{
        ...this.data,
        collaborators: this.collaborators,
        modalTitle: 'Editar tarea',
        state: 'ACTUALIZAR'
      },
      width: '300px',
      disableClose: true
    })
  }

  deleteTask(){
    this.showProgress = true;

    console.log("eliminar tarea", this.data.task_id);

    this.dashboardSrv.deleteTask({task_id: this.data.task_id}).subscribe((res: any) => {
      
      this.dashboardSrv.$updateTask.next({
        state: 3,
        task_id: this.data.task_id
      })
      
      this.snackbar.open(res.response.statusMessage, '', {
        duration: 2000
      })

      this.dialogRef.close();
    }, err => {
      console.log(err);
    })

  }

  closeModal(){
    this.dialogRef.close();
  }
}
