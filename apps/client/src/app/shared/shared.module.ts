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

// Pipes module
import { PipesModule } from '@global/pipes/pipes.module';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';
import { CsvComponent } from '@shared/components/csv/csv.component';

// Shared services
import { MembersService } from '@shared/services/members/members.service';
import { UploadService } from '@shared/services/upload/upload.service';

@NgModule({
  declarations: [ClassiComponent, SingleClassComponent, CsvComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UiModule,
    PipesModule,
    NgxsModule.forFeature([ClassState]),
  ],
  exports: [ClassiComponent, SingleClassComponent],
  providers: [MembersService, UploadService],
})
export class SharedModule {}
