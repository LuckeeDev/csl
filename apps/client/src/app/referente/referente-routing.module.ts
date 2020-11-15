// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ReferenteComponent } from '@referente/referente.component';
import { ReferenteHomeComponent } from '@referente/components/referente-home/referente-home.component';

// Shared components
import { PageEditorComponent } from '@shared/components/page-editor/page-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ReferenteComponent,
    children: [
      { path: '', component: ReferenteHomeComponent },
      { path: 'editor', component: PageEditorComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenteRoutingModule {}
