import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackView } from './views/callback/callback.view';
import { StrapiModule } from '@csl/strapi';

@NgModule({
	declarations: [CallbackView],
	imports: [CommonModule, AuthRoutingModule, StrapiModule],
})
export class AuthModule {}
