import { Component, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/data/trabajo';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  trabajoList: Trabajo[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatosTrabajo().subscribe(
      (data: Trabajo[]) => {
        this.trabajoList = data;
      }
    );
  }

}
