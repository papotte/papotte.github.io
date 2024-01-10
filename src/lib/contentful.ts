import { TransformData } from '@lib/contentful-transformer';
import contentful from 'contentful';

import type { PersonalData } from '@/model';

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

const sortBy = (field: string) => (a: any, b: any) => {
	return b[field] - a[field];
};

const query = {
	content_type: 'developerPortfolio',
	locale: 'en-US',
	include: 1,
	'fields.name[match]': import.meta.env.NAME,
};
export const personalData = await contentfulClient
	.getEntries<ContentfulEntity<PersonalData>>(query)
	.then(async ({ items }) => {
		const personalData = await TransformData<PersonalData>(items[0].fields);
		if (!personalData) {
			throw new Error('Personal data not found');
		}
		const experience = await Promise.all(personalData.experience.map((e) => TransformData(e)));
		const education = await Promise.all(personalData.education.map((e) => TransformData(e)));
		const interests = await Promise.all(personalData.interests.map((e) => TransformData(e)));
		const skills = await Promise.all(personalData.skills.map((e) => TransformData(e)));
		const languages = await Promise.all(personalData.languages.map((e) => TransformData(e)));
		const projects = await Promise.all(personalData.projects.map((e) => TransformData(e)));
		return {
			...personalData,
			experience: experience.sort(sortBy('startDate')),
			education: education.sort(sortBy('endDate')),
			projects: projects.sort(sortBy('endDate')),
			interests: interests,
			skills: skills.sort(sortBy('proficiency')),
			languages: languages,
		};
	});
