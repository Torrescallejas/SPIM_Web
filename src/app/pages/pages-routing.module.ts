import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TablesComponent } from './tables/tables.component';
import { CategoriaPlatoComponent } from './categoria-plato/categoria-plato.component';
import { PlatillosComponent } from './platillos/platillos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'main', component: MainComponent},
      {path: 'tables', component: TablesComponent},
      {path: 'categoria', component: CategoriaPlatoComponent},
      {path: 'platillos', component: PlatillosComponent},
      {path: '**', redirectTo: 'main'},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
