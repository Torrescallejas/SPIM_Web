import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { TablesComponent } from './tables/tables.component';
import { CategoriaPlatoComponent } from './categoria-plato/categoria-plato.component';
import { PlatillosComponent } from './platillos/platillos.component';


@NgModule({
  declarations: [
    TablesComponent,
    CategoriaPlatoComponent,
    PlatillosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, 
    FormsModule
  ]
})
export class PagesModule { }
