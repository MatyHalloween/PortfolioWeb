import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: string = "";
  password: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log("Iniciando sesion " + this.usuario + " " + this.password);
    let response: Boolean = this.authService.login(this.usuario, this.password)
  }

}
