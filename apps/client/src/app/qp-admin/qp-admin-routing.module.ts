// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { QpAdminComponent } from '@qp-admin/qp-admin.component';

// Sub-components
import { QpAdminHomeComponent } from './components/qp-admin-home/qp-admin-home.component';
import { ManageArticlesComponent } from './components/manage-articles/manage-articles.component';
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    component: QpAdminComponent,
    children: [
      { path: '', component: QpAdminHomeComponent },
      { path: 'editor', component: ManageArticlesComponent },
      { path: 'editor/new', component: EditorComponent },
      { path: 'editor/:articleID', component: EditorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QpAdminRoutingModule {}
