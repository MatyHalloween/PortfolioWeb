import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(usuario:string, password: string) : boolean{
    if (usuario == "mbinaghi"){
      localStorage.setItem("user", "mbinaghi");
      return true;
    }
      else {
        this.logout();
        return false;
      }

    }

    public logout() {
      localStorage.removeItem("user");
    }

    public isUserLogged():boolean {
      return localStorage.getItem("user") !== null;
    }
  }

