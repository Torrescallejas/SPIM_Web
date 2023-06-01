import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agregar-cat',
  templateUrl: './agregar-cat.component.html',
  styleUrls: ['./agregar-cat.component.css']
})
export class AgregarCatComponent {

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private userService: UserService
  ) {
    console.log(userService.idMesa);
    console.log(data);
  }

  //Agregar "console.log(userService.idMesa);" al addData, meterlo en una variable
  // y ingresarlo en datos

  async addData(f: any){
    const uidDueño = await this.userService.obtenerUID();
    const mesaId = this.userService.idMesa;
    // console.log(uidDueño);

    const datos = {
      idDueño: uidDueño,
      idMesa: mesaId,
      categoria: f.value.name
    }

    // console.log(datos);
    const collectionInstance = collection(this.firestore, 'Categorias');
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
  
  nose(): void {
    this.dialogRef.close();
  }
}
