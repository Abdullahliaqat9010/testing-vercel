export interface UserProfile {
	id?: null | number;
	firstname?: string;
	lastname?: string;
	email?: string;
	phone_number?: string;
	gender?: string;
	avatar?: string;
	email_verified?: boolean;
	account_type?: string;
	t_c?: boolean;
	promo_mailing?: boolean;
	auth?: boolean;
}
