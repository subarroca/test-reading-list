// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// EXTERNAL


// OWN


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
    HttpModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
