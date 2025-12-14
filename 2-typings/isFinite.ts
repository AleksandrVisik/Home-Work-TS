'use strict';
export function isFinite({ value }: { value: any; }): value is number {
	return (
		typeof value === 'number' &&
		value !== Infinity &&
		value !== -Infinity &&
		!Number.isNaN(value)
	);
}
