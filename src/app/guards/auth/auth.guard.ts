import { Injectable, inject } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanActivateFn,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
class PermissionsService {
	constructor(private router: Router, public authService: AuthService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		if (this.authService.isLoggedIn !== true) {
			this.router.navigate(['login']);
		}
		return true;
	}
}

export const AuthGuard: CanActivateFn = (
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
): boolean => {
	return inject(PermissionsService).canActivate(next, state);
};
