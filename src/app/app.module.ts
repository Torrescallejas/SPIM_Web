import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Componentes
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { AgregarComponent } from './componentes/modalMesas/agregar/agregar.component';
import { EditarComponent } from './componentes/modalMesas/editar/editar.component';
import { AgregarCatComponent } from './componentes/modalesCategorias/agregar-cat/agregar-cat.component';
import { EditarCatComponent } from './componentes/modalesCategorias/editar-cat/editar-cat.component';

// ANGULAR MATERIAL
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AgregarPlatComponent } from './componentes/modalesPlatos/agregar-plat/agregar-plat.component';
import { EditarPlatComponent } from './componentes/modalesPlatos/editar-plat/editar-plat.component';

// Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgregarComponent,
    EditarComponent,
    AgregarCatComponent,
    EditarCatComponent,
    AgregarPlatComponent,
    EditarPlatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
