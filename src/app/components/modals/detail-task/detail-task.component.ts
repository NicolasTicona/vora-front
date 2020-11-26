import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private usersSrv: UsersService) { }

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

  formatDate(date:string){
    let newDate = new Date(date);
    return `${newDate .getDate()}/${newDate .getMonth()}/${newDate .getFullYear()}`;
  }

  closeModal(){
    this.dialogRef.close();
  }
}
