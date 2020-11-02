import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productId',
})
export class ProductIdPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const id: string = value.replace(/ /g, '-').toLowerCase();

    return id;
  }
}
