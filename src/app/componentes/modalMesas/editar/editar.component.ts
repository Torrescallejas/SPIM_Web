import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

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
    const datos = {
      idDueño: uidDueño,
      mesa: f.value.name
    };
    console.log(datos);

    const docInstance = doc(this.firestore, 'Mesas', id);
    // const updateData = {
    //   name: 'updatedName'
    // }
    // console.log(id)
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
