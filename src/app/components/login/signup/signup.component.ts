import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.pug',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  @Output() signUp = new EventEmitter();
  showProgress: Boolean = false;
  confirmPassword: FormControl = new FormControl('');
  formSignup: FormGroup;

  constructor(
    private userSvc: UsersService,
    private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    this.formSignup = new FormGroup({
      name: new FormControl('', Validators.required),
      patsurname: new FormControl('', Validators.required),
      matsurname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.checkConfirmPassword();
  }

  checkConfirmPassword(){
    if(this.formSignup.get('password').value != this.confirmPassword.value){
      this.confirmPassword.setErrors({invalid: true});
    }else{
      this.confirmPassword.setErrors({})
      this.confirmPassword.updateValueAndValidity();
    }
  }

  onSignUp(){
    this.showProgress = true;

    this.userSvc.userSignUp(this.formSignup.value).subscribe((res: any) => {
      this.showProgress = false;

      this.signUp.emit(res.response.user);
    }, err => {
      console.log(err);
      this.showProgress = false; 
      this.snackbar.open(err.error.err, '', {
        duration: 2000
      })
    })
  }

  
  get _name(){
    return this.formSignup.get('name');
  }
  get _patsurname(){
    return this.formSignup.get('patsurname');
  }
  get _matsurname(){
    return this.formSignup.get('matsurname');
  }
  get _email(){
    return this.formSignup.get('email');
  }
  get _password(){
    return this.formSignup.get('password');
  }
  get _confirmPass(){
    return this.confirmPassword;
  }

}
