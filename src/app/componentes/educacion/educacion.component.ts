import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/data/educacion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatosEducacion().subscribe(
      (data: Educacion[]) => {
        this.educacionList = data;
      }
    );
  }

}
