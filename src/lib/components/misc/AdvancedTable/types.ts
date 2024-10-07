// -- TYPES -- //

export type FilterItem = {
	label: string;
	match: string;
	active: boolean;
};

export type FilterGroup = {
	label: string;
	single?: boolean;
	items: FilterItem[];
};

export type Column = {
	label: string;
	visible?: boolean;
	sorting?: 'none' | 'asc' | 'desc';
	disableSorting?: boolean;
};

export type ColumnItem = {
	label: string;
	value?: any;
	secondaryValue?: any;
	status?: string;
	statusInfos?: string[];
	classname?: string;
	icon?: string;
	isDate?: boolean;
	isDateIconOnly?: boolean;
	isTime?: boolean;
	isTimeIconOnly?: boolean;
	isDateTime?: boolean;
	isDateTimeIconOnly?: boolean;
	isCurrency?: boolean;
	isMessage?: boolean;
	isAvatar?: boolean;
	isPhone?: boolean;
	isEmail?: boolean;
	isLocation?: boolean;
	isPerson?: boolean;
	isUsername?: boolean;
	isID?: boolean;
	isPrincipal?: boolean;
	isDesignation?: boolean;
	isEmployees?: boolean;
	isTag?: boolean;
	isStats?: boolean;
	isColor?: boolean;
	isComputation?: boolean;
	isStatusBadge?: boolean;
	isArchivedStatus?: boolean;
};

export type Selections = {
	[key: string]: boolean;
};

export type SelectionAction = {
	label: string;
	icon: string;
	hidden?: boolean;
	onClick: (selections: string[]) => void | Promise<void>;
};

export type RowTool = {
	label: string;
	icon: string;
	href?: string;
	disabled?: boolean;
	hidden?: boolean;
	onClick?: () => void;
};

export type TableTool = {
	label?: string;
	icon: string;
	items?: RowTool[];
	hidden?: boolean;
	href?: string;
	onClick?: () => void;
};

export type RowItem = {
	id: string;
	columnItems: ColumnItem[];
	tools: RowTool[];
	onClick?: () => void;
};
