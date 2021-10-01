import { StrapiLoginProvider } from '@csl/types';
import { environment } from '@/environments/environment';
import Router from 'next/router';

export default function login(provider: StrapiLoginProvider['name']) {
	Router.push(`${environment.strapi}/connect/${provider}`);
}
