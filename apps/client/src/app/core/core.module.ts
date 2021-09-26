import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from './directives/let/let.directive';

@NgModule({
	declarations: [LetDirective],
	imports: [CommonModule],
	exports: [RouterModule, ReactiveFormsModule, LetDirective],
})
export class CoreModule {}
