import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private userService: UserService) {

  }

  onSubmit(f:any) {
    console.log(f.value);
    this.userService.login(f.value)
      .then(response => {
        console.log('Inicio de Sesión Exitoso');
        // console.log(response);
        this.router.navigate(['/pages/main']);
      })
      .catch(err => console.log(err));
  }

  registrar() {
    this.router.navigate(['/auth/register']);
  }

}
