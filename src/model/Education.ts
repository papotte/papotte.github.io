import type { EntryFieldTypes } from 'contentful';

export interface Education {
	institution: EntryFieldTypes.Text;
	degree: EntryFieldTypes.Text;
	startDate: EntryFieldTypes.Date;
	endDate: EntryFieldTypes.Date;
	description: EntryFieldTypes.RichText;
	type: EntryFieldTypes.Text;
	courses: string[];
}
