import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar-plat',
  templateUrl: './editar-plat.component.html',
  styleUrls: ['./editar-plat.component.css']
})
export class EditarPlatComponent {

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private userService: UserService
  ) {
    console.log(data);
  }

  async updateData(id: string, f: any) {
    const uidDueño = await this.userService.obtenerUID();
    const idCat = this.userService.idCat;

    const datos = {
      idDueño: uidDueño,
      idCat: idCat,
      platillo: f.value.name,
      precio: f.value.precio
      //Se puede agregar un nuevo campo el cual lleve la cuenta de cuanas veces se vende el plato
    };
    console.log(datos);
    
    const docInstance = doc(this.firestore, 'Platillos', id);
    
    // console.log(id);
    updateDoc(docInstance, datos)
    .then(() => {
        console.log('Data Updated Successfully');
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
