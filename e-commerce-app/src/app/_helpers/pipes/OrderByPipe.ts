import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'OrderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const newVal = value.sort((a: any, b: any) => {
      const date1 = new Date(a.orderDate);
      const date2 = new Date(b.orderDate);

      if (date1 > date2) {
        return -1;
      } else if (date1 < date2) {
        return 1;
      } else {
        return 0;
      }
    });

    return newVal;
  }
}
