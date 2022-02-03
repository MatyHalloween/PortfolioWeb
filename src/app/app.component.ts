import { Component, OnInit } from '@angular/core';

declare function dibujarGrafico(divADibujar:string): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'PortfolioWeb';

  ngOnInit() {
    dibujarGrafico("graph1");
    dibujarGrafico("graph2");
    dibujarGrafico("graph3");
    dibujarGrafico("graph4");
    dibujarGrafico("graph5");
    dibujarGrafico("graph6");
    dibujarGrafico("graph9");
    dibujarGrafico("graph10");
    dibujarGrafico("graph11");
    dibujarGrafico("graph12");
    dibujarGrafico("graph13");
    dibujarGrafico("graph14");
    dibujarGrafico("graph18");
  }

}
