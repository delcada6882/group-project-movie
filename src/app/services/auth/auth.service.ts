import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/firebase/user';
import * as Auth from '@firebase/auth';
import firebase from 'firebase/compat';

function handleError(err: any) {
	if (err instanceof Error)
		console.error(
			`Rut Ro!\nLooks like there was an error!\n${err.message}`
		);
	else console.error(`Something went HORRIBLY wrong!\n${err}`);
}

const SUCCESS_REDIRECT = '/movies';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		public AngularFirestore: AngularFirestore,
		public AngularFireAuth: AngularFireAuth,
		public Router: Router,
		public NgZone: NgZone
	) {
		this.AngularFireAuth.authState.subscribe((user) => {
			if (user) localStorage.setItem('user', JSON.stringify(user));
			else localStorage.removeItem('user');
		});
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user') || '{}');
		return user !== null && user.emailVerified !== false ? true : false;
	}

	async SignIn(email: string, password: string) {
		console.log(email, password);

		try {
			const result =
				await this.AngularFireAuth.signInWithEmailAndPassword(
					email,
					password
				);
			this.SetUserData(result.user);
			this.AngularFireAuth.authState.subscribe((user) => {
				console.log('LOGINED IN USER', user);
				if (user) this.Router.navigate([SUCCESS_REDIRECT]);
			});
		} catch (err) {
			handleError(err);
		}
	}

	async SignUp(
		email: string,
		password: string,
		changedProfileAttributes?: Partial<firebase.User>
	) {
		try {
			const result =
				await this.AngularFireAuth.createUserWithEmailAndPassword(
					email,
					password
				);
			/* Call the SendVerificaitonMail() function when new user sign up and returns promise */
			if (changedProfileAttributes)
				await result.user?.updateProfile(changedProfileAttributes);
			this.SendVerificationMail();
			this.SetUserData(result.user);
		} catch (err) {
			handleError(err);
		}
	}

	SetUserData(user: firebase.User | null) {
		if (!user) return;
		const userRef: AngularFirestoreDocument<User> =
			this.AngularFirestore.doc<User>(`users/${user.uid}`);
		return userRef.set(
			{
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				emailVerified: true,
				uid: user.uid,
			},
			{
				merge: true,
			}
		);
	}

	async SendVerificationMail() {
		return this.AngularFireAuth.currentUser
			.then((user) => user?.sendEmailVerification())
			.then(() => {
				this.Router.navigate([SUCCESS_REDIRECT]);
			});
	}

	async ForgotPassword(passwordResetEmail: string) {
		return this.AngularFireAuth.sendPasswordResetEmail(passwordResetEmail)
			.then(() => {
				alert('Password reset email sent, check your inbox.');
			})
			.catch((err) => {
				handleError(err);
			});
	}

	async SignOut() {
		return this.AngularFireAuth.signOut().then(() => {
			localStorage.removeItem('user');
			this.Router.navigate([SUCCESS_REDIRECT]);
		});
	}

	async GoogleAuth() {
		try {
			await this.AuthLogin(new Auth.GoogleAuthProvider());
		} catch (err) {
			handleError(err);
		}
	}

	async AuthLogin(provider: Auth.AuthProvider) {
		return this.AngularFireAuth.signInWithPopup(provider)
			.then((result) => {
				if (!result.user)
					throw new Error('No user returned from Google Auth');
				if (!result.user.email)
					throw new Error('No email returned from Google Auth');
				this.SetUserData(result.user);
				this.Router.navigate([SUCCESS_REDIRECT]);
			})
			.catch((err) => {
				handleError(err);
			});
	}
}
