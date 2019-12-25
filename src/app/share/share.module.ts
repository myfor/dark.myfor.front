import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { SafeUrlPipe } from './preview-image/safe-url.pipe';

const EXPORTS_COMPONENT = [
  PaginatorComponent,
  PreviewImageComponent
];

const EXPORTS_MODULE = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
];

const EXPORTS_PROVIDERS = [
  SafeUrlPipe
];

@NgModule({
  declarations: [
    ...EXPORTS_COMPONENT,
    ...EXPORTS_PROVIDERS
  ],
  imports: [
    CommonModule,
    ...EXPORTS_MODULE
  ],
  exports: [
    ...EXPORTS_COMPONENT,
    ...EXPORTS_MODULE
  ],
  providers: [
    ...EXPORTS_PROVIDERS
  ]
})
export class ShareModule { }
