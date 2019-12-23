import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';

const EXPROTS_COMPONENT = [
  PaginatorComponent
];

@NgModule({
  declarations: [
    ...EXPROTS_COMPONENT
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...EXPROTS_COMPONENT
  ]
})
export class ShareModule { }
