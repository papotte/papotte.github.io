import type { EntryFieldTypes } from 'contentful';

import type { DatedEntity, LocatedEntity } from './common';

export interface JobExperience extends DatedEntity, LocatedEntity {
	company: EntryFieldTypes.Text;
	position: EntryFieldTypes.Text;
	description: EntryFieldTypes.RichText;
	website: EntryFieldTypes.Text;
	tags: string[];
	tasks?: string[];
}
