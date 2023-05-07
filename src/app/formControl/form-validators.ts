import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export type FormAlert = (
	abstractControl: AbstractControl<string | null, string | null> | null,
	...args: Array<{ errorCode: string; errorMessage: string }>
) => string | null;

declare namespace FormValidators {
	export interface user {
		email: ValidatorFn[];
		displayName: ValidatorFn[];
		password: ValidatorFn[];
		alerts: FormAlert;
	}
}

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // REGEX: Email format
export const WHITE_SPACE_REGEX = /^(\s+\S+\s*)*(?!\s).*$/; // REGEX: No leading or trailing spaces

export const userValidators: FormValidators.user = {
	email: [
		Validators.required,
		Validators.email,
		(control) => {
			if (control.value && !control.value.match(EMAIL_REGEX))
				return {
					email: true,
				};
			else return null;
		},
	],
	displayName: [
		Validators.required,
		Validators.minLength(6),
		(control: AbstractControl) => {
			if (control.value && !control.value.match(WHITE_SPACE_REGEX))
				return {
					whiteSpace: true,
				};
			else return null;
		},
	],
	password: [Validators.required, Validators.minLength(6)],
	alerts: (AC, ...args) => {
		if (!AC) return null;
		if (!(AC.invalid && (AC.dirty || AC.touched))) return null;
		if (AC?.hasError('notSame')) return 'Passwords do not match';
		if (AC?.hasError('whiteSpace')) return 'No leading or trailing spaces';
		if (AC?.hasError('minlength')) return 'Must be at least 6 characters';
		if (AC?.hasError('email')) return 'Email is invalid';
		if (AC?.hasError('required')) return 'Required';
		for (const iter of args)
			if (AC?.hasError(iter.errorCode)) return iter.errorMessage;
		return null;
	},
};
