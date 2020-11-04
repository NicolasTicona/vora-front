import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailTaskComponent } from '../modals/detail-task/detail-task.component';

@Component({
  selector: 'task',
  templateUrl: './task.component.pug',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  @Input() data: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formatDate(date:string){
    let newDate = new Date(date);
    return `${newDate .getDate()}/${newDate .getMonth()}/${newDate .getFullYear()}`;
  }

  openDetailModal(){
    this.dialog.open(DetailTaskComponent, {
      data:{
        ...this.data
      },
      disableClose: true,
      width: '300px'
    })
  }

  getCountString(count){
    return count == 1 ? `${count} colaborador` : `${count} colaboradores`;
  }

}
