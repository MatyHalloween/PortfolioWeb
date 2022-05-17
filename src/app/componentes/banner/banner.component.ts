import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Banner } from 'src/app/data/banner';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  bannerList: Banner[] = [];
  isUserLogged: Boolean = false;
  modalBanner: FormGroup;

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder
  ) {
    this.modalBanner = this.formBuilder.group({
      id:[''],
      img:['']
    })
   }

  ngOnInit(): void {

    this.isUserLogged = this.authService.isUserLogged();

    this.reloadData();

  }

  private reloadData() {
    this.portfolioService.obtenerDatosBanner().subscribe(
      (data) => {
        this.bannerList = data;
      }
    );
  }

  private loadForm(banner: Banner) {
    this.modalBanner.setValue({
      id: banner.id,
      img: banner.img
    })
  }

  onSubmit() {
    let banner: Banner = this.modalBanner.value;
    if (this.modalBanner.get('id')?.value !== '')
    this.portfolioService.modificarBanner(banner).subscribe(
      () => {
        this.reloadData();
      }
    )
    console.log(this.modalBanner.value);

  }

  onEditBanner(index: number){
    let banner: Banner = this.bannerList[index];
    this.loadForm(banner);
  }


}
