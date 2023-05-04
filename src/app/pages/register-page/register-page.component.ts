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
	get usernameAlert() {
		const username = this.userFormGroup.get('username');
		if (!(username?.invalid && (username?.dirty || username?.touched)))
			return null;
		if (username?.hasError('required')) return 'Required';
		if (username?.hasError('minlength'))
			return 'Must be at least 6 characters';
		return null;
	}
	get emailAlert() {
		const email = this.userFormGroup.get('email');
		if (!(email?.invalid && (email?.dirty || email?.touched))) return null;
		if (email?.hasError('required')) return 'Required';
		if (email?.hasError('email')) return 'Email is invalid';
		return null;
	}
	get passwordAlert() {
		const password = this.userFormGroup.get('password');
		if (!(password?.invalid && (password?.dirty || password?.touched)))
			return null;
		if (password?.hasError('required')) return 'Required';
		if (password?.hasError('minlength'))
			return 'Must be at least 6 characters';
		return null;
	}
	get confirmPasswordAlert() {
		const confirmPassword = this.userFormGroup.get('confirmPassword');
		if (
			!(
				confirmPassword?.invalid &&
				(confirmPassword?.dirty || confirmPassword?.touched)
			)
		)
			return null;
		if (confirmPassword?.hasError('required')) return 'Required';
		if (confirmPassword?.hasError('minlength'))
			return 'Must be at least 6 characters';
		if (confirmPassword?.hasError('notSame'))
			return 'Passwords do not match';
		return null;
	}

	constructor(public AuthService: AuthService) {}

	ngOnInit() {}

	public async createUserProfile() {
		this.userFormGroup.markAllAsTouched();
		if (!this.userFormGroup.valid) return;
		if (!this.userFormGroup.value.email) return;
		if (!this.userFormGroup.value.password) return;
		if (!this.userFormGroup.value.username) return;

		try {
			await this.AuthService.SignUp(
				this.userFormGroup.value.email,
				this.userFormGroup.value.password,
				{ displayName: this.userFormGroup.value.username }
			);
		} catch (err) {
			console.log(err);
		}
	}

	public signUpWithGoogle() {
		this.AuthService.GoogleAuth();
	}
}
