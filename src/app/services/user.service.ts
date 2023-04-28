import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../interfaces/firebase/user';
import { catchError, from, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRef?: AngularFirestoreDocument<User>;

  constructor(private db: AngularFirestore) {
    this.userRef = this.db.doc<User>(`users/zvHolvmcDa8g79T8XYCL`);
  }

  public getUserObservable(): Observable<User | undefined> | undefined {
    if (!this.userRef) return;
    return this.userRef.valueChanges();
  }

  public editUser(updatedUser: User) {
    if (!this.userRef) return;
    return this.userRef
      .update(updatedUser)
      .then(() => console.log('User updated'))
      .catch((err) => console.error('Failed updating user', err));
  }

  public saveUser(user: User) {
    if (!this.userRef) return;
    from(this.userRef.set(user)).pipe(
      tap(() => console.log('User saved')),
      catchError((err) => {
        console.error('Failed saving user', err);
        return of('Error');
      })
    );
  }

  public deleteUser() {
    if (!this.userRef) return;
    return this.userRef
      .delete()
      .then(() => console.log('User deleted'))
      .catch((err) => console.error('Failed deleting user', err));
  }
}
