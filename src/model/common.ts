import type { Address } from './Address';

export type ContentfulData = Partial<DatedEntity & LocatedEntity & AvatarEntity & { name: string }>;

export interface AvatarEntity {
	avatar?: string;
}

export interface DatedEntity {
	start?: string;
	startDate?: Date;
	end?: string;
	endDate?: Date;
}

export type Position = { lat: number; lon: number };

export interface LocatedEntity {
	location?: Address;
}
