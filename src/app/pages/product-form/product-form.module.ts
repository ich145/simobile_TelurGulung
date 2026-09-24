import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { ProductFormPageRoutingModule } from './product-form-routing.module';

import { ProductFormPage } from './product-form.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductFormPage]
})
export class ProductFormPageModule {}
