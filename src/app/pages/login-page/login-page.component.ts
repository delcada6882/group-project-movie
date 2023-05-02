import { User } from './../../interfaces/firebase/user';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

// class UserModel {
// 	constructor(public username: string, public password: string) {}
// }

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	public userFormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});
	public updateUserProfile() {
		console.log(this.userFormGroup);
	}
	public username?: User['username'];
	public password?: User['password'];

	constructor(private UserService: UserService) {}

	ngOnInit() {
		this.UserService.getUserObservable()?.subscribe((data) => {
			console.log(data);
		});
	}
}
