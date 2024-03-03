import { Inject, Injectable } from '@angular/core';
import { Student } from '../../layouts/dashboard/pages/students/models/index';
import { Observable, catchError, delay, finalize, mergeMap, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//const ROLES_DB: string[] = ['ADMIN', 'USER'];

// Género
const genders: string[] = ['Masculino', 'Femenino', 'Otro']; 

// para seleccionar pais de origen y de residencia  
const countries: string[] = [
  'Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda', 'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bahréin', 'Bangladés', 'Barbados', 'Bélgica', 'Belice', 'Benín', 'Bielorrusia',
  'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután',
  'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'Chile', 'China', 'Chipre', 'Ciudad del Vaticano', 'Colombia',
  'Comoras', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador',
  'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia',
  'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia', 'Guatemala',
  'Guinea', 'Guinea Ecuatorial', 'Guinea-Bisáu', 'Guyana', 'Haití', 'Honduras', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán',
  'Irlanda', 'Islandia', 'Islas Marshall', 'Islas Salomón', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán',
  'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania',
  'Luxemburgo', 'Macedonia del Norte', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta', 'Marruecos', 'Mauricio', 'Mauritania',
  'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger',
  'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 'Países Bajos', 'Pakistán', 'Palaos', 'Palestina', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay',
  'Perú', 'Polonia', 'Portugal', 'Reino Unido', 'República Centroafricana', 'República Checa', 'República del Congo', 'República Democrática del Congo',
  'República Dominicana', 'Ruanda', 'Rumanía', 'Rusia', 'Samoa', 'San Cristóbal y Nieves', 'San Marino', 'San Vicente y las Granadinas', 'Santa Lucía',
  'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudáfrica',
  'Sudán', 'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Taiwán', 'Tanzania', 'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga',
  'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Vaticano', 'Venezuela',
  'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'];

// Rubro del trabajo
const companyIndustries: string[] = ['Agencia de Publicidad', 'Agricultura', 'Alimentación y Bebidas', 'Arquitectura', 'Arte y Diseño', 'Asesoramiento Financiero', 'Biotecnología', 'Blockchain', 'Comercio Electrónico', 'Construcción', 'Consultoría', 'Contabilidad', 'Desarrollo de Aplicaciones Móviles', 'Desarrollo Web', 'Educación', 'Energía Renovable', 'Entretenimiento', 'Energía y Recursos Naturales', 'Farmacéutica', 'Fotografía', 'Gestión de Proyectos', 'Gobierno', 'Industria Automotriz', 'Industria del Acero', 'Industria del Agua', 'Industria del Carbón', 'Industria del Cemento', 'Industria del Cobre', 'Industria del Deporte', 'Industria del Oro', 'Industria del Papel', 'Industria del Plástico', 'Industria del Vidrio', 'Industria Farmacéutica', 'Ingeniería', 'Ingeniería Ambiental', 'Ingeniería Civil', 'Ingeniería de Software', 'Investigación', 'Juegos', 'Logística', 'Manufactura', 'Marketing', 'Mantenimiento de Edificios', 'Medios de Comunicación', 'Metalurgia', 'Moda', 'Organización de Eventos', 'Papelería y Impresión', 'Psicología', 'Publicidad', 'Publicidad Exterior', 'Realidad Aumentada', 'Realidad Virtual', 'Reciclaje', 'Recursos Humanos', 'Relaciones Públicas', 'Robótica', 'Salud', 'Seguridad', 'Servicios Financieros', 'Servicios Legales', 'Servicios de Animación', 'Servicios de Audiovisual', 'Servicios de Catering', 'Servicios de Coaching', 'Servicios de Data Science', 'Servicios de Impresión 3D', 'Servicios de Investigación Clínica', 'Servicios de Investigación de Mercado', 'Servicios de Limpieza', 'Servicios de Mantenimiento', 'Servicios de Organización de Eventos', 'Servicios de Relaciones Públicas', 'Telecomunicaciones', 'Textil', 'Traducción', 'Transporte', 'Turismo', 'Vivienda', 'Y Tecnología de la Información'];

// Puesto Laboral
const jobDescriptions: string[] = ['Analista', 'Asistente', 'Asociado', 'Coordinador', 'Director', 'Director Ejecutivo (CEO)', 'Empleado de Nivel Básico', 'Especialista', 'Gerente', 'Jefe de Equipo', 'Presidente', 'Socio', 'Supervisor'];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private alerts: AlertsService,
              private loadingService: LoadingService,
              private httpClient: HttpClient) {}
  
  getStudentById(idStudent: number | string): Observable<Student | undefined> {
    return this.httpClient.get<Student>(`${environment.apiURL}/students/${idStudent}`);
  }

  getStudents() {
    this.loadingService.setIsLoading(true);
    return this.httpClient.get<Student[]>(`${environment.apiURL}/students`)
                          .pipe(
                              catchError((error) => {
                                  this.alerts.showError('Error al cargar los estudiantes');
                                  //finalize(() => this.loadingService.setIsLoading(false));
                                  return of([]);                              
                              }))
                          .pipe(delay(1200), 
                                finalize(() => this.loadingService.setIsLoading(false)));  


  }

  getStudentsGenders() {
    this.loadingService.setIsLoading(true);
    return of(genders).pipe(
      delay(60), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }
  getStudentsCountries() {
    this.loadingService.setIsLoading(true);
    return of(countries).pipe(
      delay(100), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }
  getStudentsCompanyIndustries() {
    this.loadingService.setIsLoading(true);
    return of(companyIndustries).pipe(
      delay(100), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }
  getStudentsJobDescriptions() {
    this.loadingService.setIsLoading(true);
    return of(jobDescriptions).pipe(
      delay(100), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }

  createStudent(payload: Student) {
    return this.httpClient
        .post<Student>(`${environment.apiURL}/students`, payload)
        .pipe(mergeMap(() => this.getStudents()));
  
  }

  deleteStudentById(studentId: number) {

    return this.httpClient
          .delete<Student>(`${environment.apiURL}/students/${studentId}`)
          .pipe(tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó correctamente')))
          .pipe(mergeMap(() => this.getStudents()));
  }
	
  updateStudentById(studentId: number, data: Student) {

    return this.httpClient
    .patch<Student>(`${environment.apiURL}/students/${studentId}`,data)
    .pipe(
      catchError((error) => {
        this.alerts.showError('Error al actualizar el estudiante');             
        return of([]);
      }))
    .pipe(mergeMap(() => this.getStudents()));
  }


}
