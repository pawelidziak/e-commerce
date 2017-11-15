import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'limitChar'
})
export class LimitCharPipe implements PipeTransform {
  transform(input: string, limit: number) {
    if (input) {
      return (input.length > limit ? input.substr(0, limit) + '...' : input);
    }
  }
}
