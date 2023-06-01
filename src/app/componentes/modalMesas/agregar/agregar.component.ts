import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  

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
    console.log(uidDueño);

    const datos = {
      idDueño: uidDueño,
      mesa: f.value.name
    };

    // console.log(datos);
    const collectionInstance = collection(this.firestore, 'Mesas');
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
  
  nose() {
    this.dialogRef.close();
  }
}
