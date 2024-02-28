import { CoursesComponent } from './courses.component';
import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { Course } from './models/course';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../../../core/services/courses.service';
import { LoadingService } from '../../../../core/services/loading.service';


describe('Test Unitario de CoursesComponent', () => {

    let component: CoursesComponent;
    let fixture: ComponentFixture<CoursesComponent>;
    let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
    let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
    let matDialogSpy: jasmine.SpyObj<MatDialog>;
  
    beforeEach(() => {
        coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['getCourses', 'createCourse', 'updateCourseById', 'deleteCourseById']);
        loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setIsLoading']);
        matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        TestBed.configureTestingModule({
        declarations: [CoursesComponent],
        providers: [
            { provide: CoursesService, useValue: coursesServiceSpy },
            { provide: LoadingService, useValue: loadingServiceSpy },
            { provide: MatDialog, useValue: matDialogSpy },
        ],
        });

        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
    });

    it('Debe crearse bien el componente de Cursos', () => {
        expect(component).toBeTruthy();
    });    

    it('onCreate siempre debe crear un curso llamando al createCourse', () => {
        const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
        matDialogSpy.open.and.returnValue(dialogRefSpyObj);
        coursesServiceSpy.createCourse.and.returnValue(of([]));
        component.onCreate();                                               // <== llamada onCreate
        expect(matDialogSpy.open).toHaveBeenCalled();                       // validar que se abre el dialogo
        expect(coursesServiceSpy.createCourse).toHaveBeenCalled();          // validar que se llama a createCourse
    });

    it('La variable dataSource debe cargarse con los cursos al inicializarse la clase CoursesComponent', () => {
        const mockCourses: Course[] = [  {
            "id": 2,
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
            "id": 3,
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
          }];

        coursesServiceSpy.getCourses.and.returnValue(of(mockCourses));      // el getCourses devuelve los mockCourses
        component.ngOnInit();                                               // inicialización
        expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(true);
        expect(coursesServiceSpy.getCourses).toHaveBeenCalled();            // validar que se llama a getCourses
        expect(component.dataSource).toEqual(mockCourses);                  
        expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(false);
    });

    it('onEdit actualiza un curso si el usuario confirma, y se refleja la edición en lista de cursos que se guarda en la variable dataSource', () => {
        const mockCourse: Course = {
            "id": 2,
            "nombre": "Power BI Avanzado",
            "carrera": "Diseño UX",                 // esto sería un error, Power BI es de Data
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
        const mockUpdatedCourse: Course = {
            "id": 2,
            "nombre": "Power BI Avanzado",
            "carrera": "Data",                                  // edición, ahora Power BI Avanzado tiene la carrera correcta
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
        
        matDialogSpy.open.and.returnValue({
          afterClosed: () => of(mockUpdatedCourse),                                     // El usuario confirma
        } as any);
        coursesServiceSpy.updateCourseById.and.returnValue(of([mockUpdatedCourse]));
    
        component.onEdit(mockCourse);                                                   // <== llamada al onEdit
    
        expect(matDialogSpy.open).toHaveBeenCalled();
        // verificar que se llama al updateCourseById con el parametro de Id correcto
        expect(coursesServiceSpy.updateCourseById).toHaveBeenCalledWith(mockCourse.id, mockUpdatedCourse);  
        expect(component.dataSource).toEqual([mockUpdatedCourse]);
    });

    it('onEdit no debería editar un curso si el usuario cancela el diálogo', () => {
        const mockCourse: Course = {
            "id": 2,
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
        
        matDialogSpy.open.and.returnValue({
          afterClosed: () => of(null),                                      // Se simula que el usuario cancela
        } as any);
    
        component.onEdit(mockCourse);                                       // <== Llamada a onEdit
    
        expect(matDialogSpy.open).toHaveBeenCalled();
        expect(coursesServiceSpy.updateCourseById).not.toHaveBeenCalled();  // verificar que no se llama al updateCourseById
        expect(component.dataSource).toEqual([]); 
    });

    it('onDeleteCourse debe borrar un curso si el usuario confirma el pedido', () => {
        const mockCourse: Course = {
            "id": 2,
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

        const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
        coursesServiceSpy.deleteCourseById.and.returnValue(of([]));

        component.onDeleteCourse(mockCourse);                                               // <== llamada al onDeleteCourse
    
        expect(confirmSpy).toHaveBeenCalledWith('Está seguro que desea borrar el Curso?');
        expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(true);
        // validar que se llama a deleteCourseById con el id del curso que queremos borrar
        expect(coursesServiceSpy.deleteCourseById).toHaveBeenCalledWith(mockCourse.id);     // verificar que se invoca a deleteCourseById
        expect(component.dataSource).toEqual([]);
        expect(loadingServiceSpy.setIsLoading).toHaveBeenCalledWith(false);
    });
    
    it('onDeleteCourse no debe borrar un curso si el usuario cancela el pedido', () => {
        const mockCourse: Course = {
            "id": 2,
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
        const confirmSpy = spyOn(window, 'confirm').and.returnValue(false);         // se cancela
    
        component.onDeleteCourse(mockCourse);                                       // llamada a onDeleteCourse
    
        expect(confirmSpy).toHaveBeenCalledWith('Está seguro que desea borrar el Curso?');
        expect(loadingServiceSpy.setIsLoading).not.toHaveBeenCalled();
        expect(coursesServiceSpy.deleteCourseById).not.toHaveBeenCalled();           // verificar que no se llama a deleteCourseById
    });

    it('ngOnInit debe llamar a getPageData() ', () => {
        const getPageDataSpy = spyOn(component, 'getPageData');
    
        component.ngOnInit();                                   // llamada a ngOnInit()
    
        expect(getPageDataSpy).toHaveBeenCalled();              // asegurarse que llamamos a getPageData
    });
    

    it('ngOnInit, mientras se cargan los datos, debe setear primero isLoading en true y luego en false', () => {
        const coursesObservable = of([]); 
        coursesServiceSpy.getCourses.and.returnValue(coursesObservable);

        component.ngOnInit();

        const calls = loadingServiceSpy.setIsLoading.calls.all();
        expect(calls.length).toBe(2);                           // Asegura que se hayan realizado dos llamadas a setIsLoading

        const firstCall = calls[0];
        const secondCall = calls[1];

        // Verifica el orden de las llamadas
        expect(firstCall.args[0]).toBe(true);                   // La primera llamada setea en true
        expect(secondCall.args[0]).toBe(false);                 // La segunda llamada setea en false
    });

});
