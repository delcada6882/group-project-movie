import { Injectable, inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanActivateFn,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
class PermissionsService {
	constructor(private router: Router, public authService: AuthService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Promise<boolean> {
		if (this.authService.isLoggedIn !== true) {
			return this.router.navigate(['login']);
		}
		return true;
	}
}

export const AuthGuard: CanActivateFn = (
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): boolean | Promise<boolean> => {
	return inject(PermissionsService).canActivate(next, state);
};
