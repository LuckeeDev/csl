import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';

export function firstDifferentThan<T>(
	shouldNotBe: unknown
): MonoTypeOperatorFunction<T> {
	return pipe(
		distinctUntilChanged(),
		filter((val: T) => val !== shouldNotBe),
		take(1)
	);
}
