import { TransformData } from '@lib/contentful-transformer';
import { createClient } from 'contentful';
import isEmpty from 'lodash.isempty';

import type {
	Capability,
	ContentfulData,
	ContentfulEntity,
	Credential,
	Education,
	Interests,
	JobExperience,
	Language,
	PersonalData,
	Project,
	TechnicalInterest,
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

type ArrayProps =
	| 'experience'
	| 'education'
	| 'projects'
	| 'languages'
	| 'skills'
	| 'interests'
	| 'technicalInterests'
	| 'capabilities'
	| 'credentials';

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

const transformEntryArray = async <T extends ContentfulData>(entries?: unknown[]): Promise<T[]> => {
	return await Promise.all((entries ?? []).map((entry) => TransformData<T>(entry)));
};

export const parseEntry = async (item: Partial<ContentfulEntity<PersonalData>>): Promise<PersonalData> => {
	console.log('[Contentful] Starting parseEntry...');
	const personalData = await TransformData<PersonalData>(item);
	if (isEmpty(personalData)) {
		throw new Error('Personal data not found');
	}
	console.log('[Contentful] Personal data transformed, parsing nested data...');
	const experience = await parseEntryPropArray<JobExperience>(personalData, 'experience');
	const education = await transformEntryArray<Education>(personalData.education);
	const interests = await transformEntryArray<Interests>(personalData.interests);
	const capabilities = await transformEntryArray<Capability>(personalData.capabilities);
	const credentials = await transformEntryArray<Credential>(personalData.credentials);
	const technicalInterests = await transformEntryArray<TechnicalInterest>(personalData.technicalInterests);
	const skills = await transformEntryArray<TechnicalSkills>(personalData.skills);
	const languages = await transformEntryArray<Language>(personalData.languages);
	const projects = await transformEntryArray<Project>(personalData.projects);
	console.log('[Contentful] All nested data parsed, sorting...');
	return {
		...personalData,
		experience: experience.sort(sortByFieldAsc('startDate')),
		education: education.sort(sortByFieldAsc('endDate')),
		projects: projects.sort(sortByFieldAsc('endDate')),
		interests: interests,
		capabilities: capabilities,
		credentials: credentials,
		technicalInterests: technicalInterests,
		skills: skills.sort(sortByFieldAsc('proficiency')),
		languages: languages,
	};
};

const fetchFromContentful = async (): Promise<PersonalData> => {
	const startTime = Date.now();
	console.log('[Contentful] Starting fetchFromContentful...');

	try {
		console.log('[Contentful] Environment check:', {
			hasSpaceId: !!import.meta.env.CONTENTFUL_SPACE_ID,
			hasDeliveryToken: !!import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
			hasPreviewToken: !!import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
			hasName: !!import.meta.env.NAME,
			isDev: import.meta.env.DEV,
		});

		if (!import.meta.env.CONTENTFUL_SPACE_ID) {
			throw new Error('CONTENTFUL_SPACE_ID is not set');
		}

		const accessToken = import.meta.env.DEV
			? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
			: import.meta.env.CONTENTFUL_DELIVERY_TOKEN;

		if (!accessToken) {
			throw new Error(
				import.meta.env.DEV ? 'CONTENTFUL_PREVIEW_TOKEN is not set' : 'CONTENTFUL_DELIVERY_TOKEN is not set'
			);
		}

		if (!import.meta.env.NAME) {
			throw new Error('NAME environment variable is not set');
		}

		console.log('[Contentful] Creating client...');
		const client = createClient({
			space: import.meta.env.CONTENTFUL_SPACE_ID,
			accessToken,
			host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
		});

		console.log('[Contentful] Fetching entries with query:', {
			content_type: query.content_type,
			locale: query.locale,
			nameMatch: import.meta.env.NAME,
		});

		const fetchStart = Date.now();
		const { items } = await client.getEntries<ContentfulEntity<PersonalData>>(query);
		console.log(`[Contentful] Entries fetched in ${Date.now() - fetchStart}ms, count: ${items?.length || 0}`);

		if (!items || items.length === 0) {
			throw new Error('No personal data found in Contentful');
		}

		console.log('[Contentful] Parsing entry...');
		const parseStart = Date.now();
		const result = await parseEntry(items[0]);
		console.log(`[Contentful] Entry parsed in ${Date.now() - parseStart}ms`);

		console.log(`[Contentful] Total time: ${Date.now() - startTime}ms`);
		return result;
	} catch (error) {
		console.error(`[Contentful] Error after ${Date.now() - startTime}ms:`, error);
		console.error('[Contentful] Error details:', {
			message: error instanceof Error ? error.message : 'Unknown error',
			name: error instanceof Error ? error.name : 'Unknown',
			stack: error instanceof Error ? error.stack : undefined,
		});
		throw error;
	}
};

// In-memory cache for the last successful Contentful fetch.
// In dev: TTL=0 forces re-fetch on every request; cache is consulted only as a fallback when the live fetch fails.
// In prod (warm Vercel Lambda): TTL=5min lets repeated requests reuse the cached payload, with the same fallback on failure.
const PROD_TTL_MS = 5 * 60 * 1000;
let cachedData: PersonalData | null = null;
let cachedAt = 0;

export const __resetContentfulCache = () => {
	cachedData = null;
	cachedAt = 0;
};

export const getPersonalData = async (): Promise<PersonalData> => {
	const ttl = import.meta.env.DEV ? 0 : PROD_TTL_MS;

	if (cachedData && Date.now() - cachedAt < ttl) {
		console.log('[Contentful] Cache hit (within TTL), skipping fetch');
		return cachedData;
	}

	try {
		const fresh = await fetchFromContentful();
		cachedData = fresh;
		cachedAt = Date.now();
		return fresh;
	} catch (error) {
		if (cachedData) {
			console.warn('[Contentful] Live fetch failed; serving last successful cached data', error);
			return cachedData;
		}
		throw error;
	}
};
