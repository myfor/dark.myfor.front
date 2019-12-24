import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { PreviewImageComponent } from './preview-image/preview-image.component';

const EXPORTS_COMPONENT = [
  PaginatorComponent,
  PreviewImageComponent
];

const EXPORTS_MODULE = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
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
