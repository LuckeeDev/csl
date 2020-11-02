import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryToColor'
})
export class CategoryToColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case 'Cultura':
        return '#672f00';
      case 'Sport':
        return '#00b41e';
      case 'Lussana':
        return '#0D47A1';
      case 'Musica':
        return '#d0d0d0';
      case 'Cinema':
        return '#009fff';
    };
  }

}
