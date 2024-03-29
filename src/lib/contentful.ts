import { TransformData } from '@lib/contentful-transformer';
import contentful from 'contentful';
import isEmpty from 'lodash.isempty';

import type {
	ContentfulData,
	ContentfulEntity,
	Education,
	Interests,
	JobExperience,
	Language,
	PersonalData,
	Project,
	TechnicalSkills,
} from '@/model';

export const sortByFieldAsc = (field: string) => (a: any, b: any) => {
	return b[field] - a[field];
};

const query = {
	content_type: 'developerPortfolio',
	locale: 'en-US',
	include: 1,
	'fields.name[match]': import.meta.env.NAME,
};

type ArrayProps = 'experience' | 'education' | 'projects' | 'languages' | 'skills' | 'interests';

export const parseEntryPropArray = async <T extends ContentfulData>(
	personalData: PersonalData,
	propName: ArrayProps
) => {
	const prop = personalData[propName];
	if (!prop) {
		throw new Error(`Property '${propName}' not found`);
	}
	return await Promise.all(prop.map((e) => TransformData<T>(e)));
};

export const parseEntry = async (item: Partial<ContentfulEntity<PersonalData>>): Promise<PersonalData> => {
	const personalData = await TransformData<PersonalData>(item);
	if (isEmpty(personalData)) {
		throw new Error('Personal data not found');
	}
	const experience = await parseEntryPropArray<JobExperience>(personalData, 'experience');
	const education = await Promise.all(personalData.education.map((e) => TransformData<Education>(e)));
	const interests = await Promise.all(personalData.interests.map((e) => TransformData<Interests>(e)));
	const skills = await Promise.all(personalData.skills.map((e) => TransformData<TechnicalSkills>(e)));
	const languages = await Promise.all(personalData.languages.map((e) => TransformData<Language>(e)));
	const projects = await Promise.all(personalData.projects.map((e) => TransformData<Project>(e)));
	return {
		...personalData,
		experience: experience.sort(sortByFieldAsc('startDate')),
		education: education.sort(sortByFieldAsc('endDate')),
		projects: projects.sort(sortByFieldAsc('endDate')),
		interests: interests,
		skills: skills.sort(sortByFieldAsc('proficiency')),
		languages: languages,
	};
};

export const getPersonalData = async () =>
	await contentful
		.createClient({
			space: import.meta.env.CONTENTFUL_SPACE_ID,
			accessToken: import.meta.env.DEV
				? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
				: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
			host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
		})
		.getEntries<ContentfulEntity<PersonalData>>(query)
		.then(({ items }) => parseEntry(items[0]));
