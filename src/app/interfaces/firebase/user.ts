import firebase from 'firebase/compat';

export interface User {
	// Customem Properties
	bookmarks?: string | null;
	adult?: boolean | null;
	allowEmailNotifications?: boolean | null;
	prefersDarkMode?: boolean | null;

	// Firebase Properties
	emailVerified: firebase.User['emailVerified'];
	displayName: firebase.User['displayName'];
	photoURL: firebase.User['photoURL'];
	email: firebase.User['email'];
	uid: firebase.User['uid'];
}

export type UserList = User[];
