// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// EXTERNAL


// OWN


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [],
  exports: [
    RouterModule,
    HttpModule,
    FormsModule
  ]
})
export class SharedModule { }
