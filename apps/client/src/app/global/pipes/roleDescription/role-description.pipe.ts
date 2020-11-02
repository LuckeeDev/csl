import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleDescription'
})
export class RoleDescriptionPipe implements PipeTransform {

  // Translate role ID to role description
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'isVice':
        return 'Vice'
      case 'isQp':
        return 'Direttore di Quinto Piano'
      case 'isRappre':
        return 'Rappresentante d\'istituto'
      case 'isRappreDiClasse':
        return 'Rappresentante di classe'
    }
  }

}
