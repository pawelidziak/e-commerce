import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {IUser} from '../_models/IUser';
import {Observable} from 'rxjs/Observable';
import {AbstractControl, FormControl, Validators} from '@angular/forms';

@Injectable()
export class AuthService {

  user: any = null;
  loading: boolean;
  // needed just for stepper (checkout)
  authAbstractControl: AbstractControl = new FormControl(false, Validators.requiredTrue);

  constructor(private _afAuth: AngularFireAuth, private _db: AngularFireDatabase) {
    _afAuth.authState.subscribe((auth) => {
      this.user = auth;
      localStorage.removeItem('uid');
      this.authAbstractControl.setValue(false);
      if (this.user) {
        localStorage.setItem('uid', this.user.uid);
        this.authAbstractControl.setValue(true);
      }
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return (this.user !== null && this.user.emailVerified === true);
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this._afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    // return this.authenticated ? this.user.uid : '';
    return localStorage.getItem('uid') || '';
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    return this.user['displayName'] || 'User without a Name';
  }

  set currentUserDisplayName(name: string) {
    this.user.displayName = name;
  }

  getUserFormDB(uid: string): Observable<IUser> {
    return this._db.object('users/' + uid).valueChanges();
  }


  //// Email/Password Auth ////
  emailSignUp(email: string, password: string, newUser: IUser) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.sendEmailVerification()
          .catch((error: any) => {
              throw new Error(error.message);
            }
          );
        this.updateUserData(newUser, user.uid, email);
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }


  emailLogin(email: string, password: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.emailVerified === false) {
          throw new Error('Email not verified.');
        } else {
          this.user = user;
        }
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    this.loading = true;
    const auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => {
        this.loading = false;
      })
      .catch((error: any) => {
        this.loading = false;
        throw new Error((error.message));
      });
  }


  //// Sign Out ////
  signOut(): void {
    this._afAuth.auth.signOut();
    // this.router.navigate(['/login']);
  }

  // UPDATE USER
  private updateEmail(email: string) {
    const user = firebase.auth().currentUser;
    return user.updateEmail(email)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  updatePassword(password: string) {
    const user = firebase.auth().currentUser;
    return user.updatePassword(password)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }


  // method updates user profile IN database
  updateUserData(user: IUser, uid: string, email: string) {
    // this.updatePersonal(user.name);
    const updateObject = this._db.object(`/users/${uid}`).update(user)
      .catch((error) => {
        throw new Error(error.message);
      });

    const updateEmail = this.updateEmail(email)
      .catch((error) => {
        throw new Error(error.message);
      });

    const updatePersonal = this.updatePersonal(user.name)
      .catch((error) => {
        throw new Error(error.message);
      });

    const dataChanged = [
      updateObject,
      updateEmail,
      updatePersonal
    ];

    return Observable.merge(dataChanged);
  }

  // method updates user profile (not in database!)
  private updatePersonal(name: string) {
    const user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: name,
      photoURL: ''
    }).catch((error: any) => {
      throw new Error((error.message));
    });
  }

}
