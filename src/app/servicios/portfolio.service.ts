import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/educacion';
import { Trabajo } from '../data/trabajo';
import { Skill } from '../data/skill';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>("./assets/data/educacion.json").pipe(
      map(res => res.educacion)
    );
  }

  obtenerDatosTrabajo(): Observable<Trabajo[]> {
    return this.http.get<any>("./assets/data/trabajo.json").pipe(
      map(res => res.trabajo)
    );
  }

    obtenerDatosSkill(): Observable<Skill[]> {
      return this.http.get<any>("./assets/data/skill.json").pipe(
        map(res => res.skill)
      );
  }

}
