import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { userValidators } from 'src/app/formControl/form-validators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
	public userFormGroup = new FormGroup({
		email: new FormControl('', userValidators.email),
		newPassword: new FormControl('', userValidators.password),
		confirmNewPassword: new FormControl('', [
			...userValidators.password,
			() => {
				if (
					this.userFormGroup?.get('newPassword')?.value !==
					this.userFormGroup?.get('confirmNewPassword')?.value
				) {
					return { notSame: true };
				}
				return null;
			},
		]),
	});

	constructor(
		public authService: AuthService,
		private modalController: ModalController
	) {}

	public getAlertMsg(path: string) {
		const abstractControl = this.userFormGroup.get(path);
		if (!abstractControl) return;
		return userValidators.alerts(abstractControl);
	}

	ngOnInit() {}

	public closeModal() {
		this.modalController.dismiss();
	}
}
