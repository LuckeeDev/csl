// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

// Services
import { StrapiAuthService } from './services/strapi-auth/strapi-auth.service';

@NgModule({
	imports: [CommonModule, HttpClientModule, RouterModule],
	providers: [
		StrapiAuthService,
		{
			provide: APOLLO_OPTIONS,
			useFactory: (httpLink: HttpLink) => {
				return {
					cache: new InMemoryCache(),
					link: httpLink.create({
						uri: 'http://localhost:1337/graphql',
					}),
				};
			},
			deps: [HttpLink],
		},
	],
})
export class StrapiModule {}

export { StrapiAuthService };
