import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenteRoutingModule } from '@referente/referente-routing.module';

import { ReferenteComponent } from '@referente/referente.component';
import { ReferenteHomeComponent } from '@referente/components/referente-home/referente-home.component';
import { EditorComponent } from '@referente/components/editor/editor.component';



@NgModule({
  declarations: [ReferenteComponent, ReferenteHomeComponent, EditorComponent],
  imports: [
    ReferenteRoutingModule,
    CommonModule
  ]
})
export class ReferenteModule { }
