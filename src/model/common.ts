export interface ContentfulEntity<T> {
	contentTypeId: string;
	fields: T;
}

export type ContentfulData = Partial<DatedEntity & AvatarEntity & { name: string }>;

export interface AvatarEntity {
	avatar?: string;
}

export interface DatedEntity {
	start?: string;
	startDate?: Date;
	end?: string;
	endDate?: Date;
}
