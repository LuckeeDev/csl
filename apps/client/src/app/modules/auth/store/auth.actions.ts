export namespace Auth {
	export class GetUser {
		static readonly type = '[Auth] Get User';
		constructor(public provider?: string, public accessToken?: string) {}
	}
}
