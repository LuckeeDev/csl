// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { QpAdminComponent } from '@qp-admin/qp-admin.component';

// Sub-components
import { QpAdminHomeComponent } from '@qp-admin/components/qp-admin-home/qp-admin-home.component';
import { ManageArticlesComponent } from '@qp-admin/components/manage-articles/manage-articles.component';
import { EditorComponent } from '@qp-admin/components/editor/editor.component';
import { MdComponent } from '@shared/components/md/md.component';

const routes: Routes = [
  {
    path: '',
    component: QpAdminComponent,
    children: [
      { path: '', component: QpAdminHomeComponent },
      { path: 'editor', component: ManageArticlesComponent },
      { path: 'editor/new', component: EditorComponent },
      { path: 'editor/:articleID', component: EditorComponent },
      {
        path: 'guide',
        component: MdComponent,
        data: { file: 'qp-guide.md' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QpAdminRoutingModule {}
