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

  /* Mudado al db.json
let COURSES_DB: Course[] = [
  {
    id: new Date().getTime()+1,
    nombre: 'Angular',
    carrera: 'Programación y Desarrollo',
    categoria: 'Programación y Desarrollo',
    nivel: 'Avanzado',
    dedicacion: 'Moderada',
    precioDeLista: 90000,
    descuento: 20,
    precioFinal: 74000,
    detalles: 'Se requieren conocimientos de HTML, CSS y Javascript',
    rangoDeFechas: 'Del 08/09 al 02/11',
    dias: 'Lunes y Miercoles',
    horario: '20 hs a 22 hs',
    profesor: 'Josué Baez'
  },
  {
    id: new Date().getTime()+2,
    nombre: 'Power BI Avanzado',
    carrera: 'Data',
    categoria: 'Data',
    nivel: 'Avanzado',
    dedicacion: 'Moderada',
    precioDeLista: 80000,
    descuento: 15,
    precioFinal: 68000,
    detalles: 'Se requieren conocimientos de SQL',
    rangoDeFechas: 'Del 01/03 al 03/05',
    dias: 'Martes y Viernes',
    horario: '19 a 21 hs',
    profesor: 'José Datiten'
  },
  {
    id: new Date().getTime()+3,
    nombre: 'Magia',
    carrera: 'Producto',
    categoria: 'Data',
    nivel: 'Intermedio',
    dedicacion: 'Alta',
    precioDeLista: 100000,
    descuento: 20,
    precioFinal: 80000,
    detalles: 'No Se requieren conocimientos previos',
    rangoDeFechas: 'Del 02/02 al 05/05',
    dias: 'Lunes y Jueves',
    horario: '20:30 a 22:30 hs',
    profesor: 'Sofía Loren'
  }
];
*/

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
    /*
    this.loadingService.setIsLoading(true);
    return of(COURSES_DB).pipe(
      delay(1500), 
      finalize(() => this.loadingService.setIsLoading(false)));
      */
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
    //COURSES_DB.push(payload);
    //COURSES_DB = [...COURSES_DB, {...payload, id : new Date().getTime()}]; 
    //return this.getCourses();    
    
    return this.httpClient
               .post<Course>(`${environment.apiURL}/courses`, payload)
               .pipe(mergeMap(() => this.getCourses()));
  }

  deleteCourseById(courseID: number) {
    //COURSES_DB = COURSES_DB.filter((course) => course.id != courseID);
    //return this.getCourses().pipe(tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó correctamente')) ) ;

    return this.httpClient
          .delete<Course>(`${environment.apiURL}/courses/${courseID}`)
          .pipe(tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó correctamente')) )
          .pipe(mergeMap(() => this.getCourses()))        
          
  }
	
  updateCourseById(courseId: number, data: Course) {
    //COURSES_DB = COURSES_DB.map((c) => c.id === courseId ? { ...c, ...data} : c); 
    //return this.getCourses();

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
