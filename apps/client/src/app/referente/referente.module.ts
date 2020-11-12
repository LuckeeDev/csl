import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenteRoutingModule } from '@referente/referente-routing.module';

import { UiModule } from '@csl/ui';

import { ReferenteComponent } from '@referente/referente.component';
import { ReferenteHomeComponent } from '@referente/components/referente-home/referente-home.component';
import { PageEditorComponent } from '@referente/components/page-editor/page-editor.component';



@NgModule({
  declarations: [ReferenteComponent, ReferenteHomeComponent, PageEditorComponent],
  imports: [
    ReferenteRoutingModule,
    CommonModule,
    UiModule
  ]
})
export class ReferenteModule { }
