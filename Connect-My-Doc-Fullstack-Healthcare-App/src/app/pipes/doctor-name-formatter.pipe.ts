import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorNameFormatter',
  standalone: true
})
export class DoctorNameFormatterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `Dr. ${value}`;
  }

}
