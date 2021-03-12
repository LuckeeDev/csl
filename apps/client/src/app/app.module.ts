// Main imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';
import ITLocaleData from '@angular/common/locales/it';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
	AngularFireAnalyticsModule,
	ScreenTrackingService,
} from '@angular/fire/analytics';
import {
	AngularFireAuthModule,
	USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// UI Elements
import { UiModule } from '@csl/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '@shared/shared.module';

// Store
import { NgxsModule } from '@ngxs/store';

// Pipes
import { PipesModule } from '@global/pipes/pipes.module';

// Components
import { ContainerComponent } from '@global/container/container.component';

import { AslComponent } from '@main/pages/asl/asl.component';
import { ComitatoComponent } from '@main/comitato-components/comitato/comitato.component';
import { ConsultaComponent } from '@main/pages/consulta/consulta.component';
import { HomeComponent } from '@main/pages/home/home.component';
import { PortartiComponent } from '@main/pages/portarti/portarti.component';
import { QpComponent } from '@main/qp-components/qp/qp.component';
import { PageNotFoundComponent } from '@main/errors/page-not-found/page-not-found.component';
import { ArticleComponent } from '@main/qp-components/article/article.component';
import { StoreComponent } from '@main/store-components/store/store.component';
import { ProductComponent } from '@main/store-components/product/product.component';
import { AccessForbiddenComponent } from '@main/errors/access-forbidden/access-forbidden.component';
import { CatalogComponent } from '@main/store-components/catalog/catalog.component';
import { BarComponent } from '@main/bar-components/bar/bar.component';
import { SnacksComponent } from '@main/bar-components/snacks/snacks.component';
import { SnackCartComponent } from '@main/bar-components/snack-cart/snack-cart.component';
import { StoreHomeComponent } from '@main/store-components/store-home/store-home.component';
import { QpHomeComponent } from '@main/qp-components/qp-home/qp-home.component';
import { FaqComponent } from '@main/pages/faq/faq.component';
import { InfoComponent } from '@main/contacts-components/info/info.component';
import { CommissioneComponent } from '@main/comitato-components/commissione/commissione.component';
import { ComitatoHomeComponent } from '@main/comitato-components/comitato-home/comitato-home.component';
import { ContactFormComponent } from '@main/contacts-components/contact-form/contact-form.component';
import { LoginComponent } from '@main/errors/login/login.component';
import { CogeView } from '@/views/coge/coge.view';

// Interceptors
import { ResCodeInterceptor } from '@global/http/res-code.interceptor';
import { ApiInterceptor } from '@global/http/api.interceptor';

registerLocaleData(ITLocaleData);

@NgModule({
	declarations: [
		AppComponent,
		ContainerComponent,
		AslComponent,
		ComitatoComponent,
		ConsultaComponent,
		HomeComponent,
		PortartiComponent,
		QpComponent,
		PageNotFoundComponent,
		ArticleComponent,
		StoreComponent,
		ProductComponent,
		AccessForbiddenComponent,
		CatalogComponent,
		LoginComponent,
		SnacksComponent,
		BarComponent,
		SnackCartComponent,
		StoreHomeComponent,
		QpHomeComponent,
		FaqComponent,
		InfoComponent,
		CommissioneComponent,
		ComitatoHomeComponent,
		ContactFormComponent,
		CogeView,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig, 'CSLussana'),
		AngularFireStorageModule,
		AngularFireAnalyticsModule,
		AngularFireAuthModule,
		AngularFireMessagingModule,
		UiModule,
		PipesModule,
		SharedModule,
		HttpClientModule,
		NgxsModule.forRoot([], { developmentMode: !environment.production }),
		FontAwesomeModule,
		LoadingBarModule,
		LoadingBarRouterModule,
		LoadingBarHttpClientModule,
		MarkdownModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
	],
	entryComponents: [],
	providers: [
		ScreenTrackingService,
		{
			provide: USE_AUTH_EMULATOR,
			useValue: environment.useEmulators ? ['localhost', 9099] : undefined,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ResCodeInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true,
		},
		{
			provide: LOCALE_ID,
			useValue: 'it',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
