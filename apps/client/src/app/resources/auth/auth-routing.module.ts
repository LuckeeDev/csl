import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleView } from './views/google/google.view';

const routes: Routes = [{ path: 'google', component: GoogleView }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
