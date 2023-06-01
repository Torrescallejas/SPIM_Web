import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AgregarComponent } from 'src/app/componentes/modalMesas/agregar/agregar.component';
import { EditarComponent } from 'src/app/componentes/modalMesas/editar/editar.component';
import { UserService } from 'src/app/services/user.service';
import { Firestore, collection, collectionData, query, where, getDocs, doc, deleteDoc } from '@angular/fire/firestore';

// MAterial MODAL VIEW
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  
  estado1: boolean = true;
  estado2: boolean = true;

  userData!: Observable<any>; 
  noseDos: Array<any> = [];

  constructor(private dialog:MatDialog, 
    private router: Router, 
    private userService: UserService, 
    private firestore: Firestore) {


    this.getData();
    // console.log(typeof(this.noseDos));
  }

  async ngOnInit() {
    const uid = await this.userService.obtenerUID();
    // console.log(uid);
  }

  async nose(id: string) {
    console.log('Click')
    // console.log(id);
    this.userService.idMesa = id;
    this.router.navigate(['/pages/categoria']);
  }

  async getData() {
    const collectionInstance = collection(this.firestore, 'Mesas');
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })
    const uidDueño = await this.userService.obtenerUID();
    const q = query(collectionInstance, where("idDueño", "==", uidDueño))
    

    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc) => {
      this.noseDos = doc;
      console.log(this.noseDos);  
      // console.log(doc[0]['mesa']);
    });
    //Guardara los datos obtenidos de la colección en la variable "userData"
    // this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  eliminarMesaBtn(id: string) {
    const docInstance = doc(this.firestore, 'Mesas', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Mesa Eliminada');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  

  openDialogAgregar(): void {
    const dialogRef = this.dialog.open(AgregarComponent, {
      width: '350px',
      data: { name: 'Emiliano'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogEditar(id: string){
    console.log(id);
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '350px',
      data: { name: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  


  deleteButton() {
    if(this.estado2 === true){
      this.estado2 = false;
    }else {
      this.estado2 = true;
    }
  }

  editButton() {
    if(this.estado1 === true){
      this.estado1 = false;
    }else {
      this.estado1 = true;
    }
  }



  // -------------------------------------------
  cerrarSesion() {
    this.userService.logOut()
      .then(() => {
        console.log('Sesión Cerrada');
        this.router.navigate(['/auth/login']);
      })
      .catch(err => console.log(err));
  }
}
