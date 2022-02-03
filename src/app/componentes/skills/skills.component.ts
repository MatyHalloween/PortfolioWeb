import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/data/skill';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillList: Skill[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatosSkill().subscribe(
      (data: Skill[]) => {
        this.skillList = data;
      }
    );

  }

}
