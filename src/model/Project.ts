import type { EntryFieldTypes } from 'contentful';

export interface Project {
	organization: EntryFieldTypes.Text;
	title: EntryFieldTypes.Text;
	team: EntryFieldTypes.Text;
	start: EntryFieldTypes.Text;
	startDate: EntryFieldTypes.Date;
	end?: EntryFieldTypes.Text;
	endDate?: EntryFieldTypes.Date;
	description: EntryFieldTypes.RichText;
}
