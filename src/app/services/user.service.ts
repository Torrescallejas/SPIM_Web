import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  idMesa: string = 'id';
  idCat: string = 'id';
  carritoCompra: Array<any> = [];
  totalPagar: Array<number> = [];

  constructor(private auth: Auth) { }

  register({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider);
  }

  logOut() {
    return signOut(this.auth);
  }

  async obtenerUID() {
    const user = await this.auth.currentUser;
    if(user === undefined) {
      return null;
    }else {
      return user?.uid;
    }
  }

  
}
