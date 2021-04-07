// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappreRoutingModule } from './rappre-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// UI Elements
import { UiModule } from '@csl/ui';

// Main page
import { RappreComponent } from '@rappre/rappre.component';

// Sub-components
import { RappreHomeComponent } from './components/rappre-home/rappre-home.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventPreviewComponent } from './components/event-preview/event-preview.component';
import { OrientamentoComponent } from './components/orientamento/orientamento.component';
import { NewProductView } from '@/rappre/views/new-product/new-product.view';
import { ManageCategoryView } from './views/manage-category/manage-category.view';

// Shared module
import { SharedModule } from '@shared/shared.module';

// Pipes
import { PipesModule } from '@global/pipes/pipes.module';

@NgModule({
	declarations: [
		RappreComponent,
		RappreHomeComponent,
		CreateEventComponent,
		EventPreviewComponent,
		OrientamentoComponent,
		NewProductView,
		ManageCategoryView,
	],
	imports: [
		CommonModule,
		RappreRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		UiModule,
		PipesModule,
	],
})
export class RappreModule {}
