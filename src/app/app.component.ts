import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'PortfolioWeb';
  isUserLogged: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserLogged = this.authService.isUserLogged();
  }

}
