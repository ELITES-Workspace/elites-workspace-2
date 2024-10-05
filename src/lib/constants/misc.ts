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
