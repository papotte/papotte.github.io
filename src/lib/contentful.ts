/* eslint-disable @typescript-eslint/no-explicit-any */
import contentful from 'contentful';

import type { PersonalData } from '@/model';

import { Geolocation } from './geolocation';

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
const localeOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
};

export const TransformData = async (data: any) => {
	if (data?.fields?.startDate) {
		data.fields.start = new Date(data.fields.startDate).toLocaleDateString(locales, localeOptions);
		data.fields.startDate = new Date(data.fields.startDate);
	}
	if (data?.fields?.endDate) {
		data.fields.end = new Date(data.fields.endDate).toLocaleDateString(locales, localeOptions);
		data.fields.endDate = new Date(data.fields.endDate);
	}
	if (data?.fields.location) {
		data.fields.location = await Geolocation.getAddress(data.fields.location);
	}
	return data.fields;
};

const sortBy = (field: string) => (a: any, b: any) => {
	return b[field] - a[field];
};

export const personalData = await contentfulClient
	.getEntries<ContentfulEntity<PersonalData>>({
		content_type: 'developerPortfolio',
		locale: 'en-US',
		include: 1,
		'fields.name[match]': import.meta.env.NAME,
	})
	.then(async (response) => {
		const personalData = await TransformData(response.items[0]);
		const experience = await Promise.all(personalData.experience.map((e) => TransformData(e)));
		const education = await Promise.all(personalData.education.map((e) => TransformData(e)));
		const interests = await Promise.all(personalData.interests.map((e) => TransformData(e)));
		const skills = await Promise.all(personalData.skills.map((e) => TransformData(e)));
		const languages = await Promise.all(personalData.languages.map((e) => TransformData(e)));
		const projects = await Promise.all(personalData.projects.map((e) => TransformData(e)));
		return {
			...personalData,
			avatar: personalData.avatar.fields.file.url,
			experience: experience.sort(sortBy('startDate')),
			education: education.sort(sortBy('endDate')),
			projects: projects.sort(sortBy('endDate')),
			interests: interests,
			skills: skills.sort(sortBy('proficiency')),
			languages: languages,
		};
	});
