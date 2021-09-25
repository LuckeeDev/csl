import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackView } from './views/callback/callback.view';

const routes: Routes = [{ path: ':provider/callback', component: CallbackView }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
