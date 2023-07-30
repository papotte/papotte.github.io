/* eslint-disable @typescript-eslint/no-explicit-any */
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

const locales = 'en-US';
const localeOptions = {
	year: 'numeric',
	month: 'short',
};

export const TransformData = (data: any) => {
	if (data?.fields?.startDate) {
		data.fields.startDate = new Date(data.fields.startDate).toLocaleDateString(locales, localeOptions);
	}
	if (data?.fields?.endDate) {
		data.fields.endDate = new Date(data.fields.endDate).toLocaleDateString(locales, localeOptions);
	}
	return data.fields;
};

const sortByDate = (a: any, b: any) => {
	return b.startDate - a.startDate;
};

export const personalData = await contentfulClient
	.getEntries<ContentfulEntity<PersonalData>>({
		content_type: 'developerPortfolio',
		locale: 'en-US',
		include: 1,
		'fields.name[match]': import.meta.env.NAME,
	})
	.then((response) => {
		const personalData = TransformData(response.items[0]);
		return {
			...personalData,
			avatar: personalData.avatar.fields.file.url,
			experience: personalData.experience.map((e) => TransformData(e)).sort(sortByDate),
			education: personalData.education.map((e) => TransformData(e)).sort(sortByDate),
			interests: personalData.interests.map((e) => TransformData(e)),
			skills: personalData.skills.map((e) => TransformData(e)),
			languages: personalData.languages.map((e) => TransformData(e)),
		};
	});
