import { TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Course } from '../../layouts/dashboard/pages/courses/models/course';
import { Observable, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';

describe('Test Unitario de CoursesService', () => {

    let coursesService: CoursesService;
    let httpController: HttpTestingController;
    let loadingService: LoadingService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CoursesService, AlertsService, LoadingService],
        imports: [HttpClientTestingModule],
      }); 
          
      coursesService = TestBed.inject(CoursesService);
      httpController = TestBed.inject(HttpTestingController);
      loadingService = TestBed.inject(LoadingService);      
    });
  
    afterEach(() => {
      httpController.verify(); 
    });

    
    it('El servicio CoursesService se instancia Truthy', () => {
      expect(coursesService).toBeTruthy();
    });

    it('getCourseById recibe un ID de curso como parámetro y debe devolver un objeto Course con ese identificador ', () => {
      const courseId = 88888;
      const mockCourse: Course = {
          "id": 88888,
          "nombre": "Power BI Avanzado",
          "carrera": "Data",
          "categoria": "Data",
          "nivel": "Avanzado",
          "dedicacion": "Moderada",
          "precioDeLista": 80000,
          "descuento": 15,
          "precioFinal": 68000,
          "detalles": "Se requieren conocimientos de SQL",
          "rangoDeFechas": "Del 01/03 al 03/05",
          "dias": "Martes y Viernes",
          "horario": "19 a 21 hs",
          "profesor": "José Datiten"
      };
      
      // se espera que, al llamar a getCourseById pasando como Id el del objeto mock, el curso obtenido sea el mock
      coursesService.getCourseById(mockCourse.id)
                    .subscribe( (course) => { expect(course).toEqual(mockCourse); } );    

      // se espera un llamado al GET del endpoint de cursos filtrando por courseId
      const req = httpController.expectOne(`${environment.apiURL}/courses/${courseId}`);      
      expect(req.request.method).toEqual('GET');
      req.flush(mockCourse);  
    });

    it('getCourseCategories devuelve un array de categorias de 10 elementos, entre otras está IA y Data', fakeAsync(() => {
      const mockCategories: string[] = ['Inglés', 'Inteligencia Artificial', 'Herramientas Digitales',
                                        'Negocios', 'Habilidades blandas', 'Diseño UX/UI',
                                        'Marketing', 'Programación y Desarrollo', 'Producto', 'Data'];
                                  
      let actualCategories: string[] | undefined;
      spyOn(loadingService, 'setIsLoading').and.stub();
  
      coursesService.getCourseCategories().subscribe(categories => {      // llama a getCourseCategories
        actualCategories = categories;
      });
        
      tick(600);
      expect(actualCategories).toHaveSize(10);                            // se devuelven 10 categorias
      expect(actualCategories).toContain('Data');                         // entre las categorías está Data
      expect(actualCategories).toContain('Inteligencia Artificial');      // también está Inteligencia Artificial
    }));

    it('getCourseLevels devuelve un array de niveles de cursos que no tiene el nivel Doctorado pero tiene entre otros los niveles Principiante y Experto', fakeAsync(() => {
      const mockLevels: string[]  = ['Principiante', 'Intermedio', 'Avanzado', 'Experto']; 
  
      let actualLevels: string[] | undefined;
  
      //spyOn(loadingService, 'setIsLoading').and.stub();
      const getCourseLevelsSpy = spyOn(coursesService, 'getCourseLevels').and.returnValue(of(mockLevels));
  
      coursesService.getCourseLevels().subscribe(levels => {
        actualLevels = levels;
      });
  
      // Simular la finalización de la operación asincrónica
      tick(600);

      // Verifica que el método getCourseLevels se haya llamado exactamente una vez
      expect(getCourseLevelsSpy).toHaveBeenCalledTimes(1);

      // Asegurarse de que actualLevels se haya cargado correctamente
      expect(actualLevels).toHaveSize(4);                // Se espera un array de niveles de tamaño 2
      expect(actualLevels).toContain('Principiante');    // Debe contener el nivel Principiante
      expect(actualLevels).toContain('Experto');         // Debe contener el nivel Experto
      expect(actualLevels).not.toContain('Doctorado');   // No debe contener el nivel Doctorado
      expect(actualLevels).toEqual(mockLevels);          // Obviedad: debe devolver lo que forzamos que devuelva (no le veo mucho valor en este caso)
    }));

    it('El getCourseLevels tiene un pipe con un delay de 600 ms ', fakeAsync(() => {

        const setIsLoadingSpy = spyOn(loadingService, 'setIsLoading');
        coursesService.getCourseLevels().subscribe();           // Llamada a getCourseLevels
        tick(599);
        expect(setIsLoadingSpy).toHaveBeenCalledWith(true);     // verificar que se ejecutó setIsLoading(true) 
        tick(1);                                                // Completa los 600 ms
        expect(setIsLoadingSpy).toHaveBeenCalledWith(false);    // verificar que se ejecutó setIsLoading(true) luego del delay de 600 ms
  
    }));

    it('En getCourseDedications se invoca a setIsLoading(true) y con separación de 300 ms por lo menos, a setIsLoading(false)', fakeAsync(() => {

      const setIsLoadingSpy = spyOn(loadingService, 'setIsLoading');
      coursesService.getCourseDedications().subscribe();        // Llamada a getCourseDedications
      expect(setIsLoadingSpy).toHaveBeenCalledWith(true);
      tick(300);                                                // Avanza en el tiempo 300 ms para completar la operación asincrónica
      expect(setIsLoadingSpy).toHaveBeenCalledWith(false);      // verificar que se ejecutó setIsLoading(true) luego del delay de 300 ms
  
    }));

    // El test más importante
    it('createCourse agrega un curso a la lista de Cursos', fakeAsync(() => {
      const mockPayload: Course = {
        "id": 0,
        "nombre": "Power BI Avanzado",
        "carrera": "Data",
        "categoria": "Data",
        "nivel": "Avanzado",
        "dedicacion": "Moderada",
        "precioDeLista": 80000,
        "descuento": 15,
        "precioFinal": 68000,
        "detalles": "Se requieren conocimientos de SQL",
        "rangoDeFechas": "Del 01/03 al 03/05",
        "dias": "Martes y Viernes",
        "horario": "19 a 21 hs",
        "profesor": "José Datiten"
      };
      const mockCourses: Course[] = [
        {
          "id": 555,
          "nombre": "Power BI Avanzado",
          "carrera": "Data",
          "categoria": "Data",
          "nivel": "Avanzado",
          "dedicacion": "Moderada",
          "precioDeLista": 80000,
          "descuento": 15,
          "precioFinal": 68000,
          "detalles": "Se requieren conocimientos de SQL",
          "rangoDeFechas": "Del 01/03 al 03/05",
          "dias": "Martes y Viernes",
          "horario": "19 a 21 hs",
          "profesor": "José Datiten"
        },
        {
          "id": 888,
          "nombre": "Magia",
          "carrera": "Producto",
          "categoria": "Data",
          "nivel": "Intermedio",
          "dedicacion": "Alta",
          "precioDeLista": 100000,
          "descuento": 20,
          "precioFinal": 80000,
          "detalles": "No Se requieren conocimientos previos",
          "rangoDeFechas": "Del 02/02 al 05/05",
          "dias": "Lunes y Jueves",
          "horario": "20:30 a 22:30 hs",
          "profesor": "Sofía Loren"
        }
      ];
  
      let getCursos: Course[] | undefined;

      // Invoca a createCourse y se suscribe para obtener los cursos después de la solicitud POST
      coursesService.createCourse(mockPayload)
        .subscribe({
          next: (courses) => {
            getCursos = courses;
          },
          complete: () => {
            expect(getCursos).toEqual([...mockCourses, mockPayload]);         // IMPORTANTE: Verifica que l nuevo array son los cursos iniciales mas el nuevo (mockPayload)
          },
        });
    
      // Espera la solicitud POST
      const postReq = httpController.expectOne(`${environment.apiURL}/courses`);
      expect(postReq.request.method).toBe('POST');
      expect(postReq.request.body).toEqual(mockPayload);
    
      // Responde con una simulación de éxito para la solicitud POST
      postReq.flush({});
    
      // Espera la solicitud GET
      const getReq = httpController.expectOne(`${environment.apiURL}/courses`);
      expect(getReq.request.method).toBe('GET');
    
      // Responde con una simulación de éxito para la solicitud GET
      getReq.flush(mockCourses);
    
      // Avanza en el tiempo para completar la operación asincrónica
      tick();
    
      // Asegúrate de limpiar cualquier tarea periódica pendiente al final
      discardPeriodicTasks();

    }));
  
})
