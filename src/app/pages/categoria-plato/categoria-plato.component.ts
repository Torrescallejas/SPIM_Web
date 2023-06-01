import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AgregarCatComponent } from 'src/app/componentes/modalesCategorias/agregar-cat/agregar-cat.component';
import { EditarCatComponent } from 'src/app/componentes/modalesCategorias/editar-cat/editar-cat.component';
import { UserService } from 'src/app/services/user.service';
import { Firestore, collection, collectionData, query, where, getDocs, doc, deleteDoc, addDoc, updateDoc, and } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// ANGULAR MATERIAL
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-plato',
  templateUrl: './categoria-plato.component.html',
  styleUrls: ['./categoria-plato.component.css']
})
export class CategoriaPlatoComponent implements OnInit {

  estado1: boolean = true;
  estado2: boolean = true;

  userData!: Observable<any>; 
  noseDos: Array<any> = [];
  carritoCompras: Array<any> = [0, 1];
  total1: Array<any> = [];
  temp: Array<any> = [];
  sumaTotal: number = 0;

  constructor(private dialog:MatDialog, 
    private router: Router,
    private userService: UserService, 
    private firestore: Firestore) {

      this.getData();
      this.carritoCompras = userService.carritoCompra;
      this.total1 = userService.totalPagar;
      // console.log('-----------------');
      // console.log(this.total1);
      // this.total1.push(parseInt(this.carritoCompras[this.carritoCompras.length - 1].precioPlato));
      // console.log(this.total1);
      this.sumaTotal = this.total1.reduce((total, elemento) => total + elemento, 0);
    }

  async ngOnInit() {
    const uid = await this.userService.obtenerUID();
    // console.log(uid);
  }

  async nose(id: string) {
    // console.log('Click');
    this.userService.idCat = id;
    this.userService.carritoCompra = this.carritoCompras;
    this.router.navigate(['/pages/platillos']);
  }

