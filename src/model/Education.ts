import type { EntryFieldTypes } from 'contentful';

import type { Address } from './Address';

export interface Education {
	institution: EntryFieldTypes.Text;
	degree: EntryFieldTypes.Text;
	start: EntryFieldTypes.Text;
	startDate: EntryFieldTypes.Date;
	end: EntryFieldTypes.Text;
	endDate: EntryFieldTypes.Date;
	description: EntryFieldTypes.RichText;
	location: Address;
	type: EntryFieldTypes.Text;
	courses: string[];
}
