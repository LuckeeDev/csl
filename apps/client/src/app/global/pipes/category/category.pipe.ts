import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'gadgets':
        return 'dei gadget';
      case 'photos':
        return 'delle foto';
    }
  }
}
