import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trabajo } from 'src/app/data/trabajo';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  trabajoList: Trabajo[] = [];
  isUserLogged: Boolean = false;
  modalNuevaExp: FormGroup;

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.modalNuevaExp = this.formBuilder.group({
        id:[""],
        img:[""],
        school:["", [Validators.required]],
        titulo:["", [Validators.required]],
        inicio:[""],
        fin:["", [Validators.required]],
        info:[""]
      }

    )
}

  ngOnInit(): void {

    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();

    this.portfolioService.obtenerDatosTrabajo().subscribe(
      (data: Trabajo[]) => {
        this.trabajoList = data;
      }
    );
  }

  private reloadData() {
    this.portfolioService.obtenerDatosTrabajo().subscribe(
      (data) => {
        this.trabajoList = data;
      }
    );
  }

  private clearForm(){
    this.modalNuevaExp.setValue({
      id:"",
      img:"",
      school:"",
      titulo:"",
      inicio:"",
      fin:"",
      info:""
    })
  }

  private loadForm(trabajo: Trabajo){
    this.modalNuevaExp.setValue({
      id: trabajo.id,
      img: trabajo.img,
      puesto: trabajo.puesto,
      inicio: trabajo.inicio,
      fin: trabajo.fin,
      info: trabajo.info
    })
  }

  onSubmit(){
    console.log(this.modalNuevaExp.value);
  }

  onNewTrabajo(){
    this.clearForm();
  }

  onEditTrabajo(index:number){
    let trabajo: Trabajo = this.trabajoList[index];
    this.loadForm(trabajo);
  }

  onDeleteTrabajo(index: number) {
    let trabajo: Trabajo = this.trabajoList[index];
    if (confirm("¿Está seguro que desea borrar el trabajo seleccionado?")) {
      this.portfolioService.borrarEducacion(trabajo.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
