import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/data/proyecto';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  proyectoList: Proyecto[] = [];
  isUserLogged: Boolean = false;
  modalNuevoProyecto: FormGroup;

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.modalNuevoProyecto = this.formBuilder.group({
        id:[""],
        img:[""],
        url:["", [Validators.required]],
      })
    }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();
  }

  private reloadData() {
    this.portfolioService.obtenerDatosProyecto().subscribe(
      (data) => {
        this.proyectoList = data;
      }
    );
  }

  private clearForm(){
    this.modalNuevoProyecto.setValue({
      id:"",
      img:"",
      url:""
    })
  }

  private loadForm(proyecto: Proyecto){
    this.modalNuevoProyecto.setValue({
      id: proyecto.id,
      img: proyecto.img,
      url: proyecto.url
    })
  }

  onSubmit(){
    let proyecto: Proyecto = this.modalNuevoProyecto.value;
    if (this.modalNuevoProyecto.get('id')?.value == '') {
      this.portfolioService.guardarNuevoProyecto(proyecto).subscribe(
        (newProyecto: Proyecto) => {
          this.proyectoList.push(newProyecto);
          this.reloadData();
        }
      );
    } else {
      this.portfolioService.modificarProyecto(proyecto).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNewProyecto(){
    this.clearForm();
  }

  onEditProyecto(index:number){
    let proyecto: Proyecto = this.proyectoList[index];
    this.loadForm(proyecto);
  }

  onDeleteProyecto(index: number) {
    let proyecto: Proyecto = this.proyectoList[index];
    if (confirm("¿Está seguro que desea borrar el proyecto seleccionado?")) {
      this.portfolioService.borrarProyecto(proyecto.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }


}
