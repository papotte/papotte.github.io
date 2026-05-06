import type { EntryFieldTypes } from 'contentful';

import type { DatedEntity } from './common';

export interface Education extends DatedEntity {
	institution: EntryFieldTypes.Text;
	degree: EntryFieldTypes.Text;
	description: EntryFieldTypes.RichText;
	type: EntryFieldTypes.Text;
	courses: string[];
}
