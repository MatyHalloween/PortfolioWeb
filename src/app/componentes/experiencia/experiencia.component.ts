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
        puesto:["", [Validators.required]],
        inicio:["", [Validators.required]],
        fin:["", [Validators.required]],
        info:["", [Validators.required]]
      }

    )
}

  ngOnInit(): void {

    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();

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
      puesto:"",
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
    let trabajo: Trabajo = this.modalNuevaExp.value;
    if (this.modalNuevaExp.get('id')?.value == '') {
      this.portfolioService.guardarNuevoTrabajo(trabajo).subscribe(
        (newTrabajo: Trabajo) => {
          this.trabajoList.push(newTrabajo);
          this.reloadData();
        }
      );
    } else {
      this.portfolioService.modificarTrabajo(trabajo).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
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
      this.portfolioService.borrarTrabajo(trabajo.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
