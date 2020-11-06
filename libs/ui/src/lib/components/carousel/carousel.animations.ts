import { style, animate, animation } from '@angular/animations';

export const slideIn = animation([
  style({ transform: 'translateX({{ translate }})' }),
  animate('{{ time }}', style({ transform: 'translateX(0)' })),
]);

export const slideOut = animation([
  animate('{{ time }}', style({ transform: 'translateX({{ translate }})' })),
]);
