import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpRes, PlatformStatus } from '@csl/shared';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs/operators';

export namespace Platform {
	export class SetStatus {
		static readonly type = '[Platform] Set Status';
		constructor(public status: PlatformStatus[]) {}
	}

	export class SaveStatus {
		static readonly type = '[Platform] Update Status';
		constructor(public status: PlatformStatus<string>) {}
	}
}

interface PlatformStateModel {
	status: PlatformStatus[];
}

@State<PlatformStateModel>({
	name: 'platform',
})
@Injectable()
export class PlatformState {
	@Selector()
	static status(state: PlatformStateModel) {
		return state.status;
	}

	constructor(private http: HttpClient) {}

	@Action(Platform.SetStatus)
	setPlatformStatus(
		ctx: StateContext<PlatformStateModel>,
		action: Platform.SetStatus
	) {
		ctx.setState({ status: action.status });
	}

	@Action(Platform.SaveStatus)
	updatePlatformStatus(
		ctx: StateContext<PlatformStateModel>,
		action: Platform.SaveStatus
	) {
		const status = action.status;
		const currentState = ctx.getState();

		const alreadyExists = currentState.status.some((x) => x.id === status.id);

		if (alreadyExists) {
			return this._updateStatus(status).pipe(
				tap((res) => {
					if (res.success) {
						ctx.setState(
							produce(ctx.getState(), (state) => {
								const i = state.status.findIndex(
									(x) => x.id === action.status.id
								);
								state.status[i] = res.data;
							})
						);
					} else {
						throw new Error(
							'Errore durante la modifica dello stato della piattaforma'
						);
					}
				})
			);
		} else {
			return this._createStatus(status).pipe(
				tap((res) => {
					if (res.success) {
						ctx.setState(
							produce(ctx.getState(), (state) => {
								state.status.push(res.data);
							})
						);
					} else {
						throw new Error('Non è stato possibile creare questo stato.');
					}
				})
			);
		}
	}

	private _updateStatus(status: PlatformStatus<string>) {
		return this.http.patch<IHttpRes<PlatformStatus>>(
			`/admin/platform/${status.id}`,
			{
				start: status.status.start,
				end: status.status.end,
			}
		);
	}

	private _createStatus(status: PlatformStatus<string>) {
		return this.http.post<IHttpRes<PlatformStatus>>('/admin/platform', status);
	}
}
