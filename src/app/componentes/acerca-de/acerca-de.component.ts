import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  isUserLogged: Boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
  }

}
