import { Injectable, NgZone, OnInit } from '@angular/core';
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
	console.log('ERROR', err);
	if (err instanceof Error)
		console.error(
			`Rut Ro!\nLooks like there was an error!\n${err.message}`
		);
	else console.error(`Something went HORRIBLY wrong!\n${err}`);
}

const SUCCESS_REDIRECT = '/profile';

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnInit {
	constructor(
		public AngularFirestore: AngularFirestore,
		public AngularFireAuth: AngularFireAuth,
		public Router: Router,
		public NgZone: NgZone
	) {
		this.AngularFireAuth.authState.subscribe((user) => {
			if (!user) return localStorage.removeItem('user');
			const userRef = this.AngularFirestore.doc<User>(
				`users/${user?.uid}`
			);
			userRef.valueChanges().subscribe((user) => {
				if (!user) return localStorage.removeItem('user');
				localStorage.setItem('user', JSON.stringify(user));
			});
		});
	}

	ngOnInit() {}

	get isLoggedIn(): boolean {
		const user = this.userData;
		return user !== null;
	}

	get userData(): User | null {
		const localStorageItem = localStorage.getItem('user');
		if (!localStorageItem) return null;
		const user = JSON.parse(localStorageItem);
		return user;
	}

	async SignIn(email: string, password: string) {
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
			if (changedProfileAttributes)
				await result.user?.updateProfile(changedProfileAttributes);
			this.SendVerificationMail();
			this.SetUserData(result.user);
		} catch (err) {
			handleError(err);
		}
	}

	async startRecentSignIn() {
		const user = await this.AngularFireAuth.currentUser;
		if (!user) return;
		await user.reauthenticateWithPopup(new Auth.GoogleAuthProvider());
	}

	async changeEmail(newEmail: string) {
		const user = await this.AngularFireAuth.currentUser;
		if (!user) return;
		await user.updateEmail(newEmail).catch((err) => {
			if (err.code === 'auth/requires-recent-login') {
				this.startRecentSignIn();
			} else if (err.code === 'auth/email-already-in-use') {
				alert('Email already in use');
			}
		});
		this.SetUserData(user);
	}

	async updateCurrentUser(changedProfileAttributes: Partial<User>) {
		const { email, ...miscChangeAttr } = changedProfileAttributes;
		try {
			const user = await this.AngularFireAuth.currentUser;
			if (!user) return;
			const userRef: AngularFirestoreDocument<User> =
				this.AngularFirestore.doc<User>(`users/${user.uid}`);

			if (miscChangeAttr) {
				await userRef.update(miscChangeAttr);
				await user.updateProfile(miscChangeAttr);
			}
			if (email) await this.changeEmail(email);
			this.SetUserData(user);
		} catch (err) {
			handleError(err);
		}
	}

	async SetUserData(user: firebase.User | null) {
		if (!user) return;
		const userRef: AngularFirestoreDocument<User> =
			this.AngularFirestore.doc<User>(`users/${user.uid}`);

		return await userRef.set(
			{
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				emailVerified: user.emailVerified,
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
		return await this.AngularFireAuth.signOut().then(() => {
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
		return await this.AngularFireAuth.signInWithPopup(provider)
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
