import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, FeaturesModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}