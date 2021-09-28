import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { PrimengNextModule } from '@rs-ng-lib/primeng-next';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PrimengNextModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
