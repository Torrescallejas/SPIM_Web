import { Component, Inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agregar-plat',
  templateUrl: './agregar-plat.component.html',
  styleUrls: ['./agregar-plat.component.css']
})
export class AgregarPlatComponent {

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private userService: UserService
  ) {
    console.log(data);
  }

  async addData(f: any){
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;
    console.log(uidDueño);

    const datos = {
      idDueño: uidDueño,
      idCat: idCat,
      platillo: f.value.name,
      precio: f.value.precio,
      contadorVenta: 0
    };

    if(idCat == 'CNLYybaEqJMJGNtpfhfZ'){

      const collectionInstance = collection(this.firestore, 'Bebidas');
      addDoc(collectionInstance, datos)
        .then(() => {
          console.log('Data Saved Successfully');
          console.log(datos)
          this.dialogRef.close();
        })
        .catch((err) => {
          console.log(err);
        })

    }else {

      const collectionInstance = collection(this.firestore, 'Platillos');
      addDoc(collectionInstance, datos)
        .then(() => {
          console.log('Data Saved Successfully');
          console.log(datos)
          this.dialogRef.close();
        })
        .catch((err) => {
          console.log(err);
        })
        
    }
    // console.log(datos);

  }
  
  nose(): void {
    this.dialogRef.close();
  }
}
