import { Inject, Injectable } from '@angular/core';
import { Course } from '../../layouts/dashboard/pages/courses/models/course';
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// categorias de cursos
const categorias: string[] = ['Inglés', 'Inteligencia Artificial', 'Herramientas Digitales',
                        'Negocios', 'Habilidades blandas', 'Diseño UX/UI',
                        'Marketing', 'Programación y Desarrollo', 'Producto', 'Data']; 

// carreta de la institución
const carreras: string[] = ['Ninguna', 'Diseño UX/UI', 'Marketing', 'Programación y Desarrollo', 'Producto', 'Data']; 

  // nivel de dificultad
const niveles: string[] = ['Principiante', 'Intermedio', 'Avanzado', 'Experto']; 

  // dedicación que demanda
const dedicaciones: string[] = ['Baja', 'Moderada', 'Alta']; 


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private alerts: AlertsService,
              private loadingService: LoadingService,
              private httpClient: HttpClient) {}
  
  getCourseById(idCourse: number | string): Observable<Course | undefined> {
      return this.httpClient.get<Course>(`${environment.apiURL}/courses/${idCourse}`);
      //return of(COURSES_DB.find((course) => course.id == idCourse)).pipe(delay(100));
  }

  getCourseCategories() {
    this.loadingService.setIsLoading(true);
    return of(categorias).pipe(
      delay(600), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }

  getCourseLevels() {
    this.loadingService.setIsLoading(true);
    return of(niveles).pipe(
      delay(600), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }
  
  getCourseCareers() {
    this.loadingService.setIsLoading(true);
    return of(carreras).pipe(
      delay(250), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }

  getCourseDedications() {
    this.loadingService.setIsLoading(true);
    return of(dedicaciones).pipe(
      delay(300), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }

  getCourses() {
      this.loadingService.setIsLoading(true);
      return this.httpClient.get<Course[]>(`${environment.apiURL}/courses`)
                            .pipe(
                                catchError((error) => {
                                    this.alerts.showError('Error al cargar los cursos');
                                    //finalize(() => this.loadingService.setIsLoading(false));
                                    return of([]);                              
                                }))
                            .pipe(delay(1200), 
                                  finalize(() => this.loadingService.setIsLoading(false)));   
  }

  createCourse(payload: Course) {
 
    return this.httpClient
               .post<Course>(`${environment.apiURL}/courses`, payload)
               .pipe(mergeMap(() => this.getCourses()));
  }

  deleteCourseById(courseID: number) {
    return this.httpClient
          .delete<Course>(`${environment.apiURL}/courses/${courseID}`)
          .pipe(tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó correctamente')) )
          .pipe(mergeMap(() => this.getCourses()))        
          
  }
	
  updateCourseById(courseId: number, data: Course) {

    return this.httpClient
    .patch<Course>(`${environment.apiURL}/courses/${courseId}`,data)
    .pipe(
      catchError((error) => {
        this.alerts.showError('Error al actualizar el curso');             
        return of([]);
      }))
    .pipe(mergeMap(() => this.getCourses()));


  }
}
