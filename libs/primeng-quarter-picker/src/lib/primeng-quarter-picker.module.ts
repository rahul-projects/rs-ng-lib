import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';

import { PrimengQuarterPickerComponent } from './primeng-quarter-picker/primeng-quarter-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    PrimengQuarterPickerComponent
  ] 
})
export class PrimengQuarterPickerModule {

}
