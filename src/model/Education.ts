import type { EntryFieldTypes } from 'contentful';

import type { DatedEntity, LocatedEntity } from './common';

export interface Education extends DatedEntity, LocatedEntity {
	institution: EntryFieldTypes.Text;
	degree: EntryFieldTypes.Text;
	description: EntryFieldTypes.RichText;
	type: EntryFieldTypes.Text;
	courses: string[];
}
