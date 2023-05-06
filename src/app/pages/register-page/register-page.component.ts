import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userValidators } from 'src/app/formControl/form-validators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
	public userFormGroup = new FormGroup({
		username: new FormControl('', userValidators.displayName),
		email: new FormControl('', userValidators.email),
		password: new FormControl('', userValidators.password),
		confirmPassword: new FormControl('', [
			...userValidators.password,
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

	constructor(public AuthService: AuthService) {}

	ngOnInit() {}

	public getAlertMsg(path: string) {
		const abstractControl = this.userFormGroup.get(path);
		if (!abstractControl) return;
		return userValidators.alerts(abstractControl);
	}

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
