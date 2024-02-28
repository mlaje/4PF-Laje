import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {
  calcularEdad(fechaNac: string): string {
    const fechaNacimiento = new Date(fechaNac);
  
    // Verificar si la fecha de nacimiento es válida
    if (isNaN(fechaNacimiento.getTime())) {
      return 'Fecha de nacimiento no válida';
    }
  
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  
    // Ajuste si aún no ha pasado el cumpleaños este año
    if (
      fechaNacimiento.getMonth() > fechaActual.getMonth() ||
      (fechaNacimiento.getMonth() === fechaActual.getMonth() &&
        fechaNacimiento.getDate() > fechaActual.getDate())
    ) {
      edad--;
    }
     return edad.toString();
  }
  
  transform(value: string, ...args: unknown[]): unknown {
    return this.calcularEdad(value) ;
  }

}
