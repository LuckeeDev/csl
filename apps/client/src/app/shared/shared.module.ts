// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Store
import { NgxsModule } from '@ngxs/store';
import { ClassState } from './store';

// UI elements
import { UiModule } from '@global/ui/ui.module';

// Pipes module
import { PipesModule } from '@global/pipes/pipes.module';

// Shared components
import { ClassiComponent } from './components/classi/classi.component';
import { SingleClassComponent } from './components/single-class/single-class.component';

// Shared services
import { MembersService } from './services/members/members.service';
import { UploadService } from './services/upload/upload.service';

@NgModule({
  declarations: [ClassiComponent, SingleClassComponent],
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
