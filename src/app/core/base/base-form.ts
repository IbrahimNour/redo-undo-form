import { FormGroup } from '@angular/forms';

export interface BaseForm {
  form: FormGroup;
  onSubmit(): void;
  initForm(): void;
}
