import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  
  saveCredentialsOnStorage(user){
    localStorage.clear();
    localStorage.setItem('userLogged', JSON.stringify(user));
  }

  isLogged(){
    return localStorage.getItem('userLogged') ? true : false;
  }

  getUserInSession(){
    if(localStorage.getItem('userLogged')){
      return JSON.parse(localStorage.getItem('userLogged'));
    }
  }

  closeSession(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
