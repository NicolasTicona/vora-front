import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.pug',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  @Output() logIn = new EventEmitter();
  showProgress: Boolean = false;
  formLogin: FormGroup;

  constructor(
    private userSvc: UsersService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLogIn(){
    this.showProgress = true;

    this.userSvc.userLogIn(this.formLogin.value).subscribe((res: any) => {
      this.showProgress = false;

      this.logIn.emit(res.response.user);
    }, err => {
      this.showProgress = false; 
      this.snackbar.open(err.error.err, '', {
        duration: 2000
      })
    })
  }

  get _email(){
    return this.formLogin.get('email');
  }

  get _password(){
    return this.formLogin.get('password');
  }

}
