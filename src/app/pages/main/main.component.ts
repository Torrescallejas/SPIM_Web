import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private router: Router, private userService: UserService) {}



  cerrarSesion() {
    this.userService.logOut()
      .then(() => {
        console.log('Sesión Cerrada');
        this.router.navigate(['/auth/login']);
      })
      .catch(err => console.log(err));
  }

  irAdministracion() {

  }

  irSistema() {
    this.router.navigate(['/pages/tables']);
  }
}
