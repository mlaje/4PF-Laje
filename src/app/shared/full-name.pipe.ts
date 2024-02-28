import { Pipe, PipeTransform } from '@angular/core';

export interface StudentPipe {
  firstName: string;
  lastName: string;
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: StudentPipe, ...args: unknown[]): unknown {

    return value.lastName + ', ' + value.firstName ;
    
  }

}
