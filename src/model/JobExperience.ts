import type { EntryFieldTypes } from 'contentful';

import type { Address } from './Address';

export interface JobExperience {
	company: EntryFieldTypes.Text;
	position: EntryFieldTypes.Text;
	start: EntryFieldTypes.Text;
	startDate: EntryFieldTypes.Date;
	end?: EntryFieldTypes.Text;
	endDate?: EntryFieldTypes.Date;
	description: EntryFieldTypes.RichText;
	location: Address;
	website: EntryFieldTypes.Text;
	tags: string[];
	tasks?: string[];
}
