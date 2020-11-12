// Main imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferenteComponent } from '@referente/referente.component';

const routes: Routes = [
  {
    path: '',
    component: ReferenteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferenteRoutingModule {}
