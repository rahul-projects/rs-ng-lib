import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengNextDatepickerModule } from './primeng-next-datepicker/primeng-next-datepicker.module';

@NgModule({
  imports: [
    CommonModule,
    PrimengNextDatepickerModule
  ],
  exports: [
    PrimengNextDatepickerModule
  ]
})
export class PrimengNextModule {}

export * from './primeng-next-datepicker'; 
