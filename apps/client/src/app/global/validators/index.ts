import { AbstractControl } from '@angular/forms';

const ALLOWED_EXCEPTIONS = ['admins', 'teachers'];
const CLASSID_REGEXP = /^[0-9]{1}[A-Z]{1}/;

export const isClassID = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const allowed =
    (CLASSID_REGEXP.test(control.value) &&
      (control.value.length === 2 || !control.value)) ||
    ALLOWED_EXCEPTIONS.includes(control.value);

  return allowed ? null : { forbiddenClass: { value: control.value } };
};
