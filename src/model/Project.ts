import type { EntryFieldTypes } from 'contentful';

import type { DatedEntity } from './common';

export interface Project extends DatedEntity {
	organization: EntryFieldTypes.Text;
	title: EntryFieldTypes.Text;
	team: EntryFieldTypes.Text;
	description: EntryFieldTypes.RichText;
}
