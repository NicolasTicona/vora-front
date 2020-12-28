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

  showProgress: Boolean = false;
  formLogin: FormGroup;

  constructor(
    private authSvc: AuthService,
    private userSvc: UsersService,
    private snackbar: MatSnackBar,
    private router: Router) { }

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

      console.log(res.response.user);

      this.authSvc.saveCredentialsOnStorage(res.response.user);

      let message = `Bienvenido ${res.response.user.fullname}!`;
      this.snackbar.open(message, '', {
        duration: 2000
      })

      this.router.navigate(['/landing']);
    }, err => {
      console.log(err);
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
