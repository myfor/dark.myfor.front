import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const EXPORTS_COMPONENT = [
  PaginatorComponent
];

const EXPORTS_MODULE = [
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    ...EXPORTS_COMPONENT
  ],
  imports: [
    CommonModule,
    ...EXPORTS_MODULE
  ],
  exports: [
    ...EXPORTS_COMPONENT,
    ...EXPORTS_MODULE
  ]
})
export class ShareModule { }
