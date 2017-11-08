import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {IUser} from '../_models/IUser';

@Injectable()
export class AuthService {

  user: any = null;
  loading: boolean;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {

    afAuth.authState.subscribe((auth) => {
      this.user = auth;
    });

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.user !== null && this.user.emailVerified === true;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.user.uid : '';
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    return this.user['displayName'] || 'User without a Name';
  }

  set currentUserDisplayName(name: string) {
    this.user.displayName = name;
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string, newUser: IUser) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // this.user = user;

        user.sendEmailVerification()
          .catch(
            (error: any) => {
              throw new Error((error.message));
            }
          );

        this.updateUserData(newUser, user.uid);
      })
      .catch((error: any) => {
        throw new Error((error.message));
      });
  }

  // method updates user profile IN database
  updateUserData(user: IUser, uid: string) {
    this.updatePersonal(user.name);
    this.db.object(`/users/${uid}`).update(user)
      .catch((err) => {
        console.log(err);
      });
  }

  // method updates user profile (not in database!)
  updatePersonal(name: string) {
    const user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: name,
      photoURL: ''
    }).catch((error: any) => {
      throw new Error((error.message));
    });
  }

  emailLogin(email: string, password: string) {
    this.loading = true;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // this.router.navigate(['/home']);
        if (user.emailVerified === false) {
          throw new Error('Email not verified.');
        } else {
          console.log(user);
          this.user = user;
        }
      })
      .catch((error: any) => {
        throw new Error((error.message));
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
    this.afAuth.auth.signOut();
    // this.router.navigate(['/login']);
  }

  // UPDATE USER
  updateEmail(email: string) {
    const user = firebase.auth().currentUser;
    return user.updateEmail(email)
      .catch((error: any) => {
        throw new Error((error.message));
      });
  }
}
