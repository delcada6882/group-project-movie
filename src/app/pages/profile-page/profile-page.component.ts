import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/firebase/user';
import { userValidators } from 'src/app/formControl/form-validators';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
	public defaultProfileData = {
		photoURL: this.authService.userData?.photoURL,
		displayName: this.authService.userData?.displayName,
		email: this.authService.userData?.email,
		emailVerified: `${!!this.authService.userData?.emailVerified}`,
	};

	public userProfileDataGroup = new FormGroup({
		photoURL: new FormControl(this.defaultProfileData.photoURL),
		displayName: new FormControl(
			this.defaultProfileData.displayName,
			userValidators.displayName
		),
		email: new FormControl(
			this.defaultProfileData.email,
			userValidators.email
		),
		emailVerified: new FormControl(this.defaultProfileData.emailVerified),
	});

	public userProfileSettingsGroup = new FormGroup({
		allowEmailNotifications: new FormControl(true),
		adult: new FormControl(this.authService.userData?.adult),
		prefersDarkMode: new FormControl(
			this.authService.userData?.prefersDarkMode
		),
	});

	constructor(public authService: AuthService) {}

	ngOnInit() {
		this.userProfileSettingsGroup.valueChanges.subscribe((value) => {
			this.authService.updateCurrentUser(value);
		});
	}

	public getAlertMsg(path: string) {
		const abstractControl = this.userProfileDataGroup.get(path);
		if (!abstractControl) return;
		return userValidators.alerts(abstractControl);
	}

	public resetUserProfileDataGroup() {
		this.userProfileDataGroup.reset(this.defaultProfileData);
	}

	public async updateUserProfile() {
		if (!this.userProfileDataGroup.valid) return;
		if (!this.userProfileDataGroup.value.email) return;
		const updatedUserValues: Partial<User> = {
			photoURL: this.userProfileDataGroup.value.photoURL,
			displayName: this.userProfileDataGroup.value.displayName,
			email: this.userProfileDataGroup.value.email,
		};
		const userProfileData = this.userProfileDataGroup.value;
		if (
			userProfileData.displayName ===
			this.authService.userData?.displayName
		)
			delete updatedUserValues.displayName;
		if (userProfileData.email === this.authService.userData?.email)
			delete updatedUserValues.email;
		if (userProfileData.photoURL === this.authService.userData?.photoURL)
			delete updatedUserValues.photoURL;

		const res = await this.authService.updateCurrentUser(updatedUserValues);
		this.userProfileDataGroup.markAsPristine();
		this.userProfileDataGroup.markAsUntouched();
	}
}
