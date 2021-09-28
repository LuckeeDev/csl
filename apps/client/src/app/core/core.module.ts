import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from './directives/let/let.directive';
import { UiModule } from '@csl/ui';

// Components
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
	declarations: [LetDirective, WrapperComponent, CategoryComponent],
	imports: [CommonModule, UiModule, RouterModule, ReactiveFormsModule],
	exports: [
		RouterModule,
		ReactiveFormsModule,
		LetDirective,
		WrapperComponent,
		CategoryComponent,
	],
})
export class CoreModule {}
