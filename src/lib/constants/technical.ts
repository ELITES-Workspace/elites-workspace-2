// IMPORTED TYPES
import type { Option } from '$lib/types';

// -- CONSTANTS -- //

export const SCHOOL_YEAR = '2024-2025';
export const CAMPUS = 'Sarmiento Campus';

// -- OPTIONS -- //

export const YEAR_OPTIONS: Option[] = [
	{ label: '1st Year', value: '1st' },
	{ label: '2nd Year', value: '2nd' },
	{ label: '3rd Year', value: '3rd' },
	{ label: '4th Year', value: '4th' },
];

export const SECTION_OPTIONS: Option[] = [
	{ label: 'A', value: 'A' },
	{ label: 'B', value: 'B' },
	{ label: 'C', value: 'C' },
	{ label: 'D', value: 'D' },
	{ label: 'E', value: 'E' },
];

export const PROGRAM_OPTIONS: Option[] = [
	{ label: 'BSIT - Bachelor of Science in Information Technology', value: 'BSIT' },
	{ label: 'BIT CompTech - Bachelor of Industrial Technology major in Computer Technology', value: 'BIT CompTech' },
	{ label: 'BSDS - Bachelor of Science in Data Science', value: 'BSDS' },
];

export const RELATIONSHIP_OPTIONS: Option[] = [
	{ label: 'Mother', value: 'Mother' },
	{ label: 'Father', value: 'Father' },
	{ label: 'Guardian', value: 'Guardian' },
	{ label: 'Relative', value: 'Relative' },
	{ label: 'Friend', value: 'Friend' },
	{ label: 'Other', value: 'Other' },
];
