'use strict';
export function isSafeNumber(value: number): boolean {
	// Минимально и максимально возможные безопасные целые числа
	const MIN_SAFE_INTEGER = -(2 ** 53);
	const MAX_SAFE_INTEGER = 2 ** 53 - 1;

	// Проверяем, попадает ли значение в безопасный диапазон
	return Number.isInteger(value) && value >= MIN_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
}
