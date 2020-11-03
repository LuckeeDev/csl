// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Main page
import { ViceComponent } from '@vice/vice.component';

// Sub-components
import { CogeComponent } from '@vice/components/coge/coge.component';
import { ViceHomeComponent } from '@vice/components/vice-home/vice-home.component';

// Shared components
import { ClassiComponent } from '@shared/components/classi/classi.component';
import { SingleClassComponent } from '@shared/components/single-class/single-class.component';
import { CsvComponent } from '@shared/components/csv/csv.component';

const routes: Routes = [
  {
    path: '',
    component: ViceComponent,
    children: [
      { path: '', component: ViceHomeComponent },
      { path: 'upload', component: CsvComponent },
      { path: 'classi', component: ClassiComponent },
      { path: 'classi/:classID', component: SingleClassComponent },
      { path: 'coge', component: CogeComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViceRoutingModule {}
