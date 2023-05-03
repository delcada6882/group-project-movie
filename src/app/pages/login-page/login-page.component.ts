import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../interfaces/firebase/user';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

// class UserModel {
// 	constructor(public email: string, public password: string) {}
// }

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	public userFormGroup = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});
	public email?: string;
	public password?: string;

	constructor(
		private UserService: UserService,
		public AuthService: AuthService
	) {}

	async ngOnInit() {
		this.UserService.getUserObservable()?.subscribe((data) => {
			console.log(data);
		});
	}

	public async updateUserProfile() {
		if (!this.userFormGroup.valid) return;
		if (!this.userFormGroup.value.email) return;
		if (!this.userFormGroup.value.password) return;

		try {
			await this.AuthService.SignIn(
				this.userFormGroup.value.email,
				this.userFormGroup.value.password
			);
		} catch (err) {
			console.log(err);
		}
	}

	public signInWithGoogle() {
		this.AuthService.GoogleAuth();
	}
}
