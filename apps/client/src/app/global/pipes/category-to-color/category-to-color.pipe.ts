import { Pipe, PipeTransform } from '@angular/core';
import { IArticle } from '@csl/shared';

@Pipe({
  name: 'categoryToColor',
})
export class CategoryToColorPipe implements PipeTransform {
  transform(value: IArticle['category'], ...args: unknown[]): unknown {
    switch (value) {
      case 'Lussana':
        return '#0062ff';
      case 'Italia':
        return '#160084';
      case 'Mondo':
        return '#ffe100';
      case 'Speciale':
        return '#000000';
      case 'Scienza & Tech':
        return '#ff7300';
      case 'Cultura':
        return '#ffb3fa';
      case 'Sport':
        return '#1c9900';
      case 'Svago':
        return '#5a006e';
    }
  }
}
