// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { RappreComponent } from '@rappre/rappre.component';

// Sub-components
import { RappreHomeComponent } from './components/rappre-home/rappre-home.component';
import { ManageCategoryComponent } from '@rappre/components/manage-category/manage-category.component';
import { CreateProductComponent } from '@rappre/components/create-product/create-product.component';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';

const routes: Routes = [
  {
    path: '',
    component: RappreComponent,
    children: [
      { path: '', component: RappreHomeComponent },
      { path: 'classi', component: ClassiComponent },
      { path: 'classi/:classID', component: SingleClassComponent },
      { path: ':category', component: ManageCategoryComponent },
      { path: ':category/create', component: CreateProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RappreRoutingModule {}
