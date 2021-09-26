import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T = unknown> {
	$implicit: T | null;
	cslLet: T | null;
}

@Directive({
	selector: '[cslLet]',
})
export class LetDirective<T = unknown> {
	@Input()
	set cslLet(value: T) {
		this.context.cslLet = value;
		this.context.$implicit = value;
	}

	private context: LetContext<T> = { cslLet: null, $implicit: null };

	constructor(
		viewContainer: ViewContainerRef,
		templateRef: TemplateRef<LetContext<T>>
	) {
		viewContainer.createEmbeddedView(templateRef, this.context);
	}

	static ngTemplateContextGuard<T>(
		dir: LetDirective<T>,
		ctx: unknown
	): ctx is LetDirective<Exclude<T, false | 0 | '' | null | undefined>> {
		return true;
	}
}
