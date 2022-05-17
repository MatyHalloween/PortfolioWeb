import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Acercade } from 'src/app/data/acercade';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  acercadeList: Acercade[] = [];
  isUserLogged: Boolean = false;
  acercaDeModal: FormGroup;

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder
  ) { 
    this.acercaDeModal = this.formBuilder.group({
      id:[''],
      img:[''],
      acercade:[''],
    })
  }

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();
  }

  private reloadData() {
    this.portfolioService.obtenerDatosAcercade().subscribe(
      (data) => {
        this.acercadeList = data;
      }
    );
  }

  private loadForm(acercade: Acercade) {
    this.acercaDeModal.setValue({
      id: acercade.id,
      img: acercade.img,
      acercade: acercade.acercade
    })
  }

  onSubmit() {
    let acercade: Acercade = this.acercaDeModal.value;
    if (this.acercaDeModal.get('id')?.value !== '')
    this.portfolioService.modificarAcercade(acercade).subscribe(
      () => {
        this.reloadData();
      }
    )
    console.log(this.acercaDeModal.value);

  }

  onEditAcercade(index: number){
    let acercade: Acercade = this.acercadeList[index];
    this.loadForm(acercade);
  }


}
