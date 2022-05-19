import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/data/educacion';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList: Educacion[] = [];
  isUserLogged: Boolean = false;

  modalNuevaEdu: FormGroup;

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.modalNuevaEdu = this.formBuilder.group({
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
  }

  private reloadData() {
    this.portfolioService.obtenerDatosEducacion().subscribe(
      (data) => {
        this.educacionList = data;
      }
    );
  }

  private clearForm(){
    this.modalNuevaEdu.setValue({
      id:"",
      img:"",
      school:"",
      titulo:"",
      inicio:"",
      fin:"",
      info:""
    })
  }

  private loadForm(educacion: Educacion){
    this.modalNuevaEdu.setValue({
      id: educacion.id,
      img: educacion.img,
      school: educacion.school,
      titulo: educacion.titulo,
      inicio: educacion.inicio,
      fin: educacion.fin,
      info: educacion.info
    })
  }

  onSubmit(){
    let educacion: Educacion = this.modalNuevaEdu.value;
    if (this.modalNuevaEdu.get('id')?.value == '') {
      this.portfolioService.guardarNuevaEducacion(educacion).subscribe(
        (newEducacion: Educacion) => {
          this.educacionList.push(newEducacion);
          this.reloadData();
        }
      );
    } else {
      this.portfolioService.modificarEducacion(educacion).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
    
  }

  onNewEducation(){
    this.clearForm();
  }

  onEditEducation(index:number){
    let educacion: Educacion = this.educacionList[index];
    this.loadForm(educacion);
  }

  onDeleteEducation(index: number) {
    let educacion: Educacion = this.educacionList[index];
    if (confirm("¿Está seguro que desea borrar la educación seleccionada?")) {
      this.portfolioService.borrarEducacion(educacion.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  

}
