// Main imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViceRoutingModule } from './vice-routing.module';

// UI Elements
import { UiModule } from '@csl/ui';

// Main page
import { ViceComponent } from '@vice/vice.component';

// Sub-components
import { CogeComponent } from '@vice/components/coge/coge.component';

// Shared module
import { SharedModule } from '@shared/shared.module';
import { ViceHomeComponent } from './components/vice-home/vice-home.component';

@NgModule({
  declarations: [ViceComponent, CogeComponent, ViceHomeComponent],
  imports: [CommonModule, ViceRoutingModule, SharedModule, UiModule],
})
export class ViceModule {}
