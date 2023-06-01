import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editar-cat',
  templateUrl: './editar-cat.component.html',
  styleUrls: ['./editar-cat.component.css']
})
export class EditarCatComponent {


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
    const mesaId = this.userService.idMesa;
    
    const datos = {
      idDueño: uidDueño,
      idMesa: mesaId,
      categoria: f.value.name
    }
    // console.log(datos);

    const docInstance = doc(this.firestore, 'Categorias', id);

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
