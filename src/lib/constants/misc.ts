// IMPORTED TYPES
import type { Option } from '$lib/types';

// -- CONSTANTS -- //

export const VALUE = {
	NULL_ARRAY: [] as unknown as [],
	NULL_STRING_ARRAY: [] as string[],
	NULL_STRING: null as unknown as string,
	NULL_NUMBER: null as unknown as number,
	NULL_DATE: null as unknown as Date,

	FALSE: false,
	TRUE: true,

	EMPTY_STRING: '',
	EMPTY_NUMBER: 0,
	EMPTY_FUNCTION: () => {},

	UNDEFINED_STRING: undefined as unknown as string,

	DEFAULT_DATE_RANGE: null as unknown as [string, string],

	TEXT_UNAVAILABLE: 'Unavailable',
	TEXT_UNKNOWN: 'Unknown',
	TEXT_NOT_APPLICABLE: 'N/A',
	TEXT_NONE: 'None',
};

export const TABLE_LIMIT_OPTIONS: Option[] = [
	{ label: '10', value: 10 },
	{ label: '25', value: 25 },
	{ label: '50', value: 50 },
	{ label: '100', value: 100 },
	{ label: '250', value: 250 },
	{ label: '500', value: 500 },
	{ label: 'All', value: 0 },
];
