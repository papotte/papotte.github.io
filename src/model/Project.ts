import type { EntryFieldTypes } from 'contentful';

import type { DatedEntity } from './common';

interface ProjectImageAsset {
	fields?: {
		file?: {
			url?: string;
		};
	};
}

export interface Project extends DatedEntity {
	organization: EntryFieldTypes.Text;
	organizationDescription?: EntryFieldTypes.Text;
	projectImage?: ProjectImageAsset;
	projectUrl?: string;
	title: EntryFieldTypes.Text;
	team: EntryFieldTypes.Text;
	description: EntryFieldTypes.RichText;
}
