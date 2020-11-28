// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Store
import { NgxsModule } from '@ngxs/store';
import { ClassState } from './store';

// UI elements
import { UiModule } from '@csl/ui';

import { MarkdownModule } from 'ngx-markdown';

// Pipes module
import { PipesModule } from '@global/pipes/pipes.module';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';
import { CsvComponent } from '@shared/components/csv/csv.component';
import { PageEditorComponent } from '@shared/components/page-editor/page-editor.component';

// Shared services
import { MembersService } from '@shared/services/members/members.service';
import { UploadService } from '@shared/services/upload/upload.service';
import { CogeComponent } from '@shared/components/coge/coge.component';
import { MdComponent } from '@shared/components/md/md.component';

@NgModule({
  declarations: [ClassiComponent, SingleClassComponent, CsvComponent, CogeComponent, PageEditorComponent, MdComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UiModule,
    MarkdownModule.forChild(),
    PipesModule,
    NgxsModule.forFeature([ClassState]),
  ],
  exports: [ClassiComponent, SingleClassComponent, CsvComponent, CogeComponent, PageEditorComponent, MdComponent],
  providers: [MembersService, UploadService],
})
export class SharedModule {}
