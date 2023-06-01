import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private userService: UserService) {

  }

  onSubmit(f:any) {
    console.log(f.value);
    this.userService.register(f.value)
      .then(response => {
        console.log('Registrado con Exito');
        console.log(response);
        this.router.navigate(['/pages/main']);
      })
      .catch(err => console.log(err));
  }

  IniciarSesion() {
    this.router.navigate(['/auth/login']);
  }
}
