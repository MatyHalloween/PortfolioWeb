import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/data/proyecto';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  proyectoList: Proyecto[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatosProyecto().subscribe(
      (data: Proyecto[]) => {
        this.proyectoList = data;
      }
    );
  }

}
