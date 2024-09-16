import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {AuthProvider, AuthOptions, User} from './auth.types';
import { map, Observable } from 'rxjs';

// import {User} from './auth.types'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) { 
    this.authState$ = this.afAuth.authState;
    this.logout();
  }

  get isAuthenticated(): Observable<boolean>{
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({isSignIn, provider, user}:AuthOptions): Promise<firebase.auth.UserCredential>{
    let operation: Promise<firebase.auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    } else {
      operation = isSignIn  
      ? this.signInWithEmailAndPassword(user.email, user.password) 
      : this.signUpWithEmail(user.email, user.password, user.name);
    }

    return operation;
  }

  logout(): Promise<void>{
    return this.afAuth.signOut();
  }



  private signInWithEmailAndPassword(email: string, password: string): 
  Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail(email: string , password: string, name?: string): 
  Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email,password).then(credentials => {
      if (credentials.user) {
        return credentials.user.updateProfile({
          displayName: name,
          photoURL: null
        }).then(() => credentials);
      }
      return credentials;
    });
  }

  private signInWithPopup(provider: AuthProvider): Promise<firebase.auth.UserCredential> {
    let signInProvider: firebase.auth.AuthProvider | null = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new firebase.auth.FacebookAuthProvider();
        
        break;
      default:
        throw new Error("Provedor de autenticação não suportado.")
    }
    if (!signInProvider){
      throw new Error("Provedor de autenticação não inicializado.")
    }

    return this.afAuth.signInWithPopup(signInProvider);
  }

  
}



