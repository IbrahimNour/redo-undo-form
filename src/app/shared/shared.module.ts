import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// const COMPONENTS = [];
// const MODULES = [];
@NgModule({
  declarations: [],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [],
})
export class SharedModule {}
