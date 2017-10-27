import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SearchPipe',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, input: string) {

    if (input === undefined || input === '') {
      return value;
    }

    if (value && input) {
      return value.filter(item => {
        return (item.name.toLowerCase().includes(input.toLowerCase()) || item.desc.toLowerCase().includes(input.toLowerCase()));
      });
    }

  }
}

