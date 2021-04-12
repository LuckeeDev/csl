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

	export class UpdateStatus {
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

	@Action(Platform.UpdateStatus)
	updatePlatformStatus(
		ctx: StateContext<PlatformStateModel>,
		action: Platform.UpdateStatus
	) {
		const status = action.status;

		return this.http
			.patch<IHttpRes<PlatformStatus>>(`/admin/platform/${status.id}`, {
				start: status.status.start,
				end: status.status.end,
			})
			.pipe(
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
	}
}
