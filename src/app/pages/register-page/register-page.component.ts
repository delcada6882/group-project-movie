import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
	public userFormGroup = new FormGroup({
		username: new FormControl('', [
			Validators.minLength(6),
			Validators.required,
		]),
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [
			Validators.minLength(6),
			Validators.required,
		]),
		confirmPassword: new FormControl('', [
			Validators.minLength(6),
			Validators.required,
			() => {
				if (
					this.userFormGroup?.get('password')?.value !==
					this.userFormGroup?.get('confirmPassword')?.value
				) {
					return { notSame: true };
				}
				return null;
			},
		]),
	});
	get username() {
		return this.userFormGroup.get('username');
	}
	get email() {
		return this.userFormGroup.get('email');
	}
	get password() {
		return this.userFormGroup.get('password');
	}
	get confirmPassword() {
		return this.userFormGroup.get('confirmPassword');
	}

	constructor(public AuthService: AuthService) {}

	ngOnInit() {}

	public async createUserProfile() {
		if (!this.userFormGroup.valid) return;
		if (!this.userFormGroup.value.email) return;
		if (!this.userFormGroup.value.password) return;

		try {
			await this.AuthService.SignUp(
				this.userFormGroup.value.email,
				this.userFormGroup.value.password
			);
		} catch (err) {
			console.log(err);
		}
	}

	public signUpWithGoogle() {
		this.AuthService.GoogleAuth();
	}
}
