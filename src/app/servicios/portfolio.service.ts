import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/educacion';
import { Trabajo } from '../data/trabajo';
import { Skill } from '../data/skill';
import { Proyecto } from '../data/proyecto';
import { config } from '../data/config/Config';
import { Acercade } from '../data/acercade';
import { Banner } from '../data/banner';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  /* Servicios de Banner */
  obtenerDatosBanner(): Observable<Banner[]> {
    return this.http.get<any>(config.baseUrl + "banner");
  }

  modificarBanner(banner: Banner): Observable<any> {
    return this.http.put<any>(config.baseUrl + "banner/update", banner);
  }

  /* Servicios de "Acerca de" */
  obtenerDatosAcercade(): Observable<Acercade[]> {
    return this.http.get<any>(config.baseUrl + "acercade");
  }

  modificarAcercade(acercade: Acercade): Observable<any> {
    return this.http.put<any>(config.baseUrl + "acercade/update", acercade);
  }

  /* Servicios de Educacion */
  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>(config.baseUrl + "educacion");
  }

  guardarNuevaEducacion(educacion:Educacion): Observable<Educacion> {
    return this.http.post<any>(config.baseUrl + "educacion/create", educacion);
  }

  modificarEducacion(educacion: Educacion): Observable<any> {
    return this.http.put<any>(config.baseUrl + "educacion/{id}/update", educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "educacion/" + id);
  }

    /* Servicios de Trabajo */
  obtenerDatosTrabajo(): Observable<Trabajo[]> {
    return this.http.get<any>(config.baseUrl + "experiencia");
  }

  guardarNuevoTrabajo(trabajo:Trabajo): Observable<Trabajo> {
    return this.http.post<any>(config.baseUrl + "experiencia/create", trabajo);
  }

  modificarTrabajo(trabajo:Trabajo): Observable<any> {
    return this.http.put<any>(config.baseUrl + "experiencia/{id}/update", trabajo);
  }

  borrarTrabajo(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "experiencia/" + id);
  }

    /* Servicios de Skills */

  obtenerDatosSkill(): Observable<Skill[]> {
    return this.http.get<any>(config.baseUrl + "skill");
  }

  guardarNuevaSkill(skill:Skill): Observable<Skill> {
    return this.http.post<any>(config.baseUrl + "skill/create", skill);
  }

  modificarSkill(skill:Skill): Observable<any> {
    return this.http.put<any>(config.baseUrl + "skill/{id}/update", skill);
  }

  borrarSkill(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "skill/" + id);
  }


    /* Servicios de Proyectos */
  obtenerDatosProyecto(): Observable<Proyecto[]> {
    return this.http.get<any>(config.baseUrl + "proyecto");
  }

  guardarNuevoProyecto(proyecto:Proyecto): Observable<Proyecto> {
    return this.http.post<any>(config.baseUrl + "proyecto/create", proyecto);
  }

  modificarProyecto(proyecto:Proyecto): Observable<any> {
    return this.http.put<any>(config.baseUrl + "proyecto/{id}/update", proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(config.baseUrl + "proyecto/" + id);
  }

}
