import type { EntryFieldTypes } from 'contentful';

export interface Education {
	institution: EntryFieldTypes.Text;
	degree: EntryFieldTypes.Text;
	start: EntryFieldTypes.Text;
	startDate: EntryFieldTypes.Date;
	end: EntryFieldTypes.Text;
	endDate: EntryFieldTypes.Date;
	description: EntryFieldTypes.RichText;
	type: EntryFieldTypes.Text;
	courses: string[];
}
