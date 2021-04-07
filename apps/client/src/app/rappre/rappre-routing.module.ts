// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { RappreComponent } from '@rappre/rappre.component';

// Sub-components
import { RappreHomeComponent } from './components/rappre-home/rappre-home.component';
import { ManageCategoryView } from '@rappre/views/manage-category/manage-category.view';
import { OrientamentoComponent } from '@rappre/components/orientamento/orientamento.component';
import { NewProductView } from './views/new-product/new-product.view';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';
import { PageEditorComponent } from '@shared/components/page-editor/page-editor.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

const routes: Routes = [
	{
		path: '',
		component: RappreComponent,
		children: [
			{ path: '', component: RappreHomeComponent },
			{ path: 'classi', component: ClassiComponent },
			{ path: 'classi/:classID', component: SingleClassComponent },
			{ path: 'editor', component: PageEditorComponent },
			{ path: 'orientamento', component: OrientamentoComponent },
			{ path: 'orientamento/create', component: CreateEventComponent },
			{ path: ':category', component: ManageCategoryView },
			{ path: ':category/create', component: NewProductView },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RappreRoutingModule {}
