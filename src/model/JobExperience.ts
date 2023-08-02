import type { EntryFieldTypes } from 'contentful';

export interface JobExperience {
	company: EntryFieldTypes.Text;
	position: EntryFieldTypes.Text;
	start: EntryFieldTypes.Text;
	startDate: EntryFieldTypes.Date;
	end?: EntryFieldTypes.Text;
	endDate?: EntryFieldTypes.Date;
	description: EntryFieldTypes.Text;
	website: EntryFieldTypes.Text;
	tags: string[];
	tasks?: string[];
}
