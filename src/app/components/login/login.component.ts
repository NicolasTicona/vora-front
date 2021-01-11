import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  showProgress: boolean = false;
  isLogin: boolean = true;

  constructor(
    private authSvc: AuthService,
    private userSvc: UsersService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  onChangeSignUp(){
    this.isLogin = !this.isLogin;
  }

  onLoginSuccess(user){
    this.authSvc.saveCredentialsOnStorage(user);

    let message = `Bienvenido ${user.fullname}!`;

    this.snackbar.open(message, '', {
      duration: 2000
    })

    this.router.navigate(['/landing']);
  }

  

}
