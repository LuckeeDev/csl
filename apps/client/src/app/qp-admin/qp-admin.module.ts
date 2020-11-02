// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QpAdminRoutingModule } from './qp-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI Elements
import { UiModule } from '@global/ui/ui.module';

import { PipesModule } from '@global/pipes/pipes.module';

// Main page
import { QpAdminComponent } from '@qp-admin/qp-admin.component';
import { EditorComponent } from './components/editor/editor.component';
import { ManageArticlesComponent } from './components/manage-articles/manage-articles.component';
import { QpAdminHomeComponent } from './components/qp-admin-home/qp-admin-home.component';

@NgModule({
  declarations: [
    QpAdminComponent,
    EditorComponent,
    ManageArticlesComponent,
    QpAdminHomeComponent,
  ],
  imports: [
    CommonModule,
    QpAdminRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class QpAdminModule {}
