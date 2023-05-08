import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
	constructor(
		private modalController: ModalController,
		public authService: AuthService
	) {}

	ngOnInit() {}

	public async sendVerificationEmail() {
		await this.authService.SendVerificationMail();
	}

	public async closeModal() {
		await this.modalController.dismiss();
	}
}
