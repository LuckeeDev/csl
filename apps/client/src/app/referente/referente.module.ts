import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenteRoutingModule } from '@referente/referente-routing.module';

import { UiModule } from '@csl/ui';

import { ReferenteComponent } from '@referente/referente.component';
import { ReferenteHomeComponent } from '@referente/components/referente-home/referente-home.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ReferenteComponent, ReferenteHomeComponent],
  imports: [
    ReferenteRoutingModule,
    CommonModule,
    UiModule,
    SharedModule
  ]
})
export class ReferenteModule { }
