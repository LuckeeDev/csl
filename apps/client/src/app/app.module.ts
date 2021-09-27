// Main imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';
import ITLocaleData from '@angular/common/locales/it';
import { StrapiModule } from '@csl/strapi';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
	AngularFireAuthModule,
	USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// UI Elements
import { UiModule } from '@csl/ui';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '@shared/shared.module';

// Store
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

// Pipes
import { PipesModule } from '@global/pipes/pipes.module';

// Components
import { WrapperComponent } from '@/core/components/wrapper/wrapper.component';
import { CategoryComponent } from '@/core/components/category/category.component';
import { AslComponent } from '@main/pages/asl/asl.component';
import { ComitatoComponent } from '@main/comitato-components/comitato/comitato.component';
import { ConsultaComponent } from '@main/pages/consulta/consulta.component';
import { HomeComponent } from '@main/pages/home/home.component';
import { PortartiComponent } from '@main/pages/portarti/portarti.component';
import { PageNotFoundComponent } from '@main/errors/page-not-found/page-not-found.component';
import { AccessForbiddenComponent } from '@main/errors/access-forbidden/access-forbidden.component';
import { BarComponent } from '@main/bar-components/bar/bar.component';
import { SnacksComponent } from '@main/bar-components/snacks/snacks.component';
import { SnackCartComponent } from '@main/bar-components/snack-cart/snack-cart.component';
import { FaqComponent } from '@main/pages/faq/faq.component';
import { InfoComponent } from '@main/contacts-components/info/info.component';
import { CommissioneComponent } from '@main/comitato-components/commissione/commissione.component';
import { ComitatoHomeComponent } from '@main/comitato-components/comitato-home/comitato-home.component';
import { ContactFormComponent } from '@main/contacts-components/contact-form/contact-form.component';
import { LoginComponent } from '@main/errors/login/login.component';
import { CogeView } from '@/main/coge/coge.view';

// Interceptors
import { ResCodeInterceptor } from '@global/http/res-code.interceptor';
import { ApiInterceptor } from '@global/http/api.interceptor';

// Stores
import { AuthState as OldAuthState } from './global/store/auth';
import { PlatformState } from './global/store/platform';
import { AuthState } from './modules/auth/store';
import { CoreModule } from './core/core.module';

registerLocaleData(ITLocaleData);

@NgModule({
	declarations: [
		AppComponent,
		AslComponent,
		ComitatoComponent,
		ConsultaComponent,
		HomeComponent,
		PortartiComponent,
		PageNotFoundComponent,
		AccessForbiddenComponent,
		LoginComponent,
		SnacksComponent,
		BarComponent,
		SnackCartComponent,
		FaqComponent,
		InfoComponent,
		CommissioneComponent,
		ComitatoHomeComponent,
		ContactFormComponent,
		CogeView,
		WrapperComponent,
		CategoryComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CoreModule,
		FormsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig, 'CSLussana'),
		AngularFireStorageModule,
		AngularFireAuthModule,
		AngularFireMessagingModule,
		UiModule,
		PipesModule,
		SharedModule,
		HttpClientModule,
		// TODO: remove old auth state class
		NgxsModule.forRoot([OldAuthState, PlatformState, AuthState], {
			developmentMode: !environment.production,
		}),
		NgxsStoragePluginModule.forRoot({
			key: [PlatformState, AuthState],
		}),
		LoadingBarModule,
		LoadingBarHttpClientModule,
		MarkdownModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		StrapiModule,
	],
	entryComponents: [],
	providers: [
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
