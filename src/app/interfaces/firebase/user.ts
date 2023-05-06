import * as Auth from '@angular/fire/auth';

export interface User {
	// Customem Properties
	bookmarks?: string | null;
	adult?: boolean | null;
	allowEmailNotifications?: boolean | null;
	prefersDarkMode?: boolean | null;

	// Firebase Properties
	emailVerified?: boolean;
	displayName?: Auth.UserInfo['displayName'];
	photoURL?: Auth.UserInfo['photoURL'];
	email?: Auth.UserInfo['email'];
	uid?: Auth.UserInfo['uid'];
}

export type UserList = User[];
