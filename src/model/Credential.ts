import type { DatedEntity } from './common';

export interface Credential extends DatedEntity {
	name: string;
	description: string;
	icon: string;
}
