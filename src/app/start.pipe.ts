import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'start'
})
export class StartPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
