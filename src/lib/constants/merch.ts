// IMPORTED TYPES
import type { Merch } from '$lib/types';

// -- CONSTANTS -- //

export const MERCHS: Merch[] = [
	{
		code: 'TNE_BLACK_MEM',
		name: 'ELITES Shirt',
		eligibility: 'members',
		href: 'https://forms.gle/GeoxS4RBkXndWk3aA',
		thumbnail: '/images/merch/TNEBLACKmember.png',
		price: 450.0,
		sold: 0,
		isPreview: false,
	},
	{
		code: 'ELITES_LANYARD_MEM',
		name: 'ELITES Lanyard',
		eligibility: 'members',
		href: '/',
		thumbnail: '/images/merch/LANYARDmember.png',
		price: 120.0,
		sold: 0,
		isPreview: true,
	},
	{
		code: 'TNE_BLACK_NONMEM',
		name: 'ELITES Shirt',
		eligibility: 'non-members',
		href: 'https://forms.gle/GeoxS4RBkXndWk3aA',
		thumbnail: '/images/merch/TNEBLACKnonmember.png',
		price: 520.0,
		sold: 0,
		isPreview: false,
	},
	{
		code: 'ELITES_LANYARD_NONMEM',
		name: 'ELITES Lanyard',
		eligibility: 'non-members',
		href: '/',
		thumbnail: '/images/merch/LANYARDnonmember.png',
		price: 150.0,
		sold: 0,
		isPreview: true,
	},
];

// -- ENUMS -- //

export const ORDER_STATUS = {
	PRE_ORDERED: 'Pre-ordered',
	PAID: 'Paid',
	PROCESSING: 'Processing',
	READY_FOR_CLAIM: 'Ready for claim',
	CLAIMED: 'Claimed',
};
