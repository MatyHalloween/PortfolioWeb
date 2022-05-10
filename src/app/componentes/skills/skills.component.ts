import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from 'src/app/data/skill';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillList: Skill[] = [];
  isUserLogged: Boolean = false;

  modalNuevaSkill: FormGroup;

  constructor(private portfolioService: PortfolioService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.modalNuevaSkill = this.formBuilder.group({
        id:[""],
        dato:["", [Validators.required]],
        clase:[""],
        soft:[""]

      })
     }

  ngOnInit(): void {

    this.isUserLogged = this.authService.isUserLogged();


    this.portfolioService.obtenerDatosSkill().subscribe(
      (data: Skill[]) => {
        this.skillList = data;
      }
    );

  }

  private reloadData() {
    this.portfolioService.obtenerDatosSkill().subscribe(
      (data) => {
        this.skillList = data;
      }
    );
  }

  private clearForm(){
    this.modalNuevaSkill.setValue({
      id:"",
      dato:"",
      clase:"",
      soft:""
    })
  }

  private loadForm(skill: Skill){
    this.modalNuevaSkill.setValue({
      id: skill.id,
      dato: skill.dato,
      clase: skill.clase,
      soft: skill.soft
    })
  }

  onSubmit(){
    console.log(this.modalNuevaSkill.value);
  }

  onNewSkill(){
    this.clearForm();
  }

  onEditSkill(index:number){
    let skill: Skill = this.skillList[index];
    this.loadForm(skill);
  }

  onDeleteSkill(index: number) {
    let skill: Skill = this.skillList[index];
    if (confirm("¿Está seguro que desea borrar la skill seleccionada?")) {
      this.portfolioService.borrarEducacion(skill.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