  async getData() {
    const collectionInstance = collection(this.firestore, 'Categorias');
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })

    const uidDueño = await this.userService.obtenerUID();
    const q = query(collectionInstance, where("idDueño", "==", uidDueño))
    
    
    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc) => {
      this.noseDos = doc;
      // console.log(this.noseDos);
    // console.log(doc[0]['mesa']);
    });

    //Guardara los datos obtenidos de la colección en la variable "userData"
    // this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  eliminarMesaBtn(id: string) {
    const docInstance = doc(this.firestore, 'Categorias', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Mesa Eliminada');
      })
      .catch((err) => {
        console.log(err);
      })
    
    alert('Categoria Eliminada');
  }

  openDialogAgregar(): void {
    const dialogRef = this.dialog.open(AgregarCatComponent, {
      width: '350px',
      data: { name: 'Emiliano'}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openDialogEditar(id: string){
    const dialogRef = this.dialog.open(EditarCatComponent, {
      width: '350px',
      data: { name: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
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

  regresarBtn() {

    this.userService.carritoCompra = [];
    this.userService.totalPagar = [];
    this.router.navigate(['/pages/tables']);
  }

  async guardarOrden() {

    const fecha = new Date();
    fecha.getDay;
    // console.log(fecha);

    const uidDueño = await this.userService.obtenerUID();
    const idMesa = this.userService.idMesa;
    // console.log(uidDueño);

    const datos = {
      fecha: fecha,
      idDueño: uidDueño,
      idMesa: idMesa,
      platillo: this.carritoCompras,
      precioPagar: this.sumaTotal,
      estadoPagado: false
    };

    // console.log(datos);
    
    const collectionInstance = collection(this.firestore, 'Ordenes');
    addDoc(collectionInstance, datos)
    .then(() => {
      console.log('Orden Guardada Exitosamente');
      // console.log(datos)
    })
    .catch((err) => {
      console.log(err);
    })

    alert("Guardado Correctamente!!");
  }

  //------------------------------------------------
  //------------------------------------------------------------------------------------------------
  //------------------------------------------------
  async borrarPedido() {
    const lastValue = this.carritoCompras[this.carritoCompras.length-1];
    // console.log(lastValue.nombrePlato);
    const collectionInstance = collection(this.firestore, 'Platillos');
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;
    const q = query(collectionInstance, where("platillo", "==", lastValue.nombrePlato)) //----
    

    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc) => {
      this.temp = doc;
      // console.log(this.temp[0]['contadorVenta']);
    });
    console.log(this.temp);

    let contador = this.temp[0]['contadorVenta'];
    contador--;

    let idPlato = this.temp[0]['id'];

    const datos = {
      idDueño: uidDueño,
      idCat: idCat,
      platillo: this.temp[0]['platillo'],
      precio: this.temp[0]['precio'],
      contadorVenta: contador
    };
    // console.log("---------");
    // console.log(datos);
    
    const docInstance = doc(this.firestore, 'Platillos', idPlato);
    
    console.log(idPlato);
    updateDoc(docInstance, datos)
    .then(() => {
      console.log('Pedido Borraro Exitosamente');
      // console.log(datos);
      })
      .catch((err) => {
      console.log(err);
    })
    this.carritoCompras.pop();
    this.total1.pop();
    this.sumaTotal = this.total1.reduce((total, elemento) => total + elemento, 0);
    // console.log(this.carritoCompras);
  }

  

  async pagarOrden() {
    /* 
    TODO: El codigo fue llevado a el boton de regresar 
    */
    /**
      * TODO: El codigo fue llevado a guardarOrden() 
    */
    const fecha = new Date();
    fecha.getDay;

    // console.log(lastValue.nombrePlato);
    const collectionInstance = collection(this.firestore, 'Ordenes'); // TODO: en ves de 'platillos' == 'Ordenes'
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;
    const idMesa = this.userService.idMesa;
    const q = await query(collectionInstance, and( where("idMesa", "==", idMesa), where("estadoPagado", "==", false))) // ! --query(collectionInstance, where("idMesa", "==", idMesa), where("estadoPagado", "==", false))
    

    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc1) => {
      this.temp = doc1;
      // console.log(this.temp[0]['contadorVenta']);
    });
    // console.log("---------");
    // console.log(this.temp);

    let contador = this.temp[0]['contadorVenta'];
    let idPlato = this.temp[0]['id'];

    const datos = {
      fecha: fecha,
      idDueño: uidDueño,
      idMesa: idMesa,
      platillo: this.temp[0]['platillo'],
      precioPagar: this.temp[0]['precioPagar'],
      estadoPagado: true
    };
    // console.log("---------");
    // console.log(datos);
    
    const docInstance = doc(this.firestore, 'Ordenes', idPlato);
    
    console.log(idPlato);
    updateDoc(docInstance, datos)
    .then(() => {
      alert('Orden Pagada Exitosamente');
      // console.log(datos);
      })
      .catch((err) => {
      console.log(err);
      })
  }

  async traerPedido() {
    const collectionInstance = collection(this.firestore, 'Ordenes'); // TODO: en ves de 'platillos' == 'Ordenes'
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;
    const idMesa = this.userService.idMesa;
    const q = query(collectionInstance, and( where("idMesa", "==", idMesa), where("estadoPagado", "==", false))) // ! --query(collectionInstance, where("idMesa", "==", idMesa), where("estadoPagado", "==", false))
    

    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc1) => {
      this.temp = doc1;
      // console.log(this.temp[0]['contadorVenta']);
    });
    if(this.temp) {
      this.carritoCompras = this.temp[0]['platillo'];
      this.sumaTotal = this.temp[0]['precioPagar'];
      alert('Se ha encontrado una Orden');
    }else {
      this.userService.carritoCompra = [];
    }
  }

  
  cerrarSesion() {
    this.userService.logOut()
      .then(() => {
        console.log('Sesión Cerrada');
        this.router.navigate(['/auth/login']);
      })
      .catch(err => console.log(err));
  }

}
