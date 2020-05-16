import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modal'
})
export class ModalPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
