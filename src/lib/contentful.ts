import contentful from 'contentful';
import type { PersonalData } from '../model/PersonalData';

export const contentfulClient = contentful.createClient({
	space: import.meta.env.CONTENTFUL_SPACE_ID,
	accessToken: import.meta.env.DEV
		? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
		: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
	host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
});

export interface ContentfulEntity<T> {
	contentTypeId: string;
	fields: T;
}

export const TransformData = (data) => {
	return data.fields;
};

export const personalData = await contentfulClient
	.getEntries<ContentfulEntity<PersonalData>>({
		content_type: 'developerPortfolio',
		locale: 'en-US',
		include: 1,
		'fields.name[match]': import.meta.env.NAME,
	})
	.then((response) => {
		return {
			...TransformData(response.items[0]),
			avatar: response.items[0].fields.avatar.fields.file.url,
		};
	});
