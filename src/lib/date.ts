const MONTH_YEAR_LOCALE = 'en-US';
const LONG_MONTH_YEAR_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
};

export const asDate = (value?: string | Date): Date | undefined => {
	if (!value) {
		return undefined;
	}
	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
};

export const formatLongMonthYear = (value?: string | Date): string | undefined => {
	const date = asDate(value);
	return date?.toLocaleDateString(MONTH_YEAR_LOCALE, LONG_MONTH_YEAR_OPTIONS);
};

export const formatCompactMonthYear = (value?: string | Date): string | undefined => {
	const date = asDate(value);
	if (!date) {
		return undefined;
	}
	return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)}`;
};
