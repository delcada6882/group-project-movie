import { AuthService } from './../../services/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordComponent } from 'src/app/components/modals/forgot-password/forgot-password.component';
import { userValidators } from 'src/app/formControl/form-validators';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	public userFormGroup = new FormGroup({
		email: new FormControl('', userValidators.email),
		password: new FormControl('', userValidators.password),
	});
	public email?: string;
	public password?: string;

	constructor(
		private UserService: UserService,
		private modalController: ModalController,
		public AuthService: AuthService
	) { }

	async ngOnInit() {
		this.UserService.getUserObservable()?.subscribe((data) => {
			console.log(data);
		});
	}

	public getAlertMsg(path: string) {
		const abstractControl = this.userFormGroup.get(path);
		if (!abstractControl) return;
		return userValidators.alerts(abstractControl);
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

	public async signInWithGoogle() {
		await this.AuthService.GoogleAuth();
	}

	public async openForgotPassowordModal() {
		const modal = await this.modalController.create({
			component: ForgotPasswordComponent,
			cssClass: 'forgot-password-modal',
		});
		return await modal.present();
	}
}
