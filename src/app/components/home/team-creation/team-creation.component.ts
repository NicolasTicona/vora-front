import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'team-creation',
  templateUrl: './team-creation.component.pug',
  styleUrls: ['./team-creation.component.sass']
})
export class TeamCreationComponent implements OnInit {

  showSpinner: Boolean = false;
  teamName: FormControl;
  filterInput: FormControl;
  collaborators: any[] = [];
  collaboratorsFiltered: any[] = [];
  collaboratorsSelected: any[] = [];

  constructor(
    private userSvc: UsersService,
    private homeSvc: HomeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teamName = new FormControl('', Validators.required);
    this.filterInput = new FormControl();

    this.getCollaborators();
    this.onFilterCollaborators();
  }

  getCollaborators(){
    this.userSvc.getCollaborators().subscribe((res:any) => {
      this.collaborators = res.response.collaborators;
      this.collaboratorsFiltered = [...this.collaborators];
      console.log(this.collaborators)
    }, err => {
      console.log(err);
    })
  }

  onFilterCollaborators(){
    this.filterInput.valueChanges.subscribe(res => {
      this.collaboratorsFiltered = this.collaborators.filter(c => c.fullname.includes(res))
    })
  }

  onSelectionCollaborators(e){
    if(e.option._selected){
      this.collaboratorsSelected.push(e.option._value);
    }else{
      this.collaboratorsSelected = this.collaboratorsSelected.filter(c => c != e.option._value);
    }
  }

  onConfirmCreation(){

    this.showSpinner = true;
    let teamObj = {
      name: this.teamName.value,
      collaborators: this.collaboratorsSelected
    }

    this.homeSvc.createTeam(teamObj).subscribe((res: any) => {
      console.log(res);
      this.showSpinner = false;
      setTimeout(() => {
        this.router.navigateByUrl(`/landing/${res.response.teamID}`)
      }, 2000)
    }, err => {
      console.log(err);
      this.showSpinner = false;
    })
  }

  isSelected(id){
    return this.collaboratorsSelected.includes(id);
  }

}
