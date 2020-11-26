import { AbstractControl } from '@angular/forms';

export const isClassID = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const CLASSID_REGEXP: RegExp = /^[0-9]{1}[A-Z]{1}/;

  const allowed =
    (CLASSID_REGEXP.test(control.value) &&
      (control.value.length === 2 || !control.value)) ||
    control.value === 'admins';

  return allowed ? null : { forbiddenClass: { value: control.value } };
};
