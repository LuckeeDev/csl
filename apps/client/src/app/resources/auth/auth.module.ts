import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { GoogleView } from './views/google/google.view';
import { StrapiModule } from '@csl/strapi';

@NgModule({
	declarations: [GoogleView],
	imports: [CommonModule, AuthRoutingModule, StrapiModule],
})
export class AuthModule {}
