// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AslComponent } from '@main/pages/asl/asl.component';
import { ComitatoComponent } from '@main/comitato-components/comitato/comitato.component';
import { ConsultaComponent } from '@main/pages/consulta/consulta.component';
import { HomeComponent } from '@main/pages/home/home.component';
import { PortartiComponent } from '@main/pages/portarti/portarti.component';
import { QpComponent } from '@main/qp-components/qp/qp.component';
import { PageNotFoundComponent } from '@main/errors/page-not-found/page-not-found.component';
import { ArticleComponent } from '@main/qp-components/article/article.component';
import { AccessForbiddenComponent } from '@main/errors/access-forbidden/access-forbidden.component';
import { QpHomeComponent } from '@main/qp-components/qp-home/qp-home.component';
import { FaqComponent } from '@main/pages/faq/faq.component';
import { InfoComponent } from '@main/contacts-components/info/info.component';
import { CommissioneComponent } from '@main/comitato-components/commissione/commissione.component';
import { ComitatoHomeComponent } from '@main/comitato-components/comitato-home/comitato-home.component';
import { ContactFormComponent } from '@main/contacts-components/contact-form/contact-form.component';
import { LoginComponent } from '@main/errors/login/login.component';
import { MdComponent } from '@shared/components/md/md.component';

// Guards
import { RappreGuard } from '@global/guards/rappre/rappre.guard';
import { ViceGuard } from '@global/guards/vice/vice.guard';
import { LoggedInGuard } from '@global/guards/logged-in/logged-in.guard';
import { QpAdminGuard } from '@global/guards/qp-admin/qp-admin.guard';
import { AdminGuard } from '@global/guards/admin/admin.guard';
import { NotLoggedInGuard } from '@global/guards/not-logged-in/not-logged-in.guard';
import { ReferenteGuard } from '@global/guards/referente/referente.guard';
import { StoreComponent } from './main/store-components/store/store.component';
import { StoreHomeComponent } from './main/store-components/store-home/store-home.component';
import { CatalogComponent } from './main/store-components/catalog/catalog.component';
import { ProductComponent } from './main/store-components/product/product.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login-failed', component: HomeComponent },
	{
		path: 'asl',
		canActivate: [LoggedInGuard],
		component: AslComponent,
		data: { title: 'ASL' },
	},
	{
		path: 'comitato',
		data: { title: 'Comitato' },
		component: ComitatoComponent,
		canActivate: [LoggedInGuard],
		children: [
			{ path: '', component: ComitatoHomeComponent },
			{ path: 'commissione/:id', component: CommissioneComponent },
		],
	},
	{
		path: 'consulta',
		data: { title: 'Consulta' },
		canActivate: [LoggedInGuard],
		component: ConsultaComponent,
	},
	{
		path: 'portarti',
		data: { title: 'PortArti' },
		canActivate: [LoggedInGuard],
		component: PortartiComponent,
	},
	{ path: 'faq', data: { title: 'FAQ' }, component: FaqComponent },
	{
		path: 'info',
		component: InfoComponent,
		data: { file: 'student-guide.md', title: 'Info' },
	},
	{
		path: 'info/contacts',
		component: ContactFormComponent,
		data: { title: 'Contattaci' },
	},
	{
		path: 'privacy',
		component: MdComponent,
		data: { file: 'privacy.md', privacy: true, title: 'Privacy' },
	},
	{
		path: 'qp',
		data: { title: 'QP' },
		canActivate: [LoggedInGuard],
		component: QpComponent,
		children: [
			{ path: '', component: QpHomeComponent },
			{ path: ':articleID', component: ArticleComponent },
		],
	},
	{
		path: 'store',
		canActivate: [LoggedInGuard],
		component: StoreComponent,
		children: [
			{ path: '', component: StoreHomeComponent },
			{
				path: ':category',
				component: CatalogComponent,
			},
			{
				path: ':category/:productID',
				component: ProductComponent,
			},
		],
	},
	// {
	//   path: 'bar',
	//   canActivate: [LoggedInGuard],
	//   component: BarComponent,
	//   children: [
	//     { path: '', component: SnacksComponent },
	//     { path: 'cart', component: SnackCartComponent },
	//   ],
	// },
	{
		path: 'dashboard',
		data: { title: 'Dashboard' },
		canLoad: [LoggedInGuard],
		loadChildren: () =>
			import('@dashboard/dashboard.module').then(
				(m) => m.DashboardModule
			),
	},
	{
		path: 'qp-admin',
		data: { title: 'QP Admin' },
		canLoad: [QpAdminGuard],
		loadChildren: () =>
			import('@qp-admin/qp-admin.module').then((m) => m.QpAdminModule),
	},
	{
		path: 'referente',
		data: { title: 'Referente' },
		canLoad: [ReferenteGuard],
		loadChildren: () =>
			import('@referente/referente.module').then(
				(m) => m.ReferenteModule
			),
	},
	// {
	//   path: 'bar-admin',
	//   canLoad: [BarAdminGuard],
	//   loadChildren: () =>
	//     import('@bar-admin/bar-admin.module').then((m) => m.BarAdminModule),
	// },
	{
		path: 'rappre',
		data: { title: 'Rappre' },
		canLoad: [RappreGuard],
		loadChildren: () =>
			import('@rappre/rappre.module').then((m) => m.RappreModule),
	},
	{
		path: 'vice',
		data: { title: 'Vice' },
		canLoad: [ViceGuard],
		loadChildren: () =>
			import('@vice/vice.module').then((m) => m.ViceModule),
	},
	{
		path: 'admin',
		data: { title: 'Admin' },
		canLoad: [AdminGuard],
		loadChildren: () =>
			import('@admin/admin.module').then((m) => m.AdminModule),
	},
	{
		path: 'login',
		data: { title: 'Login' },
		canActivate: [NotLoggedInGuard],
		component: LoginComponent,
	},
	{
		path: 'login/:next',
		data: { title: 'Login' },
		canActivate: [NotLoggedInGuard],
		component: LoginComponent,
	},
	{
		path: 'unauthorized',
		data: { title: 'Errore' },
		component: AccessForbiddenComponent,
	},
	{ path: '**', data: { title: '404' }, component: PageNotFoundComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
