import type { EntryFieldTypes } from 'contentful';

import type { DatedEntity } from './common';

export interface JobExperience extends DatedEntity {
	company: string;
	position: EntryFieldTypes.Text;
	description: EntryFieldTypes.RichText;
	content?: EntryFieldTypes.RichText;
	website: EntryFieldTypes.Text;
	tags: string[];
	tasks?: string[];
}
