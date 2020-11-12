import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../../../../../../libs/shared/src/lib/shared';

@Pipe({
  name: 'courseStatus',
})
export class CourseStatusPipe implements PipeTransform {
  transform(
    value: ICourse['status'],
    ...args: unknown[]
  ): { label: string; icon: string; color: 'accent' | 'warn' | 'primary' } {
    switch (value) {
      case 'WAITING':
        return {
          label: 'In attesa',
          icon: 'watch_later',
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
