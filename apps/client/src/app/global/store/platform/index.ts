import { Injectable } from '@angular/core';
import { PlatformStatus } from '@csl/shared';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export namespace Platform {
	export class SetStatus {
		static readonly type = '[Platform] Set Status';
		constructor(public status: PlatformStatus[]) {}
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

	@Action(Platform.SetStatus)
	setPlatformStatus(
		ctx: StateContext<PlatformStateModel>,
		action: Platform.SetStatus
	) {
		ctx.setState({ status: action.status });
	}
}
