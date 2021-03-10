import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseStatus',
})
export class CourseStatusPipe implements PipeTransform {
  transform(
    value: string
  ): { label: string; icon: string; color: 'accent' | 'warn' | 'primary' } {
    switch (value) {
      case 'WAITING':
        return {
          label: 'In attesa',
          icon: 'schedule',
          color: 'accent',
        };
      case 'APPROVED':
        return {
          label: 'Approvato',
          icon: 'done',
          color: 'primary',
        };
      case 'DECLINED':
        return {
          label: 'Rifiutato',
          icon: 'clear',
          color: 'warn',
        };
    }
  }
}
