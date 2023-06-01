import { Component } from '@angular/core';
import { Firestore, addDoc, and, collection, collectionData, deleteDoc, doc, query, updateDoc, where } from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, isEmpty } from 'rxjs';

import { AgregarPlatComponent } from 'src/app/componentes/modalesPlatos/agregar-plat/agregar-plat.component';
import { EditarPlatComponent } from 'src/app/componentes/modalesPlatos/editar-plat/editar-plat.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.css']
})
export class PlatillosComponent {

  estado1: boolean = true;
  estado2: boolean = true;

  noseDos: Array<any> = [];
  temp: Array<any> = [];
  carritoCompras: Array<any> = [];
  total1: Array<number> = [];
  sumaTotal: number = 0;
  cate: string = '';

  constructor(private dialog:MatDialog, 
    private router: Router, 
    private userService: UserService, 
    private firestore: Firestore) {

      this.getData();
      this.total1 = userService.totalPagar;
      this.carritoCompras = userService.carritoCompra;
      this.sumaTotal = this.total1.reduce((total, elemento) => total + elemento, 0);
  }

  async getData() {
    const idCat = this.userService.idCat;
    if(idCat == 'CNLYybaEqJMJGNtpfhfZ') {
      this.cate = 'Bebidas'
    }else {
      this.cate = 'Platillos'
    }
    const collectionInstance = collection(this.firestore, this.cate);
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })
    const uidDueño = await this.userService.obtenerUID();
    const q = query(collectionInstance, where("idDueño", "==", uidDueño), where("idCat", "==", idCat))
    

    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc) => {
      this.noseDos = doc;
      // console.log(this.noseDos);
      // console.log(doc[0]['mesa']);
    });
    //Guardara los datos obtenidos de la colección en la variable "userData"
    // this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  async actualizarContador(idPlato: string, platillo: string, precio: string, contador: number) {
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;
    contador++;

    const datos = {
      idDueño: uidDueño,
      idCat: idCat,
      platillo: platillo,
      precio: precio,
      contadorVenta: contador
    };
    
    const docInstance = doc(this.firestore, 'Platillos', idPlato);
    
    // console.log(idPlato);
    updateDoc(docInstance, datos)
      .then(() => {
        // console.log('Data Updated Successfully');
        // console.log(datos);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  eliminarPlatilloBtn(id: string) {
    // console.log('Mesa Eliminada');
    const docInstance = doc(this.firestore, 'Platillos', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Mesa Eliminada');
      })
      .catch((err) => {
        // console.log(err);
      })
  }
      

  nose(idPlato: string, nombrePlato: string, precioPlato: string) {
    // console.log('Click');
    const pedido = {
      idPlato: idPlato,
      nombrePlato: nombrePlato,
      precioPlato: precioPlato
    }
    // console.log(pedido);
    this.carritoCompras.push(pedido);
    // console.log("-----Arreglo Precios----");
    //Ingresa el precio de los platos a un arreglo para despues ser sumados
    this.total1.push(parseInt(this.carritoCompras[this.carritoCompras.length - 1].precioPlato));
    // console.log(this.total1);
    //Suma el total de los platos
    this.sumaTotal = this.total1.reduce((total, elemento) => total + elemento, 0);
    // console.log('-----Suma Total------');
    // console.log(this.sumaTotal);
  }

  async guardarOrden() {

    const fecha = new Date();
    fecha.getDay;
    // console.log(fecha);

    const uidDueño = await this.userService.obtenerUID();
    const idMesa = this.userService.idMesa;
    console.log(uidDueño);

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
      console.log('Orden Guardana con Exito');
      // console.log(datos)
    })
    .catch((err) => {
      console.log(err);
    })


  }


  // --------------------------------------------------------------
  // -----------------VENTANAS MODALES---------------------------
  // --------------------------------------------------------------
  openDialogAgregar(): void {
    const dialogRef = this.dialog.open(AgregarPlatComponent, {
      width: '350px',
      data: { name: 'Emiliano'}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  openDialogEditar(id: string){
    const dialogRef = this.dialog.open(EditarPlatComponent, {
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

  // Boton para regresar a catergoria
  regresarBtn() {
    this.userService.totalPagar = this.total1;
    this.userService.carritoCompra = this.carritoCompras;
    this.router.navigate(['/pages/categoria']);
  }
  
  
  //------------------------------------------------
  //------------------------------------------------------------------------------------------------
  //------------------------------------------------
  async borrarPedido() {
    const lastValue = this.carritoCompras[this.carritoCompras.length-1];
    // console.log(lastValue.nombrePlato);
    const collectionInstance = collection(this.firestore, 'Platillos'); // TODO: en ves de 'platillos' == 'Ordenes'
    //Hace los mismo que la de abajo, No es necesaria que se agregue
    // collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
    //   console.log(val);
    // })
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;
    const q = query(collectionInstance, where("platillo", "==", lastValue.nombrePlato)) // ! --query(collectionInstance, where("idMesa", "==", idMesa), where("estadoPagado", "==", false))
    

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
      contadorVenta: contador,
      estadoPagado: false
    };
    console.log("---------");
    console.log(datos);
    
    const docInstance = doc(this.firestore, 'Platillos', idPlato);
    
    console.log(idPlato);
    updateDoc(docInstance, datos)
    .then(() => {
      console.log('Data Updated Successfully');
      console.log(datos);
      })
      .catch((err) => {
      console.log(err);
    })
    this.carritoCompras.pop();
    this.total1.pop();
    this.sumaTotal = this.total1.reduce((total, elemento) => total + elemento, 0);
    console.log(this.carritoCompras);
  }

  async pagarOrden() {
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
    const q = query(collectionInstance, and( where("idMesa", "==", idMesa), where("estadoPagado", "==", false))) // ! --query(collectionInstance, where("idMesa", "==", idMesa), where("estadoPagado", "==", false))
    

    const querySnapshot = await collectionData(q, { idField: 'id' });
    querySnapshot.forEach((doc1) => {
      this.temp = doc1;
      // console.log(this.temp[0]['contadorVenta']);
    });
    console.log("---------");
    console.log(this.temp);

    let idPlato = this.temp[0]['id'];
    
    const datos = {
      fecha: fecha,
      idDueño: uidDueño,
      idMesa: idMesa,
      platillo: this.temp[0]['platillo'],
      precioPagar: this.temp[0]['precioPagar'],
      estadoPagado: true
    };
    console.log("---------");
    console.log(datos);
    // if(this.temp) {
    //   this.carritoCompras = this.temp[0]['platillo']
    // }else {
    //   this.userService.carritoCompra = [];
    // }
    
    const docInstance = doc(this.firestore, 'Ordenes', idPlato);
    
    console.log(idPlato);
    updateDoc(docInstance, datos)
    .then(() => {
      alert('Pago Realizado');
      console.log(datos);
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
      this.sumaTotal = this.temp[0]['precioPagar']
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
