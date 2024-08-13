import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ComponentBase } from '@core/base/common-base';
import { takeUntil } from 'rxjs';
import { BaseForm } from '../core/base/base-form';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent
  extends ComponentBase
  implements BaseForm, OnInit
{
  form!: FormGroup;
  formHistory: any[] = [];
  currentIndex = -1;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new UntypedFormGroup({
      firstName: new UntypedFormControl(null),
      lastName: new UntypedFormControl(null),
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.addToHistory();
    });
  }

  addToHistory() {
    if (this.currentIndex < this.formHistory.length - 1) {
      this.formHistory = this.formHistory.slice(0, this.currentIndex + 1);
    }
    this.formHistory.push(this.form.getRawValue());
    this.currentIndex++;
  }

  undo(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.form.patchValue(this.formHistory[this.currentIndex], {
        emitEvent: false,
      });
    }
  }

  redo(): void {
    if (this.currentIndex < this.formHistory.length - 1) {
      this.currentIndex++;
      this.form.patchValue(this.formHistory[this.currentIndex], {
        emitEvent: false,
      });
    }
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.formHistory.length - 1;
  }

  onSubmit(): void {
    this.redo();
  }
}
